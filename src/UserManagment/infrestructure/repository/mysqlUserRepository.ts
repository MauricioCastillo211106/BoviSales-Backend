import { User,Userlogin } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";
import { query } from "../../../database/mysql";
import { compare } from "bcrypt";
import { tokenSigIn } from "../../../helpers/token";

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

    async updatePassword(email: string, newPassword: string): Promise<boolean> {
      try {
          const sql = 'UPDATE User SET password = ? WHERE email = ?';
          const [result]: any = await query(sql, [newPassword, email]);
          return result.affectedRows > 0;
      } catch (error) {
          console.error('Error updating password:', error);
          return false;
      }
  }
              

   
          async loginUser(email: string, password: string): Promise<Userlogin | null | string> {
        try {
          // Consulta a la base de datos para obtener el usuario por correo electrónico
          const rows = await query('SELECT * FROM User WHERE email = ?', [email]);
          console.log('Rows retrieved from DB:', rows);
          
          // Verifica si se encontró el usuario
          if (!rows || (rows as any[]).length === 0 || !(rows[0] as any[]).length) {
            console.error('No user found with email:', email);
            return "Usuario no encontrado"; // Usuario no encontrado
          }
          
      
          const user: any = (rows[0] as any)[0];
          
          // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
          const passwordMatches = await compare(password, user.password);
          if (!passwordMatches) {
            return "Contraseña incorrecta"; // Contraseña incorrecta
          }
      
          // Generar un token JWT
          const token: string = tokenSigIn(user.uuid, user.email);
      
          // Crear una instancia de UserLogin con el token
          const userLogin = new Userlogin(
            token,
            user.uuid,
            user.name,
            user.email,
            user.phone_number,
            user.suscription,
            user.verification,
            user.image
          );
      
          // Retornar la entidad UserLogin
          return userLogin;
      
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }  
    }
    async getByEmail(email: string): Promise<User | null> {
      try {
          const sql = "SELECT * FROM users WHERE email = ? LIMIT 1"; // SQL para obtener un usuario por uuid
          const [rows]: any = await query(sql, [email]); // Ejecutamos la consulta, pasando el uuid como parámetro

          if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
          const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
          // Retornamos una nueva instancia de User con los datos obtenidos
          return new User(row.name, row.email, row.passwordHash, row.phone_number, row.suscription, row.verification, row.image);
      } catch (error) {
          console.error(error);
          return null; // En caso de error, retornamos null
      }
  }
}