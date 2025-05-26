import { ZodError } from "zod";
import { createTransactionShema } from "../../schemas/transactions.js";
import { badRequest, created, serverError } from "../helpers/index.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      await createTransactionShema.parseAsync(params);
      const transaction = await this.createTransactionUseCase.execute(params);

      return created(transaction);
    } catch (error) {
      console.error("Erro no Controller:", error.message);

      if (error instanceof ZodError) {
        const firstError = error.errors[0];

        return badRequest({
          message: firstError.message,
        });
      }

      return serverError();
    }
  }
}
