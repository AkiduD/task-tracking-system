"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import Button from "../Button/Button";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { plus } from "@/app/utils/icons";


function CreareContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme } = useGlobalState();
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

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };
    try {
      await axios.post("/api/tasks", task);
      toast.success("Task created successfully.");
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
      <h1>Create a Task </h1>
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
      <div className="input-control">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="important">Important</label>
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
        name="Create Task"
        icon={plus}
        padding={"0.8rem 2rem"}
        borderRed={"0.8rem"}
        color={theme.colorGray2}
        fw={"500"}
        fs={"1.2rem"} 
        background={theme.colorGreenDark}    />
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
    margin: 1.6rem 0;
    font-weight: 500;

  }
   label {
    margin-bottom: 1rem;
    display: inline-block;
    font-size: clamp(1rem, 5vw, 1.2rem);

    span{
      color: ${(props) => props.theme.colorGrey3}
    }
  }

input:not([type="checkbox"]),
textarea {
  display: block;
  width: 100%;
  padding: 1rem;
  resize: none;

  background-color: ${(props) => props.theme.colorGrey5};
  color: ${(props) => props.theme.colorGrey1};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.5rem;
  outline: none;
  

  &:focus {
    border-color: ${(props) => props.theme.colorPrimaryGreen};
  }
}

`;

export default CreareContent;
