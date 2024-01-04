// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import TransactionService from '../services/TransactionService';
import Transaction from '../models/Transaction';
import IncomeTransaction from '../models/IncomeTransaction';
import TransactionCard from '../components/TransactionCard';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const transactionService = new TransactionService();

  useEffect(() => {
    const updatedTransactions = transactionService.getTransactions();
    setTransactions(updatedTransactions);
    updateTotalBalance(updatedTransactions);
    setTransactionHistory(updatedTransactions);
  }, []);

  const updateTotalBalance = (transactions) => {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalBalance(total);
  };
  
  const handleAddTransaction = () => {
    const amount = parseFloat(newAmount) * (transactionType === 'expense' ? -1 : 1);
    const newTransaction = transactionType === 'expense'
      ? new Transaction(transactions.length + 1, newDescription, amount)
      : new IncomeTransaction(transactions.length + 1, newDescription, amount, 'Job');
  
    transactionService.addTransaction(newTransaction);
  
    const updatedTransactions = transactionService.getTransactions();
    setTransactions(updatedTransactions);
    
    // Update total balance by adding the amount of the new transaction
    setTotalBalance(prevTotalBalance => prevTotalBalance + amount);
  
    setTransactionHistory((prevHistory) => [...prevHistory, newTransaction]); // Update transactionHistory
  
    setNewDescription('');
    setNewAmount('');
  };
  const handleDeleteTransaction = (transactionId) => {
    transactionService.deleteTransaction(transactionId);
  
    const updatedTransactions = transactionService.getTransactions();
    setTransactions(updatedTransactions);
    updateTotalBalance(updatedTransactions);
  
    setTransactionHistory((prevHistory) => prevHistory.filter(item => item.id !== transactionId)); // Remove deleted transaction
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Transactions</Text>
      <Text style={styles.balanceText}>Total Balance: {totalBalance}</Text>
      <FlatList
          data={transactionHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionCard
              key={item.id.toString()} // tambahkan key di sini
              transaction={item}
              onDelete={() => handleDeleteTransaction(item.id)}
            />
          )}
        />
      <View style={styles.addTransactionContainer}>
        <Text style={styles.sectionTitle}>Add New Transaction:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newDescription}
          onChangeText={(text) => setNewDescription(text)}
        />
        <View style={styles.amountContainer}>
          <Picker
            style={styles.picker}
            selectedValue={transactionType}
            onValueChange={(itemValue) => setTransactionType(itemValue)}>
            <Picker.Item label="Expense" value="expense" />
            <Picker.Item label="Income" value="income" />
          </Picker>
          <TextInput
            style={styles.amountInput}
            placeholder="Amount"
            value={newAmount}
            onChangeText={(text) => setNewAmount(text)}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={handleAddTransaction} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  addTransactionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    height: 40,
  },
  amountInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
