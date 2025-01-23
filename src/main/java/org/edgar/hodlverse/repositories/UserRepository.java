package org.edgar.hodlverse.repositories;

import org.edgar.hodlverse.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Métodos personalizados (si los necesitas)
    User findByEmail(String email); // Buscar usuario por email
    boolean existsByEmail(String email); // Verificar si un email ya está registrado
}
