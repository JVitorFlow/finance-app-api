import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresGetTransActionUserByIdRepository,
  PostgresUpdateTransactionsRepository,
  PostgresDeleteTransactionRepository,
} from "../../repositories/index.js";
import {
  CreateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransActionUserByIdUseCase,
  UpdateTransactionUseCase,
} from "../../use-cases/index.js";
import {
  CreateTransactionController,
  DeleteTransactionController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository =
    new PostgresUpdateTransactionsRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository,
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  );

  return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
  const deleteTransactionRepository = new PostgresDeleteTransactionRepository();

  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    deleteTransactionRepository,
  );

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase,
  );

  return deleteTransactionController;
};
