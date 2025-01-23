package org.edgar.hodlverse.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Balance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceId;

    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal walletAmount;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    @ManyToOne
    @JoinColumn(name = "currency_id", nullable = false)
    private Currency currency;

    // Getters y Setters
}
