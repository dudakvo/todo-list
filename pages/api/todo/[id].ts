import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbcConnecti.jsx";
import Todo from "../../../model/schema/todo";
import { HttpCode } from "../../../helpers/constants";

//================== typescript types ====================

interface ITodoBody {
  _id?: string;
  name: string;
  body: string;
  iscomplete?: boolean;
}

interface IError {
  code: number;
  error: string;
}

interface ISuccess {
  code: number;
  data: ITodoBody | ITodoBody[];
}
type Data = ISuccess | IError;

//=========================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    body,
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        const todoUpdate = await Todo.findOneAndUpdate(
          { _id: id },
          { ...body },
          { new: true }
        );
        res.status(HttpCode.OK).json({ code: HttpCode.OK, data: todoUpdate });
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const deleteResult = await Todo.findByIdAndRemove({
          _id: id,
        });
        if (deleteResult) {
          res
            .status(HttpCode.OK)
            .json({ code: HttpCode.OK, data: deleteResult });
        } else {
          res
            .status(HttpCode.NOT_FOUND)
            .json({ code: HttpCode.NOT_FOUND, error: "not found" });
        }
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
    default:
      res
        .status(HttpCode.BAD_REQUEST)
        .json({ code: HttpCode.BAD_REQUEST, error: "bad request" });
      break;
  }
}
