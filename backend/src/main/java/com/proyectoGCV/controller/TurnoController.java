package com.proyectoGCV.controller;

import com.proyectoGCV.model.Turno;
import com.proyectoGCV.model.Cliente;
import com.proyectoGCV.repository.TurnoRepository;
import com.proyectoGCV.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoRepository turnoRepository;
    private final ClienteRepository clienteRepository;

    public TurnoController(TurnoRepository turnoRepository, ClienteRepository clienteRepository) {
        this.turnoRepository = turnoRepository;
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public List<Turno> listarTurnos() {
        return turnoRepository.findAll();
    }

    @PostMapping("/solicitar")
    public Turno solicitarTurno(@RequestParam Long clienteId, @RequestParam Long servicioId,
                                @RequestParam String motivo) {
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow();
        Turno turno = Turno.builder()
                .cliente(cliente)
                .motivo(motivo)
                .estadoTurno("Pendiente")
                .horaLlegada(LocalDateTime.now())
                .numeroTurno(turnoRepository.findAll().size() + 1) // secuencial simple
                .build();
        return turnoRepository.save(turno);
    }

    @PutMapping("/{id}/cancelar")
    public Turno cancelarTurno(@PathVariable Long id) {
        Turno turno = turnoRepository.findById(id).orElseThrow();
        turno.setEstadoTurno("Cancelado");
        turno.setHoraFin(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    @PutMapping("/{id}/atender")
    public Turno atenderTurno(@PathVariable Long id) {
        Turno turno = turnoRepository.findById(id).orElseThrow();
        turno.setEstadoTurno("En curso");
        turno.setHoraAtencion(LocalDateTime.now());
        return turnoRepository.save(turno);
    }

    @PutMapping("/{id}/finalizar")
    public Turno finalizarTurno(@PathVariable Long id) {
        Turno turno = turnoRepository.findById(id).orElseThrow();
        turno.setEstadoTurno("Atendido");
        turno.setHoraFin(LocalDateTime.now());
        return turnoRepository.save(turno);
    }
}
