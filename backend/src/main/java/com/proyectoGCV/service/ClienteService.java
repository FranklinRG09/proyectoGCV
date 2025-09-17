package com.proyectoGCV.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.proyectoGCV.model.Cliente;
import com.proyectoGCV.repository.ClienteRepository;


@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente crearCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente actualizarCliente(Long id, Cliente cliente) {
        Cliente c = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        c.setPersona(cliente.getPersona());
        return clienteRepository.save(c);
    }

    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
