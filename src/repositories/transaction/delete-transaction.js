import { PostgresHelper } from "../../db/postgres/helper";

export class PostgresDeleteTransactionRepository {
  async execute(transactionID) {
    const deleteQuery = `
      DELETE FROM transactions
      WHERE id = $1
      RETURNING *;
    `;

    const deletedTransaction = await PostgresHelper.query(deleteQuery, [
      transactionID,
    ]);

    return deletedTransaction[0];
  }
}
