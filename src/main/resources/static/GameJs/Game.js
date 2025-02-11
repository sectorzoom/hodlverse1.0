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
        const endDate = new Date(this.startDate);
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
        const gameData = {
            difficulty: this.difficulty,
            initial_credit: this.initialCredit,
            objective: this.objective,
            duration: 30, // La duración siempre será 30 días
            start_date: this.startDate.toISOString(),
        };

        // Enviar la solicitud POST para crear el juego
        fetch('/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        })
            .then(response => response.json())
            .then(data => {
                this.gameId = data.gameId; // Guardar el ID del juego
                console.log('Juego comenzado:', data);
            })
            .catch(error => {
                console.error('Error al comenzar el juego:', error);
            });
    }

    // Obtener el estado de un juego
    getGameStatus() {
        if (this.gameId === null) {
            console.log('El juego no ha comenzado aún.');
            return;
        }

        fetch(`/games/${this.gameId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Estado del juego:', data);
            })
            .catch(error => {
                console.error('Error al obtener el estado del juego:', error);
            });
    }

    // Realizar una transacción dentro del juego (ejemplo de compra o venta de moneda)
    makeTransaction(transactionData) {
        if (this.gameId === null) {
            console.log('El juego no ha comenzado aún.');
            return;
        }

        fetch(`/games/${this.gameId}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Transacción realizada:', data);
                // Actualizar el crédito del jugador o realizar otras acciones
            })
            .catch(error => {
                console.error('Error al realizar la transacción:', error);
            });
    }

    // Actualizar el crédito del jugador (en función de las transacciones)
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

// Ejemplo de uso:

// Crear un nuevo juego con dificultad 'experienced' (30% de beneficio)
const game = new Game('experienced');

// Iniciar el juego
game.startGame();

// Obtener el estado del juego
game.getGameStatus();

// Realizar una transacción
game.makeTransaction({
    transactionType: 'buy',
    originTransactionAmount: 5000,
    destinationTransactionAmount: 3000,
    originUnitPrice: 1.5,
    destinationUnitPrice: 1.3,
    transactionDate: new Date().toISOString(),
});

// Actualizar el crédito después de una transacción
game.updateCredit(10000);

// Verificar si se ha alcanzado el objetivo
const isGoalReached = game.checkObjective();
console.log('¿Objetivo alcanzado?', isGoalReached);
