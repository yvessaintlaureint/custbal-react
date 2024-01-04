// src/components/TransactionCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionCard = ({ transaction, onDelete }) => {
  const isExpense = transaction.amount < 0;
  const amountColor = isExpense ? 'red' : 'green';

  return (
    <View style={[styles.container, { borderColor: amountColor }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.transactionText}>{transaction.description}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={{ ...styles.amountText, color: amountColor }}>{transaction.amount}</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default TransactionCard;
