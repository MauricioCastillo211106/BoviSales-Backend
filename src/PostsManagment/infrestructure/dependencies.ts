import { MysqlPostRepository } from "./repository/mysqlPostRepository";
import { CreatePublicUseCase } from "../application/useCase/createPostUseCase";
import { GetAllPostsUseCase } from "../application/useCase/getAllPostsUseCase";
import { UpdatePostUseCase } from "../application/useCase/updatePostUseCase";
import { DeletePostUseCase } from "../application/useCase/deletePostUseCase";
import { GetPostByIdUseCase } from "../application/useCase/getPostByIdUseCase";
import { CreatePostController } from "./controller/createPostController";
import { GetAllPostsController } from "./controller/getAllPostController";
import { UpdatePostController } from "./controller/updatePostController";
import { DeletePostController } from "./controller/deletePostController";
import { GetPostByIdController } from "./controller/getPostByIdController";
import { TextAnalysisService } from "../services/textAnalysisService";
import { GetPostsByUserIdUseCase } from "../application/useCase/getPostsByUserIdUseCase";
import { GetPostsByUserIdController } from "./controller/getPostsByUserIdController";


// Repositorios
const postRepository = new MysqlPostRepository();

// Servicios
const textAnalysisService = new TextAnalysisService();

// Casos de Uso
const createPostUseCase = new CreatePublicUseCase(postRepository, textAnalysisService);
const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
const getPostsByUserIdUseCase = new GetPostsByUserIdUseCase(postRepository);

// Controladores
export const createPostController = new CreatePostController(createPostUseCase);
export const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);
export const updatePostController = new UpdatePostController(updatePostUseCase);
export const deletePostController = new DeletePostController(deletePostUseCase);
export const getPostByIdController = new GetPostByIdController(getPostByIdUseCase);
export const getPostsByUserIdController = new GetPostsByUserIdController(getPostsByUserIdUseCase);