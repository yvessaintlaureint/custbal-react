// src/models/Transaction.js
class Transaction {
    constructor(id, description, amount) {
      this._id = id;
      this._description = description;
      this._amount = amount;
    }
  
    get id() {
      return this._id;
    }
  
    get description() {
      return this._description;
    }
  
    get amount() {
      return this._amount;
    }

    set description(newDescription) {
        this._description = newDescription;
      }
    
      set amount(newAmount) {
        this._amount = newAmount;
        
      }
    
    getDisplayText() {
        return `ID: ${this._id}, Description: ${this._description}, Amount: ${this._amount}`;
    }
      
    }
    
    export default Transaction;
  