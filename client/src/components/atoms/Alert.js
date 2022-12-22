import { useState } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';

export default function Alert(message) {
  const [alert, setAlert] = useState(false);

  // const toggleModal = () => {
  //   setAlert(!alert);
  // };

  return (
    <>
      <Overlay>
        <h2>{message}</h2>
      </Overlay>
    </>
  );
}
