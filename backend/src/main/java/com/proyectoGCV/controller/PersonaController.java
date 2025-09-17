package com.proyectoGCV.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoGCV.model.Persona;
import com.proyectoGCV.repository.PersonaRepository;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    private final PersonaRepository personaRepository;

    public PersonaController(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    // Listar todas las personas
    @GetMapping
    public List<Persona> listarPersonas() {
        return personaRepository.findAll();
    }

    // Crear una nueva persona
    @PostMapping
    public Persona crearPersona(@RequestBody Persona persona) {
        return personaRepository.save(persona);
    }

    // Actualizar persona
    @PutMapping("/{id}")
    public Persona actualizarPersona(@PathVariable Long id, @RequestBody Persona persona) {
        Persona p = personaRepository.findById(id).orElseThrow();
        p.setNombre(persona.getNombre());
        p.setApellido(persona.getApellido());
        p.setDocumento(persona.getDocumento());
        return personaRepository.save(p);
    }

    // Eliminar persona
    @DeleteMapping("/{id}")
    public void eliminarPersona(@PathVariable Long id) {
        personaRepository.deleteById(id);
    }

    // Buscar persona por documento (opcional)
    @GetMapping("/buscar")
    public Persona buscarPorDocumento(@RequestParam String documento) {
        return personaRepository.findByDocumento(documento)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
    }
}
