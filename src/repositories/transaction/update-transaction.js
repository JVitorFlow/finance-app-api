import { PostgresHelper } from "../../db/postgres/helper";

export class PostgresUpdateTransactionsRepository {
  async execute(transactionID, updateTransactionparams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateTransactionparams).forEach((key) => {
      updateFields.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updateTransactionparams[key]);
    });

    updateValues.push(transactionID);

    const updateQuery = `
        UPDATE transactions
        SET ${updateFields.join(", ")}
        WHERE id = $${updateValues.length}
        RETURNING *
    `;
    const updatedUser = await PostgresHelper.query(updateQuery, updateValues);
    return updatedUser[0];
  }
}
