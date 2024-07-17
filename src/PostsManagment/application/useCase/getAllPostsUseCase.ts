import { PostInterface } from "../../domain/port/postInterface";
import { Post } from "../../domain/entity/post";

export class GetAllPostsUseCase {
    constructor(private readonly postRepository: PostInterface) {}

    async execute(): Promise<Post[] | null> {
        try {
            return await this.postRepository.getAllPosts();
        } catch (error) {
            console.error("Error fetching posts:", error);
            return null;
        }
    }
}
