import { Request, Response, Router } from "express";
import { BlogController } from "../controller/blog.controller";
import { retrievePost } from "../middleware/retrieve.middleware";
const controller = new BlogController();
const router = Router();

router
  .post("/post", async (req: Request, res: Response) => {
    const response = await controller.savePost(req.body);
    res.status(response.statusCode).send(response);
  })
  .patch("/post", retrievePost, async (req: Request, res: Response) => {
    const response = await controller.updatePost(req.body, req.body.postId);
    res.status(response.statusCode).send(response);
  })
  .delete("/post", retrievePost, async (req: Request, res: Response) => {
    const response = await controller.deletePost(req.body.postId);
    res.status(response.statusCode).send(response);
  })
  .get("/post", async (req: Request, res: Response) => {
    const response = await controller.getSinglePost(req.query['id'] as string);
    res.status(response.statusCode).send(response);
  })
  .get("/posts", async (req: Request, res: Response) => {
    const response = await controller.getAllPosts();
    res.status(response.statusCode).send(response);
  })


export default router;
