import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserByIdRepository {
  async execute(userid) {
    return await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });
  }
}
