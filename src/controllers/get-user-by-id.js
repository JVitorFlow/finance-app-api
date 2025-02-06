import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
  checkIfIdIsValid,
  ok,
  serverError,
  invalidIdResponse,
  notFound,
} from "./helpers/index.js";

export class GetuserByIdController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);

      if (!user) {
        return notFound({ message: "User not found" });
      }

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
