import React from 'react'
import styled from 'styled-components';
import Van from '../assets/van_video.mp4'

const Home = () => {
  return (
    <Container>
      <Video autoPlay muted loop>
        <source
          src={Van}
          type="video/mp4"
        />
      </Video>
      <H1>
        Welcome to <br />
        <span>
          Vanity
          </span>
          <br/>
          Where every van is a <br />
          <span>
            Van For U
            </span>

      </H1>
    </Container>
  )
}

export default Home;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Source Code Pro', monospace;
  font-size: 2rem;
  text-align: center;
  z-index: -1;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    position: relative;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 1;
`;
const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: -2rem;
  span {
    font-family: 'Lobster', cursive;
    font-size: 3rem;
    font-weight: 300;
    color: #3F88C5;
  }

`;