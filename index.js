import "dotenv/config.js";
import express from "express";
import {
  CreateuserController,
  GetuserByIdController,
  UpdateUserController,
  DeleteUserController,
} from "./src/controllers/index.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { PostgresGetUserByIdRepository } from "./src/repositories/postgres/get-user-by-id.js";
import { CreateUserUseCase } from "./src/use-cases/create-user.js";
import { PostgresCreateUserRepository } from "./src/repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "./src/repositories/postgres/get-user-by-email.js";

const app = express();

app.use(express.json());

app.get("/api/users/:userId", async (request, response) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetuserByIdController(getUserByIdUseCase);
  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/users", async (request, response) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const creatUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    getUserByEmailRepository,
    creatUserRepository,
  );
  const createuserController = new CreateuserController(createUserUseCase);
  const { statusCode, body } = await createuserController.execute(request);
  response.status(statusCode).json(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute(request);
  response.status(statusCode).json(body);
});

app.delete("/api/users/:userId", async (request, response) => {
  const deleteUserController = new DeleteUserController();
  const { statusCode, body } = await deleteUserController.execute(request);
  response.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`),
);
