import { useState } from "react";
import axios from "axios";
import { BASE_URL, HttpCode } from "../helpers/constants";

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
}

interface IAxios {
  data: IRequest;
}
//================================================================================

axios.defaults.baseURL = BASE_URL;

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

  function getVisibleTodo() {
    const normalizedFilter = filter.toLowerCase();
    return todoList.filter((todo) =>
      todo.todoName.toLowerCase().includes(normalizedFilter.trim())
    );
  }

  async function onAdd(todoName: string, body: string, id?: string) {
    if (!isEdit.isEdit) {
      const todoCreateResult = await axios.post("todo", {
        todoName,
        body,
      });
      setTodoList((prevState) => [...prevState, todoCreateResult.data.data]);
    } else {
      const todoEditResult = await axios.patch(`todo/${isEdit.id}`, {
        todoName,
        body,
      });
      if (todoEditResult.data.code === HttpCode.OK) {
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
      }
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const onClickComplete = async (id: string, isComplete: boolean) => {
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
    const todo: IRequest = await axios.get(`todo`);
    const data = todo.data;
    return { props: data };
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}
