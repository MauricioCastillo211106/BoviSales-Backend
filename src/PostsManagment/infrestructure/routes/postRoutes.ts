import express from 'express';
import { createPostController } from "../dependencies";

export const postRouter = express.Router();

postRouter.post("/", createPostController.run.bind(createPostController));
