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
    async getAllPosts(): Promise<Post[] | null> {
        try {
            const sql = `SELECT * FROM Post`;
            const [results]: any = await query(sql);

            if (!results || results.length === 0) {
                return null;
            }

            return results.map((result: any) => new Post(
                result.idCattle,
                result.idUser,
                result.description,
                result.precio,
                result.ubicacion,
                new Date(result.fecha),
                result.status
            ));
        } catch (error) {
            console.error("Error fetching posts:", error);
            return null;
        }
    }
    async updatePost(id: number, post: Post): Promise<Post | null> {
        try {
            const sql = `
                UPDATE Post 
                SET idCattle = ?, idUser = ?, description = ?, precio = ?, ubicacion = ?, fecha = ?, status = ? 
                WHERE id = ?
            `;
            const params = [
                post.idCattle,
                post.idUser,
                post.description,
                post.precio,
                post.ubicacion,
                post.fecha,
                post.status,
                id
            ];
            const [result]: any = await query(sql, params);

            console.log("SQL update result:", result);
            console.log("SQL update result.affectedRows:", result.affectedRows);

            if (result.affectedRows > 0) {
                return new Post(
                    post.idCattle,
                    post.idUser,
                    post.description,
                    post.precio,
                    post.ubicacion,
                    post.fecha,
                    post.status
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }
    async deletePostById(id: number): Promise<boolean> {
        try {
            const sql = `DELETE FROM Post WHERE id = ?`;
            const [result]: any = await query(sql, [id]);

            console.log("SQL delete result:", result);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error deleting post by ID:", error);
            return false;
        }
    }
    async getPostById(id: number): Promise<Post | null> {
        try {
            const sql = `SELECT * FROM Post WHERE id = ?`;
            const [rows]: any = await query(sql, [id]);

            if (rows.length > 0) {
                const post = rows[0];
                return new Post(
                    post.idCattle,
                    post.idUser,
                    post.description,
                    post.precio,
                    post.ubicacion,
                    new Date(post.fecha),
                    post.status
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error getting post by ID:", error);
            return null;
        }
    }
    async getPostsByUserId(userId: number): Promise<Post[] | null> {
        try {
            const sql = `SELECT * FROM Post WHERE idUser = ?`;
            const [result]: any = await query(sql, [userId]);

            if (!result || result.length === 0) {
                return null;
            }

            return result.map((row: any) => new Post(
                row.idCattle,
                row.idUser,
                row.description,
                row.precio,
                row.ubicacion,
                new Date(row.fecha),
                row.status
            ));
        } catch (error) {
            console.error("Error fetching posts by user ID:", error);
            return null;
        }
    }
}