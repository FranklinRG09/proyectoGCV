package com.proyectoGCV.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoGCV.model.Ticket;
import com.proyectoGCV.model.TicketEstado;
import com.proyectoGCV.service.TicketService;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping
    public Ticket crearTurno(@RequestBody Ticket turno) {
        return service.crear(turno);
    }

    @GetMapping
    public List<Ticket> listarTurnos(@RequestParam(required = false) TicketEstado estado) {
        return service.listarPorEstado(estado);
    }

    // 🔹 Buscar turno por documento
    @GetMapping("/buscar")
    public Ticket buscarPorDocumento(@RequestParam String documento) {
        return service.buscarPorDocumento(documento);
    }

    @PutMapping("/editar")
    public Ticket editarPorDocumento(@RequestParam String documento, @RequestBody Ticket datos) {
        return service.actualizarPorDocumento(documento, datos);
    }
}
