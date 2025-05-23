import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresGetTransActionUserByIdRepository {
  async execute(userId) {
    try {
      const query = {
        text: `SELECT * FROM transactions WHERE user_id = $1`,
        values: [userId],
      };
      const result = await PostgresHelper.query(query);

      return result;
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      throw error;
    }
  }
}
