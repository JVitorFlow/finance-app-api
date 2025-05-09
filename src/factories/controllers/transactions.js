import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresGetTransActionUserByIdRepository,
} from "../../repositories/index.js";
import {
  CreateTransactionUseCase,
  GetTransActionUserByIdUseCase,
} from "../../use-cases/index.js";
import {
  CreateTransactionController,
  GetTransactionByUserIdController,
} from "../../controllers/index.js";

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

export const makeGetTransactionByUserIdController = () => {
  const getTransactionsByUserIdRepository =
    new PostgresGetTransActionUserByIdRepository();

  const getUserByIdRepository = new PostgresGetUserByIdRepository(
    getTransactionsByUserIdRepository,
  );

  const getTransactionsByUserIdUseCase = new GetTransActionUserByIdUseCase(
    getTransactionsByUserIdRepository,
    getUserByIdRepository,
  );
  const getTransactionByUserIdController = new GetTransactionByUserIdController(
    getTransactionsByUserIdUseCase,
  );

  return getTransactionByUserIdController;
};
