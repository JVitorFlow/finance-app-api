import { prisma } from "../../../prisma/prisma.js";

export class PostgresGetTransActionUserByIdRepository {
  async execute(userId) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          user_id: userId,
        },
        orderBy: {
          date: "desc", // opcional: ordena da mais recente para a mais antiga
        },
      });

      return transactions;
    } catch (error) {
      console.error("Erro no Repositório:", error.message);
      throw error;
    }
  }
}
