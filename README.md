
# GestorQ

![](https://camo.githubusercontent.com/2def16885cea9901bb93321a93173c57b343b0745894fd7cd3a5fcd6f695b067/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f323630302f312a655f474e7474614a3134665248736c665159783665412e706e67)

Este proyecto es una aplicación para gestionar colas de espera en locales de negocios, busca darle solución a la dificultad de gestionar la atención de muchos clientes mediante un gestor de colas virtual hecha en Springboot con Java 17 y Angular 19 en la cual el cliente puede solicitar un turno el cual entrara a la cola de espera y esperara a ser llamado y en el momento en el que sea llamado por algun empleado, su nombre y numero de turno aparecera en la tabla de llamados que ven los clientes en el local.

## 1. Requisitos previos

- Docker y Docker Compose instalados


## 2. Variables de entorno

Hay dos archivos de variables de entorno:

- `.env(raiz del proyecto)` 
- `.env(carpeta de backend)`  


## 3. Levantar entorno local

1. Asegúrate de tener los dos archivos `.env` en sus respectivas rutas 
2. Abre una nueva terminal y ejecuta:
	```bash
	docker-compose up build --no cache
	```
2. Para levantar el contenedor:
	```bash
	docker-compose up 
	```
3. Accede a:
	- Frontend: http://localhost:4200 (para poder ver el front)
	- Frontend: http://localhost:4200/solicitarturno (Para generar un nuevo turno)
	- Frontend: http://localhost:4200/turnos (Para poder ver los turnos llamados y los proximos a ser llamados)
	- Frontend: http://localhost:4200/admin-turnos (Para poder administrar los turnos creados)


## 4 Notas adicionales

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