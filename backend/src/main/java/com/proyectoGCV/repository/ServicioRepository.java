package com.proyectoGCV.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoGCV.model.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    // Opcional: buscar por nombre de servicio
    Optional<Servicio> findByNombre(String nombre);
}
