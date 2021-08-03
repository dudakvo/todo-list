export type handleFn = (evt: React.ChangeEvent) => void;

export interface IProps {
  onSubmit: (todoName: string, body: string, id?: string) => Promise<boolean>;
  edit: {
    id: string;
    todoName: string;
    body: string;
    isEdit: boolean;
  };
}
