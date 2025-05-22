export class UpdateTransactionUseCase {
  constructor(updateTransactionRepository) {
    this.updateTransactionRepository = updateTransactionRepository;
  }

  async execute(transactionID, params) {
    const transaction = await this.updateTransactionRepository.execute(
      transactionID,
      params,
    );
    return transaction;
  }
}
