class TransactionService {
    constructor() {
      this._transactions = [];
    }
  
    addTransaction(transaction) {
      this._transactions.push(transaction);
    }
  
    getTransactions() {
      return this._transactions;
    }
  
    updateTransaction(transactionId, updatedTransaction) {
      const index = this._transactions.findIndex((t) => t.id === transactionId);
      if (index !== -1) {
        this._transactions[index] = updatedTransaction;
      }
    }
  
    deleteTransaction(transactionId) {
      this._transactions = this._transactions.filter((t) => t.id !== transactionId);
    }
  }
  
  export default TransactionService;
  