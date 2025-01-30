package org.edgar.hodlverse.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false, length = 20)
    private String transactionType; // Puede ser "buy", "sell", "exchange"

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal originTransactionAmount;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal destinationTransactionAmount;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal originUnitPrice;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal destinationUnitPrice;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "origin_currency_id", nullable = false)
    private Currency originCurrency;

    @ManyToOne
    @JoinColumn(name = "destination_currency_id", nullable = false)
    private Currency destinationCurrency;


}