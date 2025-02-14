import { EmailAlreadyExists } from "../errors/user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
  constructor(postgresgetUserByEmailRepository, postgresUpdateUserRepository) {
    this.postgresgetUserByEmailRepository = postgresgetUserByEmailRepository;
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const userWithProvidedEmail =
        await this.postgresgetUserByEmailRepository.execute(
          updateUserParams.email,
        );

      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyExists(updateUserParams.email);
      }
    }

    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      // criptografar a senha
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    // chamar o repositorio para atualizar o usuário
    const updatedUser = await this.postgresUpdateUserRepository.execute(
      userId,
      user,
    );

    return await updatedUser;
  }
}
