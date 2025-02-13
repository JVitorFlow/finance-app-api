import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { EmailAlreadyExists } from "../errors/user.js";

export class CreateUserUseCase {
  constructor(getUserByEmailRepository, createUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
  }
  async execute(createUserParams) {
    try {
      const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
        createUserParams.email,
      );

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

      return await this.createUserRepository.execute(user);
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
