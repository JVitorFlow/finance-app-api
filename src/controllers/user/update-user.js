import { EmailAlreadyExists } from "../../errors/user.js";
import {
  invalidIdResponse,
  checkIfIdIsValid,
  badRequest,
  ok,
  serverError,
  notFound,
} from "../helpers/index.js";
import { updateUserSchema } from "../../schemas/user.js";
import { ZodError } from "zod";

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

      await updateUserSchema.parseAsync(params);
      const updatedUser = await this.updateUserUseCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];

        return badRequest({
          message: firstError.message,
        });
      }

      if (error instanceof EmailAlreadyExists) {
        return notFound({ message: error.message });
      }
      console.log(error);
      return serverError();
    }
  }
}
