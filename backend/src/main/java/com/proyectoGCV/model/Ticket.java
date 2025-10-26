package com.proyectoGCV.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "turnos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;
    private String apellidos;
    private String documento;

    @Enumerated(EnumType.STRING)
    private TicketMotivo motivo;

    @Enumerated(EnumType.STRING)
    private TicketEstado estado;

    @Builder.Default
    private LocalDateTime horaLlegada = LocalDateTime.now();

    private LocalDateTime horaAtencion;
    private LocalDateTime horaFin;
}
