package com.proyectoGCV.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Persona;
import com.proyectoGCV.repository.PersonaRepository;


@Service
public class PersonaService {

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    public List<Persona> listarPersonas() {
        return personaRepository.findAll();
    }

    public Persona crearPersona(Persona persona) {
        // Validación básica: documento único
        if (personaRepository.findByDocumento(persona.getDocumento()).isPresent()) {
            throw new IllegalArgumentException("Documento ya registrado");
        }
        return personaRepository.save(persona);
    }

    public Persona actualizarPersona(Long id, Persona persona) {
        Persona p = personaRepository.findById(id).orElseThrow(() -> new RuntimeException("Persona no encontrada"));
        p.setNombre(persona.getNombre());
        p.setApellido(persona.getApellido());
        p.setDocumento(persona.getDocumento());
        return personaRepository.save(p);
    }

    public void eliminarPersona(Long id) {
        personaRepository.deleteById(id);
    }

    public Persona buscarPorDocumento(String documento) {
        return personaRepository.findByDocumento(documento)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
    }
}
