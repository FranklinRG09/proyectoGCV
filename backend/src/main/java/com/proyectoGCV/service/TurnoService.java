package com.proyectoGCV.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Cliente;
import com.proyectoGCV.model.Turno;
import com.proyectoGCV.repository.ClienteRepository;
import com.proyectoGCV.repository.TurnoRepository;

@Service
public class TurnoService {

    private final TurnoRepository turnoRepository;
    private final ClienteRepository clienteRepository;

    public TurnoService(TurnoRepository turnoRepository, ClienteRepository clienteRepository) {
        this.turnoRepository = turnoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<Turno> listarTurnos() {
        return turnoRepository.findAll();
    }

    public Turno solicitarTurno(Long clienteId, String motivo) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Turno turno = Turno.builder()
                .cliente(cliente)
                .motivo(motivo)
                .estadoTurno("Pendiente")
                .horaLlegada(LocalDateTime.now())
                .numeroTurno(turnoRepository.findAll().size() + 1) // Secuencial simple
                .build();
        return turnoRepository.save(turno);
    }

    public Turno cancelarTurno(Long turnoId) {
        Turno turno = turnoRepository.findById(turnoId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstadoTurno("Cancelado");
        turno.setHoraFin(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    public Turno atenderTurno(Long turnoId) {
        Turno turno = turnoRepository.findById(turnoId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstadoTurno("En curso");
        turno.setHoraAtencion(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    public Turno finalizarTurno(Long turnoId) {
        Turno turno = turnoRepository.findById(turnoId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstadoTurno("Atendido");
        turno.setHoraFin(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    public List<Turno> listarTurnosPorCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return turnoRepository.findByCliente(cliente);
    }
}
