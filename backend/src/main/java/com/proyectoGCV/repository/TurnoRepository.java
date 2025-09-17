package com.proyectoGCV.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoGCV.model.Cliente;
import com.proyectoGCV.model.Turno;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByCliente(Cliente cliente);
}
