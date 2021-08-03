import Global = NodeJS.Global;

export interface IGlobalMongooseConnect extends Global {
  mongoose: {
    conn: Promise<typeof mongoose> | null;
    promise: Promise<typeof mongoose> | null;
  };
}

interface ITodoBody {
  _id: string;
  todoName: string;
  body: string;
  isComplete: boolean;
  __v: number;
}

interface IError {
  code: number;
  error: string;
}

interface ISuccess {
  code: number;
  data: ITodoBody | ITodoBody[];
}

export type Data = ISuccess | IError;

export interface IRequest {
  data: {
    code: number;
    data: ITodoBody[];
  };
}

export interface IProps {
  data: ITodoBody[];
  port: string;
}

export interface IAxios {
  data: IRequest;
}

//==============================
