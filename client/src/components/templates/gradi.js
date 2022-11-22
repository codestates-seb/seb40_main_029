import styled from 'styled-components';

const GradiBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => (props.color ? props.color : '#f7b0be')};
`;
const Gradi = () => {
  const month = [
    {
      mood: 'happy',
      colorCode: 'f7b0be',
      per: 30,
    },
    {
      mood: 'sad',
      colorCode: 'ed8e83',
      per: 5,
    },
    {
      mood: 'anger',
      colorCode: 'ef3c23',
      per: 15,
    },
    {
      mood: 'flutter',
      colorCode: 'f15a42',
      per: 7,
    },
    {
      mood: 'worry',
      colorCode: 'fac92c',
      per: 10,
    },
    {
      mood: 'calm',
      colorCode: 'cfe5cc',
      per: 10,
    },
    {
      mood: 'sensitive',
      colorCode: '2178ae',
      per: 10,
    },
    {
      mood: 'hope',
      colorCode: '1b4793',
      per: 13,
    },
  ];
  return <GradiBox color={month.map(el => el.colorCode)}></GradiBox>;
};

export default Gradi;
