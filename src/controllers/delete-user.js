import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  ok,
  userNotFoundResponse,
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
      const deletedUser = await deleteUserUseCase.execute(userId);

      if (!deletedUser) {
        return userNotFoundResponse();
      }

      return ok(deletedUser);
    } catch (error) {
      return serverError();
    }
  }
}
