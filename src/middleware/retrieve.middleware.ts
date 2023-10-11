import { NextFunction, Request, Response } from "express";
import { PostModel } from "../models/post.model";
import { CustomResponse } from "../utils/wrappers";
import { HttpStatusCode } from "../utils/@types";
export async function retrievePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.query["id"];
    if (!postId) {
      return res
        .status(HttpStatusCode.BadRequest)
        .send(new CustomResponse(HttpStatusCode.BadRequest, "Pass post id!"));
    }
    const retrievedPost = await PostModel.findById(postId);

    if (!retrievedPost) {
      return res
        .status(HttpStatusCode.NotFound)
        .send(new CustomResponse(HttpStatusCode.NotFound, "Post doesnt exist"));
    }

    req.body.postId = retrievedPost;
    next();
  } catch (error: any) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .send(
        new CustomResponse(HttpStatusCode.InternalServerError, error?.message)
      );
  }
}
