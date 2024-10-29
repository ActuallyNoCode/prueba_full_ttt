<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

Then, copy the contents of the `.env.example` file and paste the in a new `.env` file

## DOCKER SETUP

** Este proyecto NECESITA el uso de Docker y Docker-compose **

```bash
$ docker-compse up -d
#Monta el contenedor --

$ npm run migration:run
#Corre las migraciones
```

## Running the app

```bash

# development watch mode
$ npm run start:dev

```

## License

Nest is [MIT licensed](LICENSE).

## Decisiones Técnicas

- `Autenticación y Autorización Sólida`: Al implementar un sistema de autenticación basado en JWT y asegurarte de que los usuarios solo pueden ver y modificar sus propias tareas, garantizas la seguridad y privacidad de los datos. Esto también evita accesos no autorizados y mejora la confianza de los usuarios.

- `Control de Acceso Basado en Roles y Permisos`: Configurar el sistema para validar que cada usuario solo tenga acceso a sus propias tareas refuerza la seguridad y la integridad de los datos. Este control granular en el acceso a las entidades mejora la organización y permite una futura escalabilidad si necesitas manejar roles de usuario adicionales.

- `Uso de Consultas Optimizadas`: La implementación de consultas avanzadas en findAll, que incluyen filtros opcionales para búsqueda y estado de las tareas, mejora la flexibilidad de la aplicación. Esto permite a los usuarios buscar tareas específicas de manera eficiente y personalizar su experiencia de acuerdo a sus necesidades.

- `Modularidad y Reutilización de Componentes`: Al estructurar el código en servicios y controladores, y separar las entidades y DTOs (Data Transfer Objects), logras una arquitectura modular y fácil de mantener. Esto facilita la futura extensión de funcionalidades y la reducción de código duplicado, optimizando el tiempo de desarrollo y mantenimiento.

- `Validación de Datos y Manejo de Excepciones`: La verificación de la existencia del usuario y de cada tarea antes de realizar operaciones como creación, actualización o eliminación minimiza errores y previene excepciones no controladas. Esto resulta en una aplicación más robusta y reduce el riesgo de fallos en producción.

- `Implementación Guardias de Seguridad`: La decisión de aplicar UseGuards y configuraciones de seguridad en los controladores asegura que solo los usuarios autenticados puedan acceder a ciertas rutas, lo cual es crucial para proteger los recursos sensibles.
