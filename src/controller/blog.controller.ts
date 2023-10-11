import { ZodError } from "zod";
import { PostModel } from "../models/post.model";
import { HttpStatusCode, SaveReqBody } from "../utils/@types";
import { postValidator } from "../utils/validator";
import { CustomResponse } from "../utils/wrappers";
export class BlogController {
  /* Create post*/
  public async savePost(req: SaveReqBody): Promise<CustomResponse<any>> {
    try {
      const { author, category, content, tags, title } = req;
      postValidator.parse({
        author,
        category,
        content,
        tags,
        title,
      });
      const createdPost = await PostModel.create({
        author,
        category,
        content,
        tags,
        title,
      });
      return new CustomResponse(
        HttpStatusCode.Created,
        "Blog post created",
        createdPost
      );
    } catch (error: any) {
      if (error instanceof ZodError) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Validation error",
          error.errors
        );
      }
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        "An error occured",
        error?.message
      );
    }
  }

  /* Update post*/
  public async updatePost(
    req: SaveReqBody,
    id: string
  ): Promise<CustomResponse<any>> {
    try {
      const { author, category, content, tags, title } = req;
      postValidator.parse({
        author,
        category,
        content,
        tags,
        title,
      });
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: id },
        {
          author: author,
          category: category,
          content: content,
          tags: tags,
          title: title,
          updatedOn: Date.now(),
        },
        {
          returnDocument: "after",
        }
      );

      return new CustomResponse(
        HttpStatusCode.Ok,
        "Blog post updated",
        updatedPost
      );
    } catch (error: any) {
      if (error instanceof ZodError) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Validation error",
          error.errors
        );
      }
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        "An error occured",
        error?.message
      );
    }
  }

  /* delete post*/
  public async deletePost(id: string): Promise<CustomResponse<any>> {
    try {
      await PostModel.findByIdAndDelete(id);
      return new CustomResponse(HttpStatusCode.Ok, "Post deleted succesfully");
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        "An error occured",
        error?.message
      );
    }
  }

  /*Get single post*/
  public async getSinglePost(id: string): Promise<CustomResponse<any>> {
    try {
      if (!id) {
        return new CustomResponse(HttpStatusCode.BadRequest, "Pass id");
      }

      const retrievedPost = await PostModel.findById(id);

      if (!retrievedPost) {
        return new CustomResponse(HttpStatusCode.NotFound, "Post doesnt exist");
      }

      return new CustomResponse(
        HttpStatusCode.Ok,
        "Post retrieved",
        retrievedPost
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        "An error occured",
        error?.message
      );
    }
  }

  /*Get all posts*/
  public async getAllPosts(): Promise<CustomResponse<any>> {
    try {
      const allPosts = await PostModel.find();
      return new CustomResponse(
        HttpStatusCode.Ok,
        "All Posts retrieved",
        allPosts
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        "An error occured",
        error?.message
      );
    }
  }
}
