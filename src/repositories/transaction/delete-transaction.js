import { prisma } from "../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionID) {
    try {
      const deletedTransaction = await prisma.transaction.delete({
        where: {
          id: transactionID,
        },
      });

      return deletedTransaction;
    } catch (error) {
      return null;
    }
  }
}
