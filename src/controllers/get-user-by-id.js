import {
  checkIfIdIsValid,
  ok,
  serverError,
  invalidIdResponse,
  notFound,
} from "./helpers/index.js";

export class GetuserByIdController {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(userId);

      if (!user) {
        return notFound({ message: "User not found" });
      }

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
}
