import Transaction from './Transaction';

class IncomeTransaction extends Transaction {
  constructor(id, description, amount, source) {
    super(id, description, amount);
    this._source = source;
  }

  get source() {
    return this._source;
  }

  toString() {
    return `${super.toString()}, Source: ${this._source}`;
  }

  getTransactionInfo() {
    return `${super.getTransactionInfo()}, Source: ${this._source}`;
  }

  getDisplayText() {
    return `${super.getDisplayText()}, Source: ${this._source}`;
  }
}

export default IncomeTransaction;
