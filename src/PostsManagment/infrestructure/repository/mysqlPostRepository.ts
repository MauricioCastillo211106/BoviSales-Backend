import { PostInterface } from "../../domain/port/postInterface";
import { Post } from "../../domain/entity/post";
import { query } from "../../../database/mysql";


export class MysqlPostRepository implements PostInterface {
    async CreatePost(post: Post): Promise<any> {
        try {
            // Consulta del usuario
            const userSql = `
                SELECT id, name, email, phone_number, suscription, verification, image 
                FROM user 
                WHERE id = ?
            `;
            const userParams = [post.idUser];
            const [userResult]: any = await query(userSql, userParams);

            if (!userResult || userResult.length === 0) {
                return null;
            }

            const userInfo = userResult[0];

            // Consulta del cattle
            const cattleSql = `
                SELECT id, name, weight, earringNumber, age, gender, breed, image 
                FROM Cattle 
                WHERE id = ?
            `;
            const cattleParams = [post.idCattle];
            const [cattleResult]: any = await query(cattleSql, cattleParams);

            if (!cattleResult || cattleResult.length === 0) {
                return null;
            }

            const cattleInfo = cattleResult[0];

            // Insertar el post
            const insertPostSql = `
                INSERT INTO Post (idCattle, idUser, description, precio, ubicacion, fecha, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const insertPostParams = [
                post.idCattle, 
                post.idUser, 
                post.description, 
                post.precio, 
                post.ubicacion, 
                post.fecha, 
                post.status
            ];
            const postResult: any = await query(insertPostSql, insertPostParams);

            if (!postResult || postResult.affectedRows === 0) {
                return null;
            }

            return {
                post: {
                    id: postResult.insertId,
                    idCattle: post.idCattle,
                    idUser: post.idUser,
                    description: post.description,
                    precio: post.precio,
                    ubicacion: post.ubicacion,
                    fecha: post.fecha,
                    status: post.status
                },
                user: userInfo,
                cattle: cattleInfo
            };
        } catch (error) {
            console.error("Error registering Post and fetching User and Cattle:", error);
            return null;
        }
    }
}