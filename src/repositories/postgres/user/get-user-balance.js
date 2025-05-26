import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const query = `
      SELECT * FROM get_user_balance($1)
    `;

    const result = await PostgresHelper.query(query, [userId]);

    return {
      userId,
      ...result[0],
    };
  }
}
