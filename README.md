
# GestorQ

![](https://camo.githubusercontent.com/2def16885cea9901bb93321a93173c57b343b0745894fd7cd3a5fcd6f695b067/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f323630302f312a655f474e7474614a3134665248736c665159783665412e706e67)

**GestorQ** es una aplicación para gestionar colas de espera en locales de negocios, busca darle solución a la dificultad de gestionar la atención de muchos clientes mediante un gestor de colas virtual hecha en **Springboot** con **Java 17** y **Angular 19** en la cual el cliente puede solicitar un turno el cual entrara a la cola de espera y esperara a ser llamado y en el momento en el que sea llamado por algun empleado, su nombre y numero de turno aparecera en la tabla de llamados que ven los clientes en el local.

## 1. Requisitos previos

- Docker y Docker Compose instalados


## 2. Variables de entorno

Hay dos archivos de variables de entorno en dos versiones, una para producción y otra para probar en local. **Para poder encontrar los archivos de variables de entorno** deben ir a la **Page de plane** con el titulo **"002C | Variables de Entorno - GestorQ"** ahi adentro encontraran el enlace para descargar las ENV necesarias; adicionalmente estan unas pequeñas instrucciones ilustrativas de donde deben de ir esas ENV aparte de las intrucciones que estan aqui

**-proyectoGCV/.env.dev | proyectoGCV/env.dev**
- `.env(raiz del proyecto)` 

**-proyectoGCV/.env.prod | proyectoGCV/env.prod**
- `.env(carpeta de backend)` 

![](https://github.com/RubenIglesias1F20/Gestion-de-Turnos/blob/master/image%20(1).png)

## 3. Levantar entorno para Producción

1. Asegúrate de tener los dos archivos `.env` en sus respectivas rutas.

2. Abre una nueva terminal y ejecuta:
	```bash
	docker compose -f Docker-compose.prod.yaml build --no-cache
	```
3. Para levantar el contenedor:

	```bash
	docker compose -f Docker-compose.prod.yaml up
	```

## 4. Levantar entorno para Local

1. Asegúrate de tener los dos archivos `.env` en sus respectivas rutas.

2. Abre una nueva terminal y ejecuta:
	```bash
	docker compose -f Docker-compose.dev.yaml build --no-cache
	```
	
3. Para levantar el contenedor:
	```bash
	docker compose -f Docker-compose.dev.yaml up
	```

## 5. Acceder a la aplicación:
1 Frontend: http://localhost:4200 (para poder ver el front).

2 Frontend: http://localhost:4200/solicitarturno (Para generar un nuevo turno).

3 Frontend: http://localhost:4200/turnos (Para poder ver los turnos llamados y los proximos a ser llamados).

4 Frontend: http://localhost:4200/admin-turnos (Para poder administrar los turnos creados).


## 6. Notas Adicionales

- Para limpiar los contenedores y volúmenes:

	-Para Local
  ```bash
  docker compose -f Docker-compose.dev.yaml down
  ```
  -Para Producción
    ```bash
  docker compose -f Docker-compose.prod.yaml down
  ```

---
Para dudas o problemas, consulta este README o contacta al equipo.
