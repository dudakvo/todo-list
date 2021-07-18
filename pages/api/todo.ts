import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../utils/dbcConnecti";
import Todo from "../../model/schema/todo";
import { HttpCode } from "../../helpers/constants";

//================== type script types======================

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

//===========================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const todo = await Todo.create(body);
        res
          .status(HttpCode.CREATED)
          .json({ code: HttpCode.CREATED, data: todo });
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
    case "PATCH":
      try {
        console.log(`PATCH`);
        const id = body.id;
        const bodyUpdate = {};

        if (body.isComplete) {
          bodyUpdate.isComplete = body.isComplete;
        }
        if (body.todoName) {
          bodyUpdate.todoName = body.todoName;
        }
        if (body.body) {
          bodyUpdate.body = body.body;
        }
        console.log(`id=${id}`);
        const todoUpdate = await Todo.findOneAndUpdate(
          { _id: id },
          { ...bodyUpdate },
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
      const id = body.id;
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
            .json({ code: HttpCode.NOT_FOUND, data: "not found" });
        }
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
    default:
      try {
        const todo = await Todo.find(); /* create a new model in the database */
        res.status(HttpCode.OK).json({ code: HttpCode.OK, data: todo });
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
  }
}
