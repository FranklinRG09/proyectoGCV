package com.proyectoGCV.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Ticket;
import com.proyectoGCV.model.TicketEstado;
import com.proyectoGCV.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository repo) {
        this.ticketRepository = repo;
    }

    public List<Ticket> obtenerTodos() {
        return ticketRepository.findAll();
    }

    public List<Ticket> listarPorEstado(TicketEstado estado) {
        return ticketRepository.findByEstado(estado);
    }

    public Ticket buscarPorDocumento(String documento) {
        return ticketRepository.findByDocumento(documento).orElse(null);
    }

    public Ticket actualizarPorDocumento(String documento, Ticket datos) {
        Ticket t = ticketRepository.findByDocumento(documento).orElse(null);
        if (t != null) {
            t.setNombres(datos.getNombres());
            t.setApellidos(datos.getApellidos());
            t.setDocumento(datos.getDocumento());
            t.setMotivo(datos.getMotivo());
            t.setEstado(datos.getEstado());
            t.setHoraAtencion(datos.getHoraAtencion());
            t.setHoraFin(datos.getHoraFin());
            return ticketRepository.save(t);
        }
        return null;
    }

    public Ticket crear(Ticket turno) {
        if (turno.getEstado() == null) {
            turno.setEstado(TicketEstado.EN_ESPERA);
        }
        return ticketRepository.save(turno);
    }

    // Método para actualizar solo el estado y horas relacionadas
    public Ticket actualizarEstado(String documento, String nuevoEstado) {
        Optional<Ticket> optTurno = ticketRepository.findByDocumento(documento);
        if (optTurno.isEmpty()) {
            throw new RuntimeException("Ticket no encontrado");
        }

        Ticket turno = optTurno.get();

        TicketEstado estadoEnum = TicketEstado.valueOf(nuevoEstado);
        turno.setEstado(estadoEnum);

        if (estadoEnum == TicketEstado.EN_PROCESO && turno.getHoraAtencion() == null) {
            turno.setHoraAtencion(LocalDateTime.now());
        }

        if (estadoEnum == TicketEstado.FINALIZADO && turno.getHoraFin() == null) {
            turno.setHoraFin(LocalDateTime.now());
        }

        return ticketRepository.save(turno);
    }
}
