"use client"
import React from 'react'
import { GlobalProvider } from "../context/globalProvider";
import  { Toaster } from 'react-hot-toast';



interface Props {
  children: React.ReactNode;
}

function ContextProvider({children}: Props) {
  return  <GlobalProvider> 
    <Toaster />
    {children}</GlobalProvider>;

}

export default ContextProvider;