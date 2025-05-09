import { UserNotFoundError } from "../../errors/user.js";

export class GetTransActionUserByIdUseCase {
  constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(userId) {
    try {
      const user = await this.getUserByIdRepository.execute(userId);

      if (!user) {
        console.warn("Usuário não encontrado com ID:", userId);
        throw new UserNotFoundError(userId);
      }
      const transactions =
        await this.getTransactionsByUserIdRepository.execute(userId);

      return transactions;
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
