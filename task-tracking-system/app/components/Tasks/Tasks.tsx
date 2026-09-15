"use client"

import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';

declare module "styled-components" {
  export interface DefaultTheme {
    colorBg2: string;
    background: string;
    borderColor2: string;
    colorGrey3: string;
    colorGrey0: string;
    colorBg3: string;
    activeNavLinkHover: string;
    colorGreenDark: string;
    colorIcons: string;
    activeNavLink: string;
    colorIcons2: string;
  }
}

function Tasks() {
const { theme } = useGlobalState();

  return  <TaskStyled theme={ theme }>All Task</TaskStyled>

}

const TaskStyled = styled.main `
    padding: 2rem;
    width: 100;
    
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;
    
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

`;


export default Tasks;