class Balance {
    constructor(balanceId, walletAmount, wallet, currency) {
        this.balanceId = balanceId;
        this.walletAmount = walletAmount;  // BigDecimal en Java, se tratará como un número en JS
        this.wallet = wallet;  // Objeto Wallet
        this.currency = currency;  // Objeto Currency
    }

    static balances = [];

    // Cargar todos los balances desde la API
    static loadBalances(callback) {
        $.ajax({
            url: '/balances',
            type: 'GET',
            success: (data) => {
                Balance.balances.length = 0; // Limpiar la lista antes de llenarla

                data.forEach(b => Balance.balances.push(new Balance(
                    b.balanceId, b.walletAmount, b.wallet, b.currency
                )));

                console.log('Balances actualizados:', Balance.balances);
                if (callback) callback(Balance.balances);
            },
            error: (error) => {
                console.error('Error al obtener balances:', error);
            }
        });
    }

    // Obtener un balance por ID
    static getBalanceById(id, callback) {
        $.ajax({
            url: `/balances/${id}`,
            type: 'GET',
            success: (data) => {
                if (callback) callback(new Balance(
                    data.balanceId, data.walletAmount, data.wallet, data.currency
                ));
            },
            error: (error) => {
                console.error(`Error al obtener el balance con ID ${id}:`, error);
            }
        });
    }

    // Crear un nuevo balance
    static createBalance(balanceData, callback) {
        $.ajax({
            url: '/balances',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(balanceData),
            success: (data) => {
                console.log('Balance creado:', data);
                if (callback) callback(data);
                Balance.loadBalances(); // Recargar la lista de balances
            },
            error: (error) => {
                console.error('Error al crear el balance:', error);
            }
        });
    }

    // Actualizar un balance existente
    static updateBalance(id, updatedData, callback) {
        $.ajax({
            url: `/balances/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: (data) => {
                console.log('Balance actualizado:', data);
                if (callback) callback(data);
                Balance.loadBalances(); // Recargar la lista de balances
            },
            error: (error) => {
                console.error(`Error al actualizar el balance con ID ${id}:`, error);
            }
        });
    }

    // Eliminar un balance
    static deleteBalance(id, callback) {
        $.ajax({
            url: `/balances/${id}`,
            type: 'DELETE',
            success: () => {
                console.log(`Balance con ID ${id} eliminado.`);
                if (callback) callback();
                Balance.loadBalances(); // Recargar la lista de balances
            },
            error: (error) => {
                console.error(`Error al eliminar el balance con ID ${id}:`, error);
            }
        });
    }

    // Obtener los balances por walletId
    static getBalancesByWallet(walletId, callback) {
        $.ajax({
            url: `/balances/wallet/${walletId}`,
            type: 'GET',
            success: (data) => {
                const balances = data.map(b => new Balance(
                    b.balanceId, b.walletAmount, b.wallet, b.currency
                ));
                console.log(`Balances para la billetera con ID ${walletId}:`, balances);
                if (callback) callback(balances);
            },
            error: (error) => {
                console.error(`Error al obtener balances para la billetera con ID ${walletId}:`, error);
            }
        });
    }

    // Obtener los balances por currencyId
    static getBalancesByCurrency(currencyId, callback) {
        $.ajax({
            url: `/balances/currency/${currencyId}`,
            type: 'GET',
            success: (data) => {
                const balances = data.map(b => new Balance(
                    b.balanceId, b.walletAmount, b.wallet, b.currency
                ));
                console.log(`Balances para la divisa con ID ${currencyId}:`, balances);
                if (callback) callback(balances);
            },
            error: (error) => {
                console.error(`Error al obtener balances para la divisa con ID ${currencyId}:`, error);
            }
        });
    }
}
