"use client"

import { useGlobalState } from '@/app/context/globalProvider';
import styled from 'styled-components';
import React from 'react';

import { useRouter } from 'next/router';

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?:string;
    borderRed?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
    color?:string;
}

function Button({icon,
    name, 
    background,
    padding,
    borderRed,
    fw,
    fs,
    click,
    type,
    border,
    color
}: Props) {

  const {theme} =useGlobalState();
  //const { signOut } = useClerk();

  //const router = useRouter();


  return <ButtonStyled 
  type={type}
  onClick={click}
  style={{
    background: background,
    padding: padding || "0.5rem 1rem",
    borderRadius: borderRed || "0.5rem",
    fontWeight: fw || "500",
    fontSize: fs,
    border: border || "none",
    color: color || theme.colorGrey2,
    
  }}
  theme={theme}

  
  >
{icon && icon}
{name}


  </ButtonStyled>
  
}

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props => props.theme.colorGrey2)};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;



  i{
    margin-right: 1rem;
    color: ${(props => props.theme.colorGrey3)};
    font-size: 1rem;
  }

&:hover {
  color: ${(props => props.theme.colorGrey0)} ;
  i{
    color:  ${(props => props.theme.colorGrey0)};
  }
}

`;

export default Button;
