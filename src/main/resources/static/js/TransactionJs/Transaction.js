class Transaction {
    constructor(id, transactionType, originTransactionAmount, destinationTransactionAmount, originUnitPrice, destinationUnitPrice, transactionDate, user, originCurrency, destinationCurrency) {
        this.id = id;
        this.transactionType = transactionType;
        this.originTransactionAmount = originTransactionAmount;
        this.destinationTransactionAmount = destinationTransactionAmount;
        this.originUnitPrice = originUnitPrice;
        this.destinationUnitPrice = destinationUnitPrice;
        this.transactionDate = transactionDate;
        this.user = user;
        this.originCurrency = originCurrency;
        this.destinationCurrency = destinationCurrency;
    }

    static transactions = [];

    // Cargar todas las transacciones desde la API
    static loadTransactions(callback) {
        $.ajax({
            url: '/transactions',
            type: 'GET',
            success: (data) => {
                Transaction.transactions.length = 0; // Limpiar lista antes de llenarla

                data.forEach(t => Transaction.transactions.push(new Transaction(
                    t.id, t.transactionType, t.originTransactionAmount, t.destinationTransactionAmount,
                    t.originUnitPrice, t.destinationUnitPrice, t.transactionDate,
                    t.user, t.originCurrency, t.destinationCurrency
                )));

                console.log('Transacciones actualizadas:', Transaction.transactions);
                if (callback) callback(Transaction.transactions);
            },
            error: (error) => {
                console.error('Error al obtener transacciones:', error);
            }
        });
    }

    // Obtener una transacción por ID
    static getTransactionById(id, callback) {
        $.ajax({
            url: `/transactions/${id}`,
            type: 'GET',
            success: (data) => {
                if (callback) callback(new Transaction(
                    data.id, data.transactionType, data.originTransactionAmount, data.destinationTransactionAmount,
                    data.originUnitPrice, data.destinationUnitPrice, data.transactionDate,
                    data.user, data.originCurrency, data.destinationCurrency
                ));
            },
            error: (error) => {
                console.error(`Error al obtener la transacción con ID ${id}:`, error);
            }
        });
    }

    // Crear una nueva transacción
    static createTransaction(transactionData, callback) {
        $.ajax({
            url: '/transactions',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(transactionData),
            success: (data) => {
                console.log('Transacción creada:', data);
                if (callback) callback(data);
                Transaction.loadTransactions(); // Recargar la lista
            },
            error: (error) => {
                console.error('Error al crear la transacción:', error);
            }
        });
    }

    // Actualizar una transacción existente
    static updateTransaction(id, updatedData, callback) {
        $.ajax({
            url: `/transactions/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: (data) => {
                console.log('Transacción actualizada:', data);
                if (callback) callback(data);
                Transaction.loadTransactions(); // Recargar la lista
            },
            error: (error) => {
                console.error(`Error al actualizar la transacción con ID ${id}:`, error);
            }
        });
    }

    // Eliminar una transacción
    static deleteTransaction(id, callback) {
        $.ajax({
            url: `/transactions/${id}`,
            type: 'DELETE',
            success: () => {
                console.log(`Transacción con ID ${id} eliminada.`);
                if (callback) callback();
                Transaction.loadTransactions(); // Recargar la lista
            },
            error: (error) => {
                console.error(`Error al eliminar la transacción con ID ${id}:`, error);
            }
        });
    }
    // Obtener las transacciones de un usuario por su ID
    static async getTransactionsByUserId(userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/transactions/all/${userId}`,
                type: 'GET',
                success: (data) => {
                    const userTransactions = data.map(t => new Transaction(
                        t.id, t.transactionType, t.originTransactionAmount, t.destinationTransactionAmount,
                        t.originUnitPrice, t.destinationUnitPrice, t.transactionDate,
                        t.user, t.originCurrency, t.destinationCurrency
                    ));
                    console.log(`✅ Transacciones obtenidas para el usuario ${userId}:`, userTransactions);
                    resolve(userTransactions); // Devolvemos las transacciones correctamente
                },
                error: (error) => {
                    console.error(`❌ Error al obtener las transacciones para el usuario ${userId}:`, error);
                    reject(error);
                }
            });
        });
    }

    // Obtener las últimas 5 transacciones de un usuario por su ID
    static getLatestTransactionsByUserId(userId, callback) {
        $.ajax({
            url: `/transactions/latest/${userId}`,
            type: 'GET',
            success: (data) => {
                const latestTransactions = data.map(t => new Transaction(
                    t.id, t.transactionType, t.originTransactionAmount, t.destinationTransactionAmount,
                    t.originUnitPrice, t.destinationUnitPrice, t.transactionDate,
                    t.user, t.originCurrency, t.destinationCurrency
                ));
                console.log(`Últimas 5 transacciones para el usuario ${userId}:`, latestTransactions);
                if (callback) callback(latestTransactions);
            },
            error: (error) => {
                console.error(`Error al obtener las últimas transacciones para el usuario ${userId}:`, error);
            }
        });
    }
}
window.Transaction = Transaction;
