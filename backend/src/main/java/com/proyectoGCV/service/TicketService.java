package com.proyectoGCV.service;
import java.util.List;

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

    public List<Ticket> listarPorEstado(TicketEstado estado) {
        return ticketRepository.findByEstado(estado);
    }

    // 🔹 Buscar por documento
    public Ticket buscarPorDocumento(String documento) {
        return ticketRepository.findByDocumento(documento).orElse(null);
    }

    // 🔹 Actualizar por documento
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

    public Ticket obtener(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        ticketRepository.deleteById(id);
    }
}
