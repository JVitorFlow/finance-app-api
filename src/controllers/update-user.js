import { badRequest, ok, serverError, notFound } from "./helpers.js";
import validator from "validator";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyExists } from "../errors/user.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = validator.isUUID(userId);
      if (!isIdValid) {
        return badRequest({ message: "The provide id is not valid" });
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];
      const someFieldIsAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsAllowed) {
        return badRequest({ message: "Some provide field is not invalid" });
      }

      if (updateUserParams.password) {
        const passwordIsNotValid = updateUserParams.password.length < 6;

        if (passwordIsNotValid) {
          return badRequest({
            message: "Password must be at least 6 characters",
          });
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);

        if (!emailIsValid) {
          return badRequest({
            message: "Invalid e-mail. Please provide a valid one",
          });
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
        userId,
        updateUserParams,
      );

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
