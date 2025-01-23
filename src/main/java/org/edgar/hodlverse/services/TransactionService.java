package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Transaction;
import org.edgar.hodlverse.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Crear una nueva transacción
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Obtener una transacción por su ID
    public Optional<Transaction> getTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId);
    }

    // Obtener todas las transacciones de un usuario
    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserUserId(userId);
    }

    // Obtener todas las transacciones de una divisa origen
    public List<Transaction> getTransactionsByOriginCurrencyId(Long currencyId) {
        return transactionRepository.findByOriginCurrencyCurrencyId(currencyId);
    }

    // Obtener todas las transacciones de una divisa destino
    public List<Transaction> getTransactionsByDestinationCurrencyId(Long currencyId) {
        return transactionRepository.findByDestinationCurrencyCurrencyId(currencyId);
    }

    // Actualizar una transacción
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Eliminar una transacción por su ID
    public void deleteTransaction(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }
}
