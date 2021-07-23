interface ITodo {
  todoName: string;
  body: string;
  isComplete: boolean;
  _id: string;
}

interface IProps {
  todo: ITodo;
}

export default function TodoCard(props: IProps) {
  const { todo } = props;

  return (
    <>
      <h2
        className={`${todo.isComplete ? "line-through" : ""} text-center p-3`}
      >
        {todo.todoName}
      </h2>
      <p
        className={`${
          todo.isComplete ? "line-through" : ""
        } text-center p-3 overflow-x-auto`}
      >
        {todo.body}
      </p>
    </>
  );
}
