import {
  GetuserByIdController,
  CreateuserController,
  UpdateUserController,
  DeleteUserController,
} from "../../controllers/index.js";
import {
  PostgresGetUserByIdRepository,
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
  PostgresUpdateUserRepository,
  PostgresDeleteUserRepository,
} from "../../repositories/postgres/index.js";
import {
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "../../use-cases/index.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetuserByIdController(getUserByIdUseCase);
  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const creatUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    getUserByEmailRepository,
    creatUserRepository,
  );
  const createuserController = new CreateuserController(createUserUseCase);
  return createuserController;
};

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserRepository = new PostgresUpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    getUserByEmailRepository,
    updateUserRepository,
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);
  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  return deleteUserController;
};
