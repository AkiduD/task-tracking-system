"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";



export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({children}) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoaded, isSignedIn, userId } = useAuth();

    const [tasks, setTasks] = useState([]);

    const theme = themes[selectedTheme];

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");

            setTasks(res.data);
            setIsLoading(false);
            
        } catch (error) {   
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    React.useEffect(() => {
  if (!isLoaded) return;

  if (!isSignedIn) {
    setTasks([]);
    return;
  }

  allTasks();
}, [isLoaded, isSignedIn, userId]);

    return (
        <GlobalContext.Provider value = {{
            theme,
            tasks,
        }}>
            <GlobalUpdateContext.Provider value = {{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
