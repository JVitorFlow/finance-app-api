import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const results = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        user_id: userId,
      },
      _sum: {
        amount: true,
      },
    });

    let earnings = 0;
    let expenses = 0;
    let investments = 0;

    for (const row of results) {
      if (row.type === "EARNING") earnings = row._sum.amount || 0;
      if (row.type === "EXPENSE") expenses = row._sum.amount || 0;
      if (row.type === "INVESTMENT") investments = row._sum.amount || 0;
    }

    const balance = earnings - expenses - investments;

    return {
      earnings,
      expenses,
      investments,
      balance,
    };
  }
}
