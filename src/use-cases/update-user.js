import {
  PostgresGetUserByEmailRepository,
  PostgresUpdateUserRepository,
} from "../repositories/postgres/index.js";

import { EmailAlreadyExists } from "../errors/user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const postgresgetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWithProvidedEmail =
        await postgresgetUserByEmailRepository.execute(updateUserParams.email);

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
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updatedUser = await postgresUpdateUserRepository.execute(
      userId,
      user,
    );

    return await updatedUser;
  }
}
