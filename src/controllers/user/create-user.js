import { ZodError } from "zod";
import { EmailAlreadyExists } from "../../errors/user.js";
import { createUserSchema } from "../../schemas/user.js";
import { badRequest, serverError, created } from "../helpers/index.js";

export class CreateuserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httprequest) {
    try {
      const params = httprequest.body;

      await createUserSchema.parseAsync(params);

      // chamar o use case
      const createdUser = await this.createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      console.error("Erro no Controller:", error.message);

      if (error instanceof ZodError) {
        const firstError = error.errors[0];

        return badRequest({
          message: firstError.message,
        });
      }

      if (error instanceof EmailAlreadyExists) {
        return badRequest({ message: error.message });
      }
      return serverError();
    }
  }
}
