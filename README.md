# Dockerización y Despliegue

Este proyecto incluye una aplicación Angular (con TailwindCSS) y un backend Spring Boot. Puedes levantar el entorno completo usando Docker y Docker Compose, tanto para desarrollo local como para producción (con base de datos Neon).

## 1. Requisitos previos

- Docker y Docker Compose instalados
- Node.js y npm (solo si deseas desarrollo local sin Docker)

## 2. Variables de entorno

Hay dos archivos de variables de entorno:

- `.env` para entorno local (base de datos local)
- `.env.prod` para producción (base de datos Neon)

Copia y edita según corresponda:

```bash
cp .env .env.local
cp .env.prod .env.prod.local
```

## 3. Levantar entorno local

1. Asegúrate de tener el archivo `.env` configurado.
2. Ejecuta:
	```bash
	docker-compose up -d --build
	```
3. Accede a:
	- Frontend: http://localhost:4200
	- Backend: http://localhost:8080
	- Base de datos: localhost:5432 (usuario y contraseña según .env)

## 4. Levantar entorno de producción (con Neon)

1. Configura `.env.prod` con los datos de Neon.
2. Ejecuta:
	```bash
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
	```
3. Accede a:
	- Frontend: http://localhost (puerto 80)
	- Backend: http://localhost:8080

## 5. TailwindCSS en Angular

El frontend ya está preparado para usar TailwindCSS. Si necesitas modificar la configuración, revisa los archivos `tailwind.config.js` y `postcss.config.js` en la carpeta `frontend/`.

## 6. Inicialización de la base de datos

Spring Boot puede crear las tablas automáticamente si está configurado en `application.properties` (por ejemplo, usando `spring.jpa.hibernate.ddl-auto=update`). Si necesitas datos iniciales, agrega scripts SQL o usa los mecanismos de inicialización de Spring Boot.

## 7. Notas adicionales

- Para limpiar los contenedores y volúmenes:
  ```bash
  docker-compose down -v
  ```
- Para ver logs:
  ```bash
  docker-compose logs -f
  ```

---
Para dudas o problemas, consulta este README o contacta al equipo.
