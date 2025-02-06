package org.edgar.hodlverse.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private BigDecimal initialCredit;

    @Column(nullable = false)
    private BigDecimal objective;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private LocalDate startDate;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public enum Difficulty {
        BEGINNER,
        EXPERIENCED,
        PERSONALIZED
    }
}
