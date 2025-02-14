import { EmailAlreadyExists } from "../errors/user.js";
import { checkIfEmailIsValid, checkIfPasswordIsValid } from "./helpers/user.js";
import {
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPassworResponse,
  checkIfIdIsValid,
  badRequest,
  ok,
  serverError,
  notFound,
} from "./helpers/index.js";

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const params = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];
      const someFieldIsAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsAllowed) {
        return badRequest({ message: "Some provide field is not invalid" });
      }

      if (params.password) {
        const passwordIsValid = checkIfPasswordIsValid(params.password);

        if (!passwordIsValid) {
          return invalidPassworResponse();
        }
      }

      if (params.email) {
        const emailIsValid = checkIfEmailIsValid(params.email);

        if (!emailIsValid) {
          return emailIsAlreadyInUseResponse(params.email);
        }
      }

      const updatedUser = await this.updateUserUseCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyExists) {
        return notFound({ message: error.message });
      }
      console.log(error);
      return serverError();
    }
  }
}
