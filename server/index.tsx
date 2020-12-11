import express from 'express';
import next from 'next';
import lruCache from 'lru-cache';
import url from 'url';

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3000 : 8080;
const app = next({
  dev,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return renderAndCache(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function renderAndCache(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const cacheKey = parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const { query, pathname } = parsedUrl;
  try {
    const html = await app.renderToHTML(req, res, pathname, query);
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    await app.renderError(err, req, res, pathname, query);
  }
}
