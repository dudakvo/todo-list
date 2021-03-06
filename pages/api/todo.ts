import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../utils/dbConnect";
import Todo from "../../model/schema/todo";
import { HttpCode } from "../../helpers/constants";

import { Data } from "../../types/types";

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
    default:
      try {
        const todo = await Todo.find({ __v: 0 });
        res.status(HttpCode.OK).json({ code: HttpCode.OK, data: todo });
      } catch (error) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json({ code: HttpCode.BAD_REQUEST, error: error.message });
      }
      break;
  }
}
