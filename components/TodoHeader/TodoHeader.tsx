import TodoAddForm from "../TodoAddForm";

interface IProps {
  onAdd: (todoName: string, body: string) => void;
  onEdit?: { todoName: string; body: string; editFn: () => void };
}

export default function TodoHeader(props: IProps) {
  const { onAdd } = props;
  return (
    <>
      <TodoAddForm onSubmit={onAdd} />
    </>
  );
}
