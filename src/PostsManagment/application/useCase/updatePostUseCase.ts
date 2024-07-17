import { PostInterface } from "../../domain/port/postInterface";
import { Post } from "../../domain/entity/post";
import { ValidatePost } from "../../domain/validation/validatePost";
import { validate } from "class-validator";
import { Status } from "../../domain/entity/status";

export class UpdatePostUseCase {
    constructor(private readonly postRepository: PostInterface) {}

    async execute(
        id: number,
        idCattle: number,
        idUser: number,
        description: string,
        precio: number,
        ubicacion: string,
        fecha: Date,
        status: Status
    ): Promise<Post | null> {

        let post = new ValidatePost(idCattle, idUser, description, precio, ubicacion, fecha, status);
        const validation = await validate(post);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        const updatedPost = new Post(
            idCattle,
            idUser,
            description,
            precio,
            ubicacion,
            fecha,
            status
        );

        try {
            const result = await this.postRepository.updatePost(id, updatedPost);
            console.log("Update result:", result);
            return result;
        } catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }
}
