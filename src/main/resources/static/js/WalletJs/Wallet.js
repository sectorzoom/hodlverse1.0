class Wallet {
    constructor(walletId, walletName, creationDate, user, balances) {
        this.walletId = walletId;
        this.walletName = walletName;
        this.creationDate = creationDate;
        this.user = user;  // Debe ser un objeto de tipo User
        this.balances = balances;  // Debe ser un arreglo de objetos Balance
    }

    static wallets = [];

    // Cargar todas las billeteras desde la API
    static loadWallets(callback) {
        $.ajax({
            url: '/wallets',
            type: 'GET',
            success: (data) => {
                Wallet.wallets.length = 0; // Limpiar la lista antes de llenarla

                data.forEach(w => Wallet.wallets.push(new Wallet(
                    w.walletId, w.walletName, w.creationDate,
                    w.user, w.balances
                )));

                console.log('Billeteras actualizadas:', Wallet.wallets);
                if (callback) callback(Wallet.wallets);
            },
            error: (error) => {
                console.error('Error al obtener billeteras:', error);
            }
        });
    }

    // Obtener una billetera por ID
    static getWalletById(id, callback) {
        $.ajax({
            url: `/wallets/${id}`,
            type: 'GET',
            success: (data) => {
                if (callback) callback(new Wallet(
                    data.walletId, data.walletName, data.creationDate,
                    data.user, data.balances
                ));
            },
            error: (error) => {
                console.error(`Error al obtener la billetera con ID ${id}:`, error);
            }
        });
    }

    static async getWalletsCurrenciesById(id) {
        try {
            const response = await $.ajax({
                url: `/wallets/${id}/currencies`,
                type: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    }

    // Crear una nueva billetera
    static createWallet(walletData, callback) {
        $.ajax({
            url: '/wallets',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(walletData),
            success: (data) => {
                console.log('Billetera creada:', data);
                if (callback) callback(data);
                Wallet.loadWallets(); // Recargar la lista de billeteras
            },
            error: (error) => {
                console.error('Error al crear la billetera:', error);
            }
        });
    }

    // Actualizar una billetera existente
    static updateWallet(id, updatedData, callback) {
        $.ajax({
            url: `/wallets/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: (data) => {
                console.log('Billetera actualizada:', data);
                if (callback) callback(data);
                Wallet.loadWallets(); // Recargar la lista de billeteras
            },
            error: (error) => {
                console.error(`Error al actualizar la billetera con ID ${id}:`, error);
            }
        });
    }

    // Eliminar una billetera
    static deleteWallet(id, callback) {
        $.ajax({
            url: `/wallets/${id}`,
            type: 'DELETE',
            success: () => {
                console.log(`Billetera con ID ${id} eliminada.`);
                if (callback) callback();
                Wallet.loadWallets(); // Recargar la lista de billeteras
            },
            error: (error) => {
                console.error(`Error al eliminar la billetera con ID ${id}:`, error);
            }
        });
    }

    // Obtener el saldo total de una billetera de un usuario
    static getWalletTotalBalance(userId, callback) {
        $.ajax({
            url: `/wallets/totalBalance/${userId}`,
            type: 'GET',
            success: (data) => {
                console.log(`Saldo total para el usuario con ID ${userId}:`, data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener el saldo total:', error);
            }
        });
    }
}
 window.Wallet = Wallet;