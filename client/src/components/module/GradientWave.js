import styled, { keyframes } from 'styled-components';

const MultiGradient = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: repeating-linear-gradient(
      190deg,
      #e088901a 40px,
      rgba(255, 153, 0, 0.5) 80px,
      rgba(255, 255, 0, 0.5) 120px,
      rgba(0, 255, 0, 0.5) 160px,
      rgba(0, 0, 255, 0.5) 200px,
      rgba(75, 0, 130, 0.5) 240px,
      rgba(238, 130, 238, 0.5) 280px,
      rgba(255, 0, 0, 0.5) 300px
    ),
    repeating-linear-gradient(
      -190deg,
      #e088901a 30px,
      rgba(255, 153, 0, 0.5) 60px,
      rgba(255, 255, 0, 0.5) 90px,
      rgba(0, 255, 0, 0.5) 120px,
      rgba(0, 0, 255, 0.5) 150px,
      rgba(75, 0, 130, 0.5) 180px,
      rgba(238, 130, 238, 0.5) 210px,
      rgba(255, 0, 0, 0.5) 230px
    ),
    repeating-linear-gradient(
      23deg,
      #e088901a 50px,
      orange 100px,
      yellow 150px,
      green 200px,
      blue 250px,
      indigo 300px,
      violet 350px,
      red 370px
    );
`;

export const GradientWave = () => {
  return (
    <div>
      <MultiGradient></MultiGradient>
    </div>
  );
};
