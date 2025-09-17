package com.proyectoGCV.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoGCV.model.Cliente;
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Métodos adicionales si se necesita buscar por persona u otros criterios
}
