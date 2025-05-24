import { UserNotFoundError } from "../../errors/user.js";

export class GetUserBalanceUseCase {
  constructor(getUserBalanceRepository, getUserByIdRepository) {
    this.getUserBalanceRepository = getUserBalanceRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(params) {
    try {
      const userId = params.userId;

      const user = await this.getUserByIdRepository.execute(userId);

      if (!user) {
        console.warn("Usuário não encontrado com ID:", userId);
        throw new UserNotFoundError(userId);
      }
      const balance = await this.getUserBalanceRepository.execute(userId);

      return balance;
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
