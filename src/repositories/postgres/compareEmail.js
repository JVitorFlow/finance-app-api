import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresCompareEmail {
  async execute(email) {
    try {
      const result = await PostgresHelper.query(
        `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS "exists"`,
        [email],
      );
      console.log("Resultado do PostgresCompareEmail:", result);
      return result[0]?.exists; // Retorna true ou false diretamente
    } catch (error) {
      console.error("Error in PostgresCompareEmail: ", error.message);
      throw error;
    }
  }
}
