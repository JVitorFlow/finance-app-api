import validator from "validator";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { ok, serverError, badRequest, notFound } from "./helpers.js";

export class GetuserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return badRequest({ message: "The provide id is not valid" });
      }
      const userId = httpRequest.params.userId;
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
