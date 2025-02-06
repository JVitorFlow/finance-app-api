import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "../repositories/postgres/index.js";
import { EmailAlreadyExists } from "../errors/user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    try {
      const postgresgetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWithProvidedEmail =
        await postgresgetUserByEmailRepository.execute(createUserParams.email);

      if (userWithProvidedEmail) {
        throw new EmailAlreadyExists(createUserParams.email);
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
