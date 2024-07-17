import { PostInterface } from "../../domain/port/postInterface";
import { Post } from "../../domain/entity/post";

export class GetPostByIdUseCase {
    constructor(private readonly postRepository: PostInterface) {}

    async execute(id: number): Promise<Post | null> {
        try {
            const post = await this.postRepository.getPostById(id);
            if (post) {
                return post;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error in GetPostByIdUseCase:", error);
            return null;
        }
    }
}
