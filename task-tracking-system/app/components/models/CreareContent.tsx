"use client";

import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function CreareContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

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
    <form onSubmit={handleSubmit}>
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
      <div className="submit-btn">
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

export default CreareContent;
