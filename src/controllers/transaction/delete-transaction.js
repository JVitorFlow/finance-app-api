import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
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

      const transactionid = await this.deleteTransactionUseCase.execute(
        htttpRequest.params.transactionId,
      );
      return ok(transactionid);
    } catch (error) {
      console.error("Erro no Controller:", error.message);
      return serverError();
    }
  }
}
