package org.edgar.hodlverse.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long currencyId;

    @Column(nullable = false, length = 50)
    private String currencyName;

    @Column(nullable = false, unique = true, length = 10)
    private String ticker;

    @Column(nullable = false, length = 50)
    private double current_price;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Balance> balances;

    @OneToMany(mappedBy = "originCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> originTransactions;

    @OneToMany(mappedBy = "destinationCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> destinationTransactions;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<History> history;

    // Getters y Setters
}
