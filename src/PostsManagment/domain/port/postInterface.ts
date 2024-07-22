import { Post } from "../entity/post";

export interface PostInterface {
    getPostsByUserId(userId: number): Post[] | PromiseLike<Post[] | null> | null;
    CreatePost(post: Post): Promise<Post | null>;
    getAllPosts(): Promise<Post[] | null>;
    getPostById(id: number): Promise<Post | null>;
    updatePost(id: number, post: Post): Promise<Post | null>;
    deletePostById(id: number): Promise<boolean>;
}
