import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { ok, serverError, badRequest, notFound } from "./helpers/http.js";
import { checkIdIsValid } from "./helpers/user.js";

export class GetuserByIdController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIdIsValid(userId);
      if (!isIdValid) {
        return badRequest({ message: "The provide id is not valid" });
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
