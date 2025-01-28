package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Transaction;
import org.edgar.hodlverse.services.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions") // Ruta base para el controlador
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // Obtener todas las transacciones
    @GetMapping
    public List<Transaction> all() {
        return transactionService.findAll();
    }

    // Crear una nueva transacción
    @PostMapping
    public Transaction newTransaction(@RequestBody Transaction newTransaction) {
        return transactionService.save(newTransaction);
    }

    // Obtener una transacción específica por su ID
    @GetMapping("/{id}")
    public Transaction one(@PathVariable Long id) {
        return transactionService.findById(id)
                .orElseThrow(() -> new RuntimeException("Transacción con ID " + id + " no encontrada."));
    }

    // Actualizar una transacción existente
    @PutMapping("/{id}")
    public Transaction replaceTransaction(@RequestBody Transaction newTransaction, @PathVariable Long id) {
        return transactionService.findById(id)
                .map(transaction -> {
                    transaction.setTransactionType(newTransaction.getTransactionType());
                    transaction.setOriginTransactionAmount(newTransaction.getOriginTransactionAmount());
                    transaction.setDestinationTransactionAmount(newTransaction.getDestinationTransactionAmount());
                    transaction.setOriginUnitPrice(newTransaction.getOriginUnitPrice());
                    transaction.setDestinationUnitPrice(newTransaction.getDestinationUnitPrice());
                    transaction.setTransactionDate(newTransaction.getTransactionDate());
                    transaction.setUser(newTransaction.getUser());
                    transaction.setOriginCurrency(newTransaction.getOriginCurrency());
                    transaction.setDestinationCurrency(newTransaction.getDestinationCurrency());
                    return transactionService.save(transaction);
                })
                .orElseGet(() -> {
                    newTransaction.setTransactionId(id);
                    return transactionService.save(newTransaction);
                });
    }

    // Eliminar una transacción por su ID
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteById(id);
    }
}
