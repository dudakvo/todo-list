import { useState } from "react";
import axios from "axios";
import { BASE_URL, HttpCode } from "../helpers/constants";

import TodoList from "../components/TodoList";
import Filter from "../components/Filter";

import TodoHeader from "../components/TodoHeader";

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
}
//================================================================================

axios.defaults.baseURL = BASE_URL;

export default function Home(props: IProps) {
  const { data } = props;
  const [todoList, setTodoList] = useState(data);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  function getVisibleTodo() {
    const normalizedFilter = filter.toLowerCase();
    return todoList.filter((todo) =>
      todo.todoName.toLowerCase().includes(normalizedFilter.trim())
    );
  }

  async function onAdd(todoName: string, body: string) {
    const todoCreateResult: ITodoBody = await axios.post("todo", {
      todoName,
      body,
    });
    setTodoList((prevState) => [...prevState, todoCreateResult.data.data]); // Дописати визначення типів
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const onClick = async (id: string, isComplete: boolean) => {
    try {
      const result: IRequest = await axios.patch(`todo/${id}`, {
        isComplete: !isComplete,
      });
      if (result.data.code === HttpCode.OK) {
        setTodoList((prevState) =>
          prevState.map((todo) =>
            todo._id === id ? { ...todo, isComplete: !isComplete } : todo
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const result: IRequest = await axios.delete(`todo/${id}`);
      if (result.data.code === HttpCode.OK) {
        setTodoList((prevState) => prevState.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* ============================================================================== */}
      <div className="contaier w-9/12 mx-auto my-4">
        <TodoHeader onAdd={onAdd} />
        <Filter handleFilter={onChange} filter={filter} />
        <TodoList
          todoArray={getVisibleTodo()}
          onClick={onClick}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const todo: IRequest = await axios.get(`todo`);
    const data = todo.data;
    return { props: data };
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}
