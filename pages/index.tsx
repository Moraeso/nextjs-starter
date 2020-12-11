import Svg from '../static/svg';
import Png from '../static/png';
import styled from 'styled-components';

const BlueDiv = styled.div`
  color: blue;
  font-size: 18px;
`;

function Home() {
  return (
    <BlueDiv>
      Welcome to LUMIA.GG
      <img src={Svg.SvgExample} />
      <img src={Png.PngExample} />
    </BlueDiv>
  )
}

export default Home;
