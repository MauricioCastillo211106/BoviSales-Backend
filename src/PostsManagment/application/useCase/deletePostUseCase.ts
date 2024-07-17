import { PostInterface } from "../../domain/port/postInterface";

export class DeletePostUseCase {
    constructor(private readonly postRepository: PostInterface) {}

    async execute(id: number): Promise<string | null> {
        try {
            const success = await this.postRepository.deletePostById(id);
            if (success) {
                return "Post eliminado correctamente";
            } else {
                return "Post no encontrado";
            }
        } catch (error) {
            console.error("Error in DeletePostUseCase:", error);
            return "Error al eliminar el post";
        }
    }
}
