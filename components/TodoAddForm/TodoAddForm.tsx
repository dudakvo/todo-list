import React, { useState } from "react";
import PrimatyButton from "../PrimaryButton";

type handleFn = (evt: React.ChangeEvent) => void;

interface IFormValue {
  body: string;
  value: string;
}

type submitFn = (value: IFormValue) => void;

interface IProps {
  handleFn: (value: IFormValue) => void;
}

export default function TodoAddForm({ onSubmit }: any) {
  // дописать определения типа пропсов !!!!!!
  const [todoName, setTodoName] = useState("");
  const [todoBody, setTodoBody] = useState("");

  const handleChange: handleFn = (e) => {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case "todo-name":
        setTodoName(target.value);
        break;
      case "todo-body":
        setTodoBody(target.value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (todoName === "" || todoBody === "") {
      return;
    }
    onSubmit(todoName, todoBody);
    setTodoBody("");
    setTodoName("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="block text-sm font-medium text-gray-700">
        Todo name
        <input
          name="todo-name"
          type="text"
          value={todoName}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
          block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="todo name"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Todo body
        <textarea
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
         block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="todo body"
          name="todo-body"
          value={todoBody}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent 
      text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}
