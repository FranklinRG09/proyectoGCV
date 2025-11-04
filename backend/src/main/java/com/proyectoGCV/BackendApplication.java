package com.proyectoGCV;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Intenta cargar .env solo si existe (para desarrollo local)
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

            if (dotenv.get("SPRING_DATASOURCE_URL") != null)
                System.setProperty("SPRING_DATASOURCE_URL", dotenv.get("SPRING_DATASOURCE_URL"));
            if (dotenv.get("SPRING_DATASOURCE_USERNAME") != null)
                System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
            if (dotenv.get("SPRING_DATASOURCE_PASSWORD") != null)
                System.setProperty("SPRING_DATASOURCE_PASSWORD", dotenv.get("SPRING_DATASOURCE_PASSWORD"));
        } catch (DotenvException e) {
            System.out.println("No se cargó .env (modo Docker o producción).");
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}