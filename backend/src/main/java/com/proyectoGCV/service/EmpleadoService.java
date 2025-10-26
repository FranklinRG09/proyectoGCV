package com.proyectoGCV.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Empleado;
import com.proyectoGCV.repository.EmpleadoRepository;


@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> listarEmpleados() {
        return empleadoRepository.findAll();
    }

    public Empleado crearEmpleado(Empleado empleado) {
        if (empleadoRepository.findByEmail(empleado.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email ya registrado");
        }
        if (!empleado.getRol().equals("ADMIN") && !empleado.getRol().equals("RECEPCIONISTA")) {
            throw new IllegalArgumentException("Rol inválido");
        }
        return empleadoRepository.save(empleado);
    }

    public Empleado actualizarEmpleado(Long id, Empleado empleado) {
        Empleado e = empleadoRepository.findById(id).orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        e.setRol(empleado.getRol());
        e.setNombre(empleado.getNombre());
        e.setApellido(empleado.getApellido());
        e.setDocumento(empleado.getDocumento());
        e.setEmail(empleado.getEmail());
        e.setContrasena(empleado.getContrasena());

        return empleadoRepository.save(e);
    }

    public void eliminarEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }
}

