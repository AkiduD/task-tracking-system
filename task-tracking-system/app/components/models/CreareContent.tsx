"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import Button from "../Button/Button";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { plus } from "@/app/utils/icons";

interface EditableTask {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

function CreareContent({ task }: { task?: EditableTask | null }) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [date, setDate] = useState(task?.date ?? "");
  const [completed, setCompleted] = useState(task?.isCompleted ?? false);
  const [important, setImportant] = useState(task?.isImportant ?? false);

  const { theme, allTasks, closeModal } = useGlobalState();
  const handleChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted((e.target as HTMLInputElement).checked);
        break;
      case "important":
        setImportant((e.target as HTMLInputElement).checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const taskData = {
      id: task?.id,
      title,
      description,
      date,
      completed,
      important,
    };
    try {
      if (task) {
        await axios.put("/api/tasks", taskData);
        toast.success("Task updated successfully.");
      } else {
        await axios.post("/api/tasks", taskData);
        toast.success("Task created successfully.");
      }

      await allTasks();
      closeModal();
      
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : undefined;
      toast.error(message || "Something went wrong.");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>{task ? "Edit Task" : "Create a Task"}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Watch a video from One piece"
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder="e.g, Watch a video abot luffy"
        />
      </div>

      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="title"
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          type="checkbox"
          id="important"
          checked={important}
          name="important"
          onChange={handleChange("important")}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button type="submit" 
        name={task ? "Update Task" : "Create Task"}
        icon={plus}
        padding={"0.8rem 2rem"}
        borderRed={"0.8rem"}
        color={theme.colorGray2}
        fw={"500"}
        fs={"1.2rem"} 
        background={theme.colorGreenLight}    />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1{
    font-size: clamp(1.5rem, 5vw, 1.6rem);
    font-weight: 600;
  }
  
  color: ${(props) => props.theme.colorGrey1};

 .input-control {
  position: relative;
  margin: 1rem 0;
  font-weight: 500;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.95rem;

    span{
      color: ${(props) => props.theme.colorGrey3}
    }
  }

input:not([type="checkbox"]),
textarea {
  display: block;
  width: 100%;
  padding: 0.8rem 1rem;
  resize: none;

  background-color: ${(props) => props.theme.colorGrey6};
  color: ${(props) => props.theme.colorGrey1};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.4rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colorGrey3};
  }

  &:focus {
    border-color: ${(props) => props.theme.colorPrimary};
  }
}

.submit-btn button{
transition: all 0.35s ease-in-out;
  i{
    color:${(props) => props.theme.colorGrey0};
  }
  &:hover{
    background: ${(props) => props.theme.colorPrimaryGreen} !important;
    color: ${(props) => props.theme.colorWhite};
  }
}

.toggler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  cursor: pointer;

  label {
    flex: 1;
    margin: 0;
    cursor: pointer;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;

    display: grid;
    place-content: center;

    background-color: ${(props) => props.theme.colorGrey6};
    border: 1px solid ${(props) => props.theme.colorGrey3};
    border-radius: 0.2rem;
    cursor: pointer;
  }

  input[type="checkbox"]::before {
    content: "✓";
    color: white;
    font-size: 0.8rem;
    line-height: 1;
    transform: scale(0);
    transition: transform 120ms ease-in-out;
  }

  input[type="checkbox"]:checked {
    background-color: ${(props) => props.theme.colorPrimaryGreen};
    border-color: ${(props) => props.theme.colorPrimaryGreen};
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
}

`;

export default CreareContent;
