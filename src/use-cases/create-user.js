import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresCompareEmail } from "../repositories/postgres/compareEmail.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    try {
      const postgresCompareEmail = new PostgresCompareEmail();

      const emailExists = await postgresCompareEmail.execute(
        createUserParams.email,
      );

      if (emailExists) {
        throw new Error("E-mail is already in use");
      }

      // gerar ID do usuário
      const userId = uuidv4();

      // criptografar a senha
      const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

      // inserir o usuário no banco de dados
      const user = {
        ...createUserParams,
        id: userId,
        password: hashedPassword,
      };

      // chama o repositório
      const postgresCreateUserRepository = new PostgresCreateUserRepository();

      return await postgresCreateUserRepository.execute(user);
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
