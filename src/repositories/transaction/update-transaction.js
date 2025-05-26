import { prisma } from "../../../prisma/prisma.js";

export class PostgresUpdateTransactionsRepository {
  async execute(transactionID, updateTransactionParams) {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionID,
      },
      data: updateTransactionParams,
    });

    return updatedTransaction;
  }
}
