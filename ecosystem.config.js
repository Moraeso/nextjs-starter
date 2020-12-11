module.exports = {
  apps : [{
    name: 'MY-APP',
    script: 'npm',
    args: 'start',
    env_production: {
      NODE_ENV: "production",
    },
    watch: true
  }],
};
