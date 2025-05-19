import {
  badRequest,
  checkIfAmountIsValid,
  checkIfIdIsValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidIdResponse,
  invalidTypeResponse,
  ok,
  serverError,
} from "../helpers";

export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transactionID);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const params = httpRequest.body;

      const allowedFields = ["name", "date", "amount", "type"];
      const someFieldIsAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsAllowed) {
        return badRequest({ message: "Some provide field is not invalid" });
      }

      if (params.amount) {
        const amountIsValid = checkIfAmountIsValid(params.amount);

        if (!amountIsValid) {
          return invalidAmountResponse();
        }
      }

      if (params.type) {
        const typeIsValid = checkIfTypeIsValid(params.type);
        if (!typeIsValid) {
          return invalidTypeResponse();
        }
      }

      const transactionID = await this.updateTransactionUseCase.execute(
        httpRequest.params.transactionID,
        params,
      );

      return ok(transactionID);
    } catch (error) {
      console.error("Erro no Controller:", error.message);
      return serverError();
    }
  }
}
