import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresGetUserByIdRepository {
  async execute(userid) {
    const user = await PostgresHelper.query(
      "SELECT * FROM users WHERE id = $1",
      [userid],
    );

    return user[0];
  }
}
