package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.User;
import org.edgar.hodlverse.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Registrar un nuevo usuario
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Obtener un usuario por su ID
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Actualizar un usuario
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Eliminar un usuario por su ID
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Verificar si un email ya está registrado
    public boolean isEmailRegistered(String email) {
        return userRepository.existsByEmail(email);
    }

    // Buscar usuario por email
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }
}
