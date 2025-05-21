export class DelteTransactionUseCase {
  constructor(deleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository;
  }
  async execute(transactionId) {
    const transaction =
      await this.deleteTransactionRepository.deleteTransaction(transactionId);

    return transaction;
  }
}
