import { Post } from "../entity/post";

export interface PostInterface {
    CreatePost(post: Post): Promise<Post | null>;

}
