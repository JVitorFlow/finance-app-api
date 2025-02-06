import { PostgresDeleteUserRepository } from "../repositories/postgres/index.js";

export class DeleteUserUseCase {
  async execute(userId) {
    const postgressdeleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUser = await postgressdeleteUserRepository.execute(userId);
    return deleteUser[0];
  }
}
