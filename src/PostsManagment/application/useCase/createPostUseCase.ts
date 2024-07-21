import { Post } from "../../domain/entity/post";
import { PostInterface } from "../../domain/port/postInterface";
import { ValidatePost } from "../../domain/validation/validatePost";
import { validate } from "class-validator";
import { Status } from "../../domain/entity/status";
import { TextAnalysisService } from "../../services/textAnalysisService"; // Importa el servicio de análisis de texto

export class CreatePublicUseCase {
    constructor(
        private readonly postRepository: PostInterface,
        private readonly textAnalysisService: TextAnalysisService // Inyecta el servicio de análisis de texto
    ) {}

    async create(
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

        // Verificar si el texto contiene palabras ofensivas
        if (!this.textAnalysisService.isTextClean(description)) {
            throw new Error("El texto contiene palabras ofensivas y no puede ser publicado.");
        }

        const newPublication = new Post(
            idCattle,
            idUser,
            description,
            precio,
            ubicacion,
            fecha,
            status
        );

        try {
            return await this.postRepository.CreatePost(newPublication);
        } catch (error) {
            console.error("Error creating post:", error);
            return null;
        }
    }
}
