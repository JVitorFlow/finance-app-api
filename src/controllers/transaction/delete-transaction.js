import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  transactionNotFoundResponse,
} from "../helpers/index.js";

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase;
  }

  async execute(htttpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(htttpRequest.params.transactionId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deleteTransaction = await this.deleteTransactionUseCase.execute(
        htttpRequest.params.transactionId,
      );

      if (!deleteTransaction) {
        return transactionNotFoundResponse();
      }

      return ok(deleteTransaction);
    } catch (error) {
      console.error("Erro no Controller:", error.message);
      return serverError();
    }
  }
}
