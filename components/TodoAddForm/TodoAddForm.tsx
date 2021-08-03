import { useState, useEffect } from "react";
import cogoToast from "cogo-toast";

import { handleFn, IProps } from "./types";

export default function TodoAddForm(props: IProps) {
  const { onSubmit, edit } = props;

  const [todoName, setTodoName] = useState("");
  const [todoBody, setTodoBody] = useState("");
  useEffect(() => {
    setTodoName(edit.todoName);
    setTodoBody(edit.body);
  }, [edit.body, edit.todoName]);

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

  const handleFormSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (todoName === "" || todoBody === "") {
      cogoToast.warn("fields Todo name and Todo body cannot be empty", {
        position: "top-right",
      });
      return;
    }

    if (await onSubmit(todoName, todoBody, edit.id)) {
      setTodoBody("");
      setTodoName("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="block text-sm font-medium text-gray-700">
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
        <textarea
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
         block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="todo body"
          name="todo-body"
          value={todoBody}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <div className=" flex ">
        <button
          className="inline-block items-center px-2.5 py-1.5 mx-auto my-2 border border-transparent 
      text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {edit.isEdit ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
