import React, { useState } from "react";
import TodoCard from "../TodoCard";

import axios from "axios";
import { BASE_URL } from "../../helpers/constants";
import todo from "../../model/schema/todo";

interface ITodoCard {
  _id: string;
  todoName: string;
  body: string;
  isComplete: boolean;
  __v: number;
}

interface IProps {
  todoArray: ITodoCard[];
  onClickComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
}

export default function TodoList(props: IProps) {
  const { todoArray, onClickComplete, onDelete, onClickEdit } = props;

  return (
    <ul>
      {todoArray.map((todo) => {
        return (
          <li
            key={todo._id}
            className={
              "w-9/12 mx-auto my-3.5 h-56 p-8 rounded-sm border-2 border-gray-100 shadow-lg"
            }
          >
            <div
              className="relative inline-block w-10 mr-2 align-middle select-none 
              transition duration-200 ease-in"
            >
              <label
                className="toggle-label block overflow-hidden h-6 rounded-full
              bg-gray-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  defaultChecked={todo.isComplete}
                  onClick={() => onClickComplete(todo._id, todo.isComplete)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full 
                 bg-white border-4 appearance-none cursor-pointer"
                />
              </label>
            </div>

            <TodoCard todo={todo} />
            <div>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300
               shadow-sm text-xs font-medium rounded
                text-gray-700 bg-white hover:bg-gray-50"
                // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                onClick={() => {
                  onDelete(todo._id);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300
               shadow-sm text-xs font-medium rounded
                text-gray-700 bg-white hover:bg-gray-50"
                // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                onClick={() => {
                  onClickEdit(todo._id);
                }}
              >
                Edit
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
