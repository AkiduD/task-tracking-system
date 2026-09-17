"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreareContent from "../models/CreareContent";
import Modal from "../models/Modal";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/icons";
declare module "styled-components" {
  export interface DefaultTheme {
    colorbg2: string;
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
    colorPrimaryGreen: string;
    colorGrey5: string;
    colorGrey2: string;
    shadow7: string;
    colorDanger: string;
    colorWhite: string;
    borderRadiusMd: string;
    colorGrey1:string;
    colorGreyDark: string;
    colorBg2: string;
    colorGrey6: string;
    colorPrimary: string;
  }
}

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal, editingTask } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreareContent task={editingTask} />} />}
      <h1>{title}</h1>
      {!isLoading ? <div className="tasks grid">
        {(Array.isArray(tasks) ? tasks : []).map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            id={task.id}
          />
        ))}
        <button className="create-task" onClick={() => openModal()}>
          {plus}
          Add New Task
        </button>
      </div> : <div >
        </div>} 
    </TaskStyled>
  );
}
/*
className="task-loader w-full h-full flex items-center justify-center ">
        <span className="loader"></span
*/ 

const TaskStyled = styled.main`

  padding: 2rem;
  width: 100%;

  background-color: ${(props) => props.theme.colorbg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  .tasks{
    margin: 4rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
