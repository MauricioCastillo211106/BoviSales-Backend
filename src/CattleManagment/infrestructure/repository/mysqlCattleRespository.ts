import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";
import { query } from "../../../database/mysql";
import { throws } from "assert";

export class MysqlCattleRepository implements CattleInterface {

    

    async createCattle(cattle: Cattle): Promise<Cattle | null  | string> {
        try {
            // Verificar que el id_user existe en la tabla user
            const checkUserSql = `
                SELECT * FROM user WHERE id = ?
            `;
            console.log(cattle.id_user,"")
            const checkUserParams: any[] = [cattle.id_user];
            const userResult: any = await query(checkUserSql, checkUserParams);
            console.log(userResult[0])
            
            if (userResult[0].length === 0) {
                console.error("Erro r: id_user does not exist");
                throw new Error("Error, Usuario no encontrado");
            }
    
            // Continuar con la inserción del registro en la tabla Cattle
            const sql = `
                INSERT INTO Cattle (
                    name, 
                    weight, 
                    earringNumber, 
                    age, 
                    gender, 
                    breed, 
                    image,
                    id_user
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const params: any[] = [
                cattle.name, 
                cattle.weight, 
                cattle.earringNumber, 
                cattle.age, 
                cattle.gender, 
                cattle.breed, 
                cattle.image,
                cattle.id_user
            ];
            const [result]: any = await query(sql, params);
            const id = result.insertId;
            console.log(id)
    
            // Crear y devolver una nueva instancia de Cattle con los datos proporcionados.
            return new Cattle(
                id,
                cattle.name, 
                cattle.weight, 
                cattle.earringNumber, 
                cattle.age, 
                cattle.gender, 
                cattle.breed, 
                cattle.image,
                cattle.id_user
            );
        } catch (error) {
            console.error("Error creating Cattle:", error);
            return null;
        }
    }

    async getAllCattle(): Promise<Cattle[] | null> {
        try {
            const sql = "SELECT * FROM Cattle";
            const [rows]: any = await query(sql);

            // Verificar que rows es un array
            if (!Array.isArray(rows)) {
                console.error('Rows is not an array');
                return null;
            }

            // Mapear cada fila a una instancia de Cattle
            const cattleList: Cattle[] = rows.map((row: any) => {
                return new Cattle(
                    row.id,
                    row.name,
                    row.weight,
                    row.earringNumber,
                    row.age,
                    row.gender,
                    row.breed,
                    row.image,
                    row.id_user
                );
            });

            return cattleList;

        } catch (error) {
            console.error("Error fetching all cattle:", error);
            return null; // O puedes retornar un array vacío dependiendo de tu preferencia: []
        }
    }

    async getCattleById(id: number): Promise<Cattle | null> {
        try {
            const sql = "SELECT * FROM Cattle WHERE id = ?";
            const [rows]: any = await query(sql, [id]);

            if (rows.length === 0) {
                return null; // No se encontró el registro
            }

            const row = rows[0];
            return new Cattle(
                row.id,
                row.name,
                row.weight,
                row.earringNumber,
                row.age,
                row.gender,
                row.breed,
                row.image,
                row.id_user
            );

        } catch (error) {
            console.error("Error fetching cattle by ID:", error);
            return null;
        }
    }
    async deleteCattleById(id: number): Promise<string | null> {
        try {
            const sql = "DELETE FROM Cattle WHERE id = ?";
            const result: any = await query(sql, [id]);
            
            if(result[0].affectedRows > 0){
                return "Se a eliminado correctamente"
            }else{
                return "No se puedo eliminar"
            }

        } catch (error) {
            console.error("Error deleting cattle by ID:", error);
            return "Error";
        }
    }
    
    async updateCattleById(id: number, cattleData: Partial<Cattle>): Promise<Cattle | null> {
        try {
            const fields = Object.keys(cattleData).map(key => `${key} = ?`).join(", ");
            const values = Object.values(cattleData);
            values.push(id);

            const sql = `UPDATE Cattle SET ${fields} WHERE id = ?`;
            const result: any = await query(sql, values);

            if (result.affectedRows === 0) {
                return null;
            }

            const updatedCattle: Cattle | null = await this.getCattleById(id);
            return updatedCattle;
        } catch (error) {
            console.error("Error updating cattle by ID:", error);
            return null;
        }
    }

    async getCattleByBreed(breed: string): Promise<Cattle[]> {
        try {
            const sql = "SELECT * FROM Cattle WHERE breed = ?";
            const [rows]: any = await query(sql, [breed]);
    
            // Si no hay filas, retornar un array vacío
            if (!rows || rows.length === 0) {
                return [];
            }
    
            return rows.map((row: any) => new Cattle(
                row.id,
                row.name,
                row.weight,
                row.earringNumber,
                row.age,
                row.gender,
                row.breed,
                row.image,
                row.id_user
            ));
        } catch (error) {
            console.error("Error fetching cattle by breed:", error);
            throw error;
        }
    }
    async getCattleByEarringNumber(earringNumber: number): Promise<Cattle | null> {
        try {
            const sql = "SELECT * FROM Cattle WHERE earringNumber = ?";
            const [rows]: any = await query(sql, [earringNumber]);

            if (rows.length === 0) {
                return null;
            }

            const row = rows[0];
            return new Cattle(
                row.id,
                row.name,
                row.weight,
                row.earringNumber,
                row.age,
                row.gender,
                row.breed,
                row.image,
                row.id_user
            );
        } catch (error) {
            console.error("Error fetching cattle by earring number:", error);
            return null;
        }
    }
}
