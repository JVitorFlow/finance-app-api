import { UserNotFoundError } from "../../errors/user.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  requiredFieldIsMissingResponse,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetTransactionByUserIdController {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      if (!userId) {
        return requiredFieldIsMissingResponse("userId");
      }

      const userIdIsValid = checkIfIdIsValid(userId);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const transactions =
        await this.getTransactionsByUserIdUseCase.execute(userId);
      return ok(transactions);
    } catch (error) {
      console.error("Erro no Use Case:", error.message);
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      return serverError();
    }
  }
}
