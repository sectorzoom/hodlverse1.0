class Result {
    constructor(resultId, ending, profit, game, resultDate) {
        this.resultId = resultId;
        this.ending = ending;  // Enum: 'BANKRUPTCY', 'OUT_OF_TIME', 'GOAL_REACHED'
        this.profit = profit;  // Porcentaje de beneficios
        this.game = game;  // Objeto Game
        this.resultDate = resultDate;  // Fecha del resultado
    }

    static results = [];

    // Cargar todos los resultados desde la API
    static loadResults(callback) {
        $.ajax({
            url: '/results',
            type: 'GET',
            success: (data) => {
                Result.results.length = 0; // Limpiar lista antes de llenarla

                data.forEach(r => Result.results.push(new Result(
                    r.resultId, r.ending, r.profit, r.game, r.resultDate
                )));

                console.log('Resultados actualizados:', Result.results);
                if (callback) callback(Result.results);
            },
            error: (error) => {
                console.error('Error al obtener resultados:', error);
            }
        });
    }

    // Obtener un resultado por ID
    static getResultById(id, callback) {
        $.ajax({
            url: `/results/${id}`,
            type: 'GET',
            success: (data) => {
                if (callback) callback(new Result(
                    data.resultId, data.ending, data.profit, data.game, data.resultDate
                ));
            },
            error: (error) => {
                console.error(`Error al obtener el resultado con ID ${id}:`, error);
            }
        });
    }

    // Obtener un resultado por el ID del juego
    static getResultByGameId(gameId, callback) {
        $.ajax({
            url: `/results/game/${gameId}`,
            type: 'GET',
            success: (data) => {
                if (callback) callback(new Result(
                    data.resultId, data.ending, data.profit, data.game, data.resultDate
                ));
            },
            error: (error) => {
                console.error(`Error al obtener el resultado para el juego con ID ${gameId}:`, error);
            }
        });
    }

    // Crear un nuevo resultado
    static createResult(resultData, callback) {
        $.ajax({
            url: '/results',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(resultData),
            success: (data) => {
                console.log('Resultado creado:', data);
                if (callback) callback(data);
                Result.loadResults(); // Recargar la lista de resultados
            },
            error: (error) => {
                console.error('Error al crear el resultado:', error);
            }
        });
    }

    // Eliminar un resultado
    static deleteResult(id, callback) {
        $.ajax({
            url: `/results/${id}`,
            type: 'DELETE',
            success: () => {
                console.log(`Resultado con ID ${id} eliminado.`);
                if (callback) callback();
                Result.loadResults(); // Recargar la lista de resultados
            },
            error: (error) => {
                console.error(`Error al eliminar el resultado con ID ${id}:`, error);
            }
        });
    }
}
