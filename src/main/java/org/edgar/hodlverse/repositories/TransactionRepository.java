package org.edgar.hodlverse.repositories;

import org.edgar.hodlverse.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Métodos personalizados (si los necesitas)
    List<Transaction> findByUserUserId(Long userId); // Buscar transacciones por ID de usuario
    List<Transaction> findByOriginCurrencyCurrencyId(Long currencyId); // Buscar transacciones por ID de divisa origen
    List<Transaction> findByDestinationCurrencyCurrencyId(Long currencyId); // Buscar transacciones por ID de divisa destino
    List<Transaction> findByUser_UserId(Long userId); //Buscar transacciones por el id de usuario.
    // Obtener transacciones del usuario desde una fecha específica, ordenadas por fecha descendente (la buena)
    @Query("SELECT t FROM Transaction t WHERE t.user.userId = :userId AND t.transactionDate >= :startDate ORDER BY t.transactionDate DESC")
    List<Transaction> findTransactionsByUser_UserIdAndTransactionDateGreaterThanEqualOrderByTransactionDateDesc(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);

}
