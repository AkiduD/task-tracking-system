"use client"

import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components'




interface Props {
  content: React.ReactNode;
}

function Modal({content}: Props) {
  const {closeModal} = useGlobalState();

  React.useEffect(() => {
  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, []);

  const {theme} = useGlobalState();
  return  <ModalStyled theme={theme}>
    <div className="modal-overlay" onClick={closeModal}></div>
    <div className="modal-content">{content}</div>
    
  </ModalStyled>

}

const ModalStyled = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
  }

 .modal-content {
  position: relative;
  z-index: 1001;

  width: min(90vw, 520px);
  padding: 1.5rem;
  overflow: hidden;

  background-color: ${(props) => props.theme.colorbg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
}
`;

export default Modal