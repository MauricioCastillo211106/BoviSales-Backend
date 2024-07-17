import { MysqlPostRepository } from "./repository/mysqlPostRepository";
import { CreatePublicUseCase } from "../application/useCase/createPostUseCase";
import { CreatePostController } from "./controller/createPostController";
import { GetAllPostsUseCase } from "../application/useCase/getAllPostsUseCase";
import { GetAllPostsController } from "./controller/getAllPostController";
import { UpdatePostUseCase } from "../application/useCase/updatePostUseCase";
import { UpdatePostController } from "./controller/updatePostController";
import { DeletePostUseCase } from "../application/useCase/deletePostUseCase";
import { DeletePostController } from "./controller/deletePostController";
import { GetPostByIdUseCase } from "../application/useCase/getPostByIdUseCase";
import { GetPostByIdController } from "./controller/getPostByIdController";

// Repositorios
const postRepository = new MysqlPostRepository();

// Casos de Uso
const createPostUseCase = new CreatePublicUseCase(postRepository);
const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);

// Controladores
export const createPostController = new CreatePostController(createPostUseCase);
export const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);
export const updatePostController = new UpdatePostController(updatePostUseCase);
export const deletePostController = new DeletePostController(deletePostUseCase);
export const getPostByIdController = new GetPostByIdController(getPostByIdUseCase);