class Game {
    constructor(difficulty, startDate = new Date()) {
        this.difficulty = difficulty;
        this.startDate = startDate;
        this.endDate = this.calculateEndDate(); // Duración de 30 días
        this.initialCredit = 100000; // Crédito inicial 100.000€
        this.currentCredit = this.initialCredit;
        this.objective = this.calculateObjective(); // Objetivo dependiendo de la dificultad
        this.gameId = null; // ID del juego que se generará al crear el juego
    }

    // Calcular la fecha de finalización (30 días después de la fecha de inicio)
    calculateEndDate() {
        let endDate = new Date(this.startDate);
        endDate.setDate(this.startDate.getDate() + 30); // Sumar 30 días
        return endDate;
    }

    // Calcular el objetivo según la dificultad
    calculateObjective() {
        switch (this.difficulty) {
            case 'beginner':
                return this.initialCredit * 0.1; // 10% de beneficio
            case 'experienced':
                return this.initialCredit * 0.3; // 30% de beneficio
            case 'personalized':
                return 0; // Puede ser un valor personalizado
            default:
                throw new Error('Dificultad no válida');
        }
    }

    // Comenzar un juego
    startGame() {
        let gameData = {
            difficulty: this.difficulty,
            initial_credit: this.initialCredit,
            objective: this.objective,
            duration: 30, // La duración siempre será 30 días
            start_date: this.startDate.toISOString(),
        };

        $.ajax({
            url: '/games',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(gameData),
            success: (data) => {
                this.gameId = data.gameId; // Guardar el ID del juego
                console.log('Juego comenzado:', data);
            },
            error: (error) => {
                console.error('Error al comenzar el juego:', error);
            }
        });
    }

    // Obtener el estado de un juego
    getGameStatus() {
        if (this.gameId === null) {
            console.log('El juego no ha comenzado aún.');
            return;
        }

        $.ajax({
            url: `/games/${this.gameId}`,
            type: 'GET',
            success: (data) => {
                console.log('Estado del juego:', data);
            },
            error: (error) => {
                console.error('Error al obtener el estado del juego:', error);
            }
        });
    }

    // Realizar una transacción dentro del juego
    makeTransaction(transactionData) {
        if (this.gameId === null) {
            console.log('El juego no ha comenzado aún.');
            return;
        }

        $.ajax({
            url: `/games/${this.gameId}/transactions`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(transactionData),
            success: (data) => {
                console.log('Transacción realizada:', data);
                this.updateCredit(transactionData.destinationTransactionAmount);
            },
            error: (error) => {
                console.error('Error al realizar la transacción:', error);
            }
        });
    }

    // Actualizar el crédito del jugador
    updateCredit(amount) {
        this.currentCredit += amount;
        console.log('Nuevo crédito:', this.currentCredit);
    }

    // Verificar si el jugador ha alcanzado el objetivo
    checkObjective() {
        if (this.currentCredit >= this.initialCredit + this.objective) {
            console.log('¡Felicidades! Has alcanzado el objetivo.');
            return true;
        }
        return false;
    }
}

// Ejemplo de uso con jQuery:

$(document).ready(function () {
    let game = new Game('experienced');

    // Botón para comenzar el juego
    $('#startGame').click(function () {
        game.startGame();
    });

    // Botón para obtener el estado del juego
    $('#getGameStatus').click(function () {
        game.getGameStatus();
    });

    // Botón para hacer una transacción de prueba
    $('#makeTransaction').click(function () {
        let transactionData = {
            transactionType: 'buy',
            originTransactionAmount: 5000,
            destinationTransactionAmount: 3000,
            originUnitPrice: 1.5,
            destinationUnitPrice: 1.3,
            transactionDate: new Date().toISOString(),
        };
        game.makeTransaction(transactionData);
    });

    // Botón para verificar si se alcanzó el objetivo
    $('#checkObjective').click(function () {
        let isGoalReached = game.checkObjective();
        console.log('¿Objetivo alcanzado?', isGoalReached);
    });
});
