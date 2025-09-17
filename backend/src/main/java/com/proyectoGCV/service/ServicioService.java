package com.proyectoGCV.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Servicio;
import com.proyectoGCV.repository.ServicioRepository;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> listarServicios() {
        return servicioRepository.findAll();
    }

    public Servicio crearServicio(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio actualizarServicio(Long id, Servicio servicio) {
        Servicio s = servicioRepository.findById(id).orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        s.setNombre(servicio.getNombre());
        s.setDescripcion(servicio.getDescripcion());
        return servicioRepository.save(s);
    }

    public void eliminarServicio(Long id) {
        servicioRepository.deleteById(id);
    }
}
