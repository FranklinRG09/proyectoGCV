package com.proyectoGCV.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoGCV.model.Ticket;
import com.proyectoGCV.model.TicketEstado;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    public List<Ticket> findByEstado(TicketEstado estado);
    Optional<Ticket> findByDocumento(String documento);
}
