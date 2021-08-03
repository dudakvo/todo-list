interface ITodo {
  todoName: string;
  body: string;
  isComplete: boolean;
  _id: string;
}

export interface IProps {
  todo: ITodo;
}
