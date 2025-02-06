import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  notFound,
  ok,
} from "./helpers/index.js";
import { DeleteUserUseCase } from "../use-cases/index.js";

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }
      const deleteUserUseCase = new DeleteUserUseCase();
      const user = await deleteUserUseCase.execute(userId);
      if (!user) {
        return notFound({ message: "User not found" });
      }
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
