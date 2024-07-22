import { Post } from "../../domain/entity/post";
import { PostInterface } from "../../domain/port/postInterface";

export class GetPostsByUserIdUseCase {
    constructor(private readonly postRepository: PostInterface) {}

    async execute(userId: number): Promise<Post[] | null> {
        try {
            return await this.postRepository.getPostsByUserId(userId);
        } catch (error) {
            console.error("Error in GetPostsByUserIdUseCase:", error);
            return null;
        }
    }
}
