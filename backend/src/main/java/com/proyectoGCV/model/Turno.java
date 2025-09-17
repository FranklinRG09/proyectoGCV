package com.proyectoGCV.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "turnos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_turno;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente; // ⬅ Este nombre es el que importa para el builder

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "agente_id")
    private Empleado agente;

    private LocalDateTime horaLlegada;
    private LocalDateTime horaAtencion;
    private LocalDateTime horaFin;

    private String estadoTurno;
    private String motivo;
    private Integer numeroTurno;
}

