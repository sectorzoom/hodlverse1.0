package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Transaction;
import org.edgar.hodlverse.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Obtener todas las transacciones
    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    // Guardar una nueva transacción
    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Buscar una transacción por su ID
    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    // Eliminar una transacción por su ID
    public void deleteById(Long id) {
        transactionRepository.deleteById(id);
    }
}