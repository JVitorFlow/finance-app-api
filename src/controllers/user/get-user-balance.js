import { UserNotFoundError } from "../../errors/user.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetUserBalanceController {
  constructor(getUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const userBalance = await this.getUserBalanceUseCase.execute({ userId });

      if (!userBalance) {
        return userNotFoundResponse();
      }

      return ok(userBalance);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      console.error("Erro no Controller:", error.message);
      return serverError();
    }
  }
}
