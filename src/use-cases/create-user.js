import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";

export class CreateUserUseCase {
  constructor() {}
  async execute(createUserParams) {
    // TODO: verifica se o email já está em uso

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
  }
}
