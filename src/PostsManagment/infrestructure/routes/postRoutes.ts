import express from 'express';
import { createPostController, getAllPostsController, updatePostController, deletePostController, getPostByIdController, getPostsByUserIdController } from "../dependencies";

export const postRouter = express.Router();

postRouter.post("/", createPostController.run.bind(createPostController));
postRouter.get("/", getAllPostsController.run.bind(getAllPostsController));
postRouter.get("/:id", getPostByIdController.run.bind(getPostByIdController));
postRouter.get("/user/:userId", getPostsByUserIdController.run.bind(getPostsByUserIdController));
postRouter.put("/:id", updatePostController.run.bind(updatePostController));
postRouter.delete("/:id", deletePostController.run.bind(deletePostController));
