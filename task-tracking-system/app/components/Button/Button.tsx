"use client"

import { useGlobalState } from '@/app/context/globalProvider';
import styled from 'styled-components';
import React from 'react';

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
    border
}: Props) {

    const {theme} =useGlobalState();
  return <ButtonStyled 
  type={type ?? "button"}
  onClick={click}
  style={{
    background: background,
    padding: padding || "0.5rem 1rem",
    borderRadius: borderRed || "0.5rem",
    fontWeight: fw || "500",
    fontSize: fs,
    border: border || "none",
    
  }}
  theme={theme}
  >
{icon && icon}
{name}


  </ButtonStyled>
  
}

const ButtonStyled = styled.button``;

export default Button;
