import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
} from "../../repositories/index.js";
import { CreateTransactionUseCase } from "../../use-cases/index.js";
import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository(
    createTransactionRepository,
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  );
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );

  return createTransactionController;
};
