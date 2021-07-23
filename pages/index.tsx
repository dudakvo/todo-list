import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { useState, useEffect } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import { HttpCode } from "../helpers/constants";

import TodoList from "../components/TodoList";
import Filter from "../components/Filter";
import TodoAddForm from "../components/TodoAddForm";

//=================================== typescript types ===========================
interface ITodoBody {
  _id: string;
  todoName: string;
  body: string;
  isComplete: boolean;
  __v: number;
}

interface IRequest {
  data: {
    code: number;
    data: ITodoBody[];
  };
}

interface IProps {
  data: ITodoBody[];
  port: string;
}

interface IAxios {
  data: IRequest;
}
//================================================================================

export default function Home(props: IProps) {
  const { data } = props;
  const [todoList, setTodoList] = useState(data);
  const [filter, setFilter] = useState("");
  const [isEdit, setIsEdit] = useState({
    id: "",
    todoName: "",
    body: "",
    isEdit: false,
  });

  const [browserBaseURL, setBrowserBaseURL] = useState(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/"
      : "https://todo-vdo-app.herokuapp.com/api/"
  );

  function getVisibleTodo() {
    const normalizedFilter = filter.toLowerCase();
    if (!Array.isArray(todoList)) {
      cogoToast.warn("invalid data", {
        position: "top-right",
      });
      return [];
    }
    return todoList.filter(
      (todo) =>
        todo.todoName.toLowerCase().includes(normalizedFilter.trim()) ||
        todo.body.toLowerCase().includes(normalizedFilter.trim())
    );
  }

  async function onAdd(todoName: string, body: string, id?: string) {
    if (!isEdit.isEdit) {
      // створення нотатки
      try {
        const todoCreateResult = await axios.post(`${browserBaseURL}todo`, {
          todoName,
          body,
        });
        setTodoList((prevState) => [...prevState, todoCreateResult.data.data]);
        return true;
      } catch (error) {
        cogoToast.warn(error.message, {
          position: "top-right",
        });
        return false;
      }
    } else {
      //редагування нотатки
      try {
        const todoEditResult = await axios.patch(
          `${browserBaseURL}todo/${isEdit.id}`,
          {
            todoName,
            body,
          }
        );
        setTodoList((prevState) =>
          prevState.map((todo) =>
            todo._id === id
              ? {
                  ...todo,
                  todoName: todoEditResult.data.data.todoName,
                  body: todoEditResult.data.data.body,
                }
              : todo
          )
        );
        setIsEdit({
          id: "",
          todoName: "",
          body: "",
          isEdit: false,
        });
        return true;
      } catch (error) {
        cogoToast.warn(error.message, {
          position: "top-right",
        });
        return false;
      }
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const onClickComplete = async (id: string, isComplete: boolean) => {
    try {
      const result: IRequest = await axios.patch(
        `${browserBaseURL}todo/${id}`,
        {
          isComplete: !isComplete,
        }
      );
      if (result.data.code === HttpCode.OK) {
        setTodoList((prevState) =>
          prevState.map((todo) =>
            todo._id === id ? { ...todo, isComplete: !isComplete } : todo
          )
        );
      }
    } catch (error) {
      cogoToast.warn(error.message, {
        position: "top-right",
      });
    }
  };

  const onDelete = async (id: string) => {
    try {
      const result: IRequest = await axios.delete(
        `${browserBaseURL}todo/${id}`
      );
      if (result.data.code === HttpCode.OK) {
        setTodoList((prevState) => prevState.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      cogoToast.warn(error.message, {
        position: "top-right",
      });
    }
  };

  const onClickEdit = (id: string) => {
    const todoEdit = todoList.filter((todo) => todo._id === id);

    setIsEdit({
      id: todoEdit[0]._id,
      todoName: todoEdit[0].todoName,
      body: todoEdit[0].body,
      isEdit: true,
    });
  };

  return (
    <>
      {/* ============================================================================== */}
      <div className="contaier w-9/12 mx-auto my-4">
        <div className="sticky top-0 z-50 bg-white bg-opacity-100">
          <TodoAddForm onSubmit={onAdd} edit={isEdit} />
          <Filter handleFilter={onChange} filter={filter} />
        </div>
        <TodoList
          todoArray={getVisibleTodo()}
          onClickComplete={onClickComplete}
          onDelete={onDelete}
          onClickEdit={onClickEdit}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const todo: IRequest = await axios.get(
      `http://localhost:${publicRuntimeConfig.URL_PORT}/api/todo`
    );
    const data = todo.data;
    return { props: data };
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}
