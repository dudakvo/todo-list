interface ITodoCard {
  _id: string;
  todoName: string;
  body: string;
  isComplete: boolean;
  __v: number;
}

export interface IProps {
  todoArray: ITodoCard[];
  onClickComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
}
