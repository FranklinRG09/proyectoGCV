package com.proyectoGCV.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "empleados")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false, length = 50)
    private String cargo;

    @Column(nullable = false)
    private String rol; // ADMIN, RECEPCIONISTA, AGENTE

    @Column(nullable = false, length = 20)
    private String estado; // Disponible, Ocupado, Ausente

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private Servicio servicioAsignado; // servicio o sector asignado
}
