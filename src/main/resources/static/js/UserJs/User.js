class User {
    constructor(userId, username, email, password, registrationDate, picture, wallet, transactions, game) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.registrationDate = registrationDate;
        this.picture = picture;
        this.wallet = wallet;
        this.transactions = transactions;
        this.game = game;
    }

    // Lista donde se almacenan todos los usuarios
    static users = [];

    // 🔄 Cargar todos los usuarios desde la API (limpia la lista antes)
    static loadUsers(callback) {
        $.ajax({
            url: '/users',
            type: 'GET',
            success: (data) => {
                User.users = []; // Vacía la lista antes de llenarla
                data.forEach(u => User.users.push(new User(u.userId, u.username, u.email, u.password, u.registrationDate, u.picture, u.wallet, u.transactions, u.game)));

                console.log('Lista de usuarios recargada:', User.users);
                if (callback) callback(User.users);
            },
            error: (error) => {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }

    // 🔍 Obtener un usuario por su ID desde la API
    static getUserById(userId, callback) {
        $.ajax({
            url: `/users/${userId}`,
            type: 'GET',
            success: (data) => {
                let user = new User(data.userId, data.username, data.email, data.password, data.registrationDate, data.picture, data.wallet, data.transactions, data.game);
                console.log(`Usuario obtenido de la API:`, user);
                if (callback) callback(user);
            },
            error: (error) => {
                console.error(`Error al obtener el usuario con ID ${userId}:`, error);
            }
        });
    }

    // 🔍 Obtener el id del usuario autenticado desde la API
    static async getUserId() {
        try {
            const response = await $.ajax({
                url: '/users',
                type: 'GET'
            });
            return response.id; // Retorna el ID del usuario autenticado
        } catch (error) {
            console.error('Error al obtener el ID del usuario:', error);
            return null; // Retorna null en caso de error
        }
    }

    // ➕ Crear un nuevo usuario en la API
    static createUser(username, email, password, registrationDate, picture, callback) {
        let newUser = { username, email, password, registrationDate, picture };

        $.ajax({
            url: '/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUser),
            success: (data) => {
                let user = new User(data.userId, data.username, data.email, data.password, data.registrationDate, data.picture, data.wallet, data.transactions, data.game);
                User.users.push(user);
                console.log('Usuario creado y almacenado:', user);
                if (callback) callback(user);
            },
            error: (error) => {
                console.error('Error al crear el usuario:', error);
            }
        });
    }

    // 🔄 Actualizar un usuario en la API
    static updateUser(userId, username, email, password, registrationDate, picture, callback) {
        let updatedUser = { username, email, password, registrationDate, picture };

        $.ajax({
            url: `/users/${userId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUser),
            success: (data) => {
                let index = User.users.findIndex(u => u.userId === userId);
                if (index !== -1) {
                    User.users[index] = new User(data.userId, data.username, data.email, data.password, data.registrationDate, data.picture, data.wallet, data.transactions, data.game);
                    console.log('Usuario actualizado:', User.users[index]);
                }
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al actualizar el usuario:', error);
            }
        });
    }

    // ❌ Eliminar un usuario de la API
    static deleteUser(userId, callback) {
        $.ajax({
            url: `/users/${userId}`,
            type: 'DELETE',
            success: () => {
                User.users = User.users.filter(u => u.userId !== userId);
                console.log(`Usuario con ID ${userId} eliminado.`);
                if (callback) callback();
            },
            error: (error) => {
                console.error('Error al eliminar el usuario:', error);
            }
        });
    }
}
window.User = User;

// =============================
// 🔥 Cargar automáticamente todos los usuarios al iniciar
// =============================
$(document).ready(function () {
    User.loadUsers((users) => {
        console.log('Usuarios cargados en la aplicación:', users);
    });
});
