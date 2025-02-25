import { UserNotFoundError } from "../../errors/user.js";

export class GetTransActionUserById {
  constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(params) {
    try {
      const user = await this.getUserByIdRepository.execute(params.userId);

      if (!user) {
        throw new UserNotFoundError(params.userId);
      }
      const transactions = await this.getTransactionsByUserIdRepository.execute(
        params.userId,
      );

      return transactions;
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
