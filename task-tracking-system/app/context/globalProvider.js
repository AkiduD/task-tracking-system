"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [ modal, setModal ] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState([]);

  const theme = themes[selectedTheme];
  
  const openModal = (task = null) => {
    setEditingTask(task);
    setModal(true);
  };
  const closeModal = () => {
    setEditingTask(null);
    setModal(false);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
      return (
        new Date(b.createdAT).getTime() -
    new Date(a.createdAT).getTime()

      );
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  /*   React.useEffect(() => {
  if (!isLoaded) return;

  if (!isSignedIn) {
    setTasks([]);
    return;
  }

  allTasks();
}, [isLoaded, isSignedIn, userId]);*/

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);

      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  const importntTasks = tasks.filter((task) => task.isImportant === true);

  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importntTasks,
        incompleteTasks,
        updateTask,
        modal,
        editingTask,
        openModal,
        closeModal,
        allTasks,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
