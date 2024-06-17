import { User } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";
import { query } from "../../../database/mysql";

export class MysqlUserRepository implements userInterface{
    async createUser(user: User): Promise<User | null> {
        try {
            const sql = "INSERT INTO User (name, email, password , phone_number, suscription, verification, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [user.name, user.email, user.password , user.phone_number, user.suscription, user.verification, user.image];
            const result: any = await query(sql, params);
            const id = result.id;
            return new User (user.name, user.email, user.password , user.phone_number, user.suscription, user.verification, user.image)
        } catch (error) {
            console.error("Error creating User:", error);
            return null;
        }
    }
}