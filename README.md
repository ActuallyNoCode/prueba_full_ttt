# prueba_full_ttt

## Getting Started

Este repositorio está divido en dos secciones independientes que deben ejecutarse por separado

### Frontend

Intrucciones detalladas de cómo ejecutar el proyecto en el README.md

#### Decisiones Técnicas

- `Uso de Componentes de Servidor`: Optar por componentes de servidor en Next.js permite una mejor gestión del estado y una mayor eficiencia en el renderizado, asegurando que el contenido se genere en el servidor antes de enviarlo al cliente. Esto mejora el rendimiento y la experiencia del usuario.

- `Implementación de URL Query Parameters`: Manejar la visibilidad del modal mediante parámetros de consulta en la URL facilita la navegación sin necesidad de estados en el cliente, lo que simplifica la lógica del componente y reduce la complejidad.

- `Autenticación Segura`: Integrar NextAuth para la autenticación de usuarios garantiza que solo los usuarios autorizados puedan acceder a las funcionalidades del proyecto, mejorando la seguridad de la aplicación.

- `Diseño Responsivo y Modular`: Utilizar Tailwind CSS para el diseño permite crear una interfaz moderna y responsiva, lo que asegura que la aplicación funcione bien en dispositivos de diferentes tamaños.

- `Interacción con APIs`: Implementar servicios de tareas para la gestión de datos (fetchTasks) permite una separación clara de la lógica de negocio y la presentación, mejorando la organización del código.

- `Gestión de Errores y Validaciones`: Implementar validaciones en el formulario de creación de tareas garantiza que los datos ingresados sean correctos antes de enviarlos al servidor, lo que reduce la posibilidad de errores.

- `Documentación Clara`: Mantener una documentación clara y accesible sobre la arquitectura del proyecto, el uso de componentes y las decisiones técnicas tomadas facilita la incorporación de nuevos desarrolladores al equipo y la comprensión del sistema.

### Backend

Intrucciones detalladas de cómo ejecutar el proyecto en el README.md

#### Decisiones Técnicas

- `Autenticación y Autorización Sólida`: Al implementar un sistema de autenticación basado en JWT y asegurarte de que los usuarios solo pueden ver y modificar sus propias tareas, garantizas la seguridad y privacidad de los datos. Esto también evita accesos no autorizados y mejora la confianza de los usuarios.

- `Control de Acceso Basado en Roles y Permisos`: Configurar el sistema para validar que cada usuario solo tenga acceso a sus propias tareas refuerza la seguridad y la integridad de los datos. Este control granular en el acceso a las entidades mejora la organización y permite una futura escalabilidad si necesitas manejar roles de usuario adicionales.

- `Uso de Consultas Optimizadas`: La implementación de consultas avanzadas en findAll, que incluyen filtros opcionales para búsqueda y estado de las tareas, mejora la flexibilidad de la aplicación. Esto permite a los usuarios buscar tareas específicas de manera eficiente y personalizar su experiencia de acuerdo a sus necesidades.

- `Modularidad y Reutilización de Componentes`: Al estructurar el código en servicios y controladores, y separar las entidades y DTOs (Data Transfer Objects), logras una arquitectura modular y fácil de mantener. Esto facilita la futura extensión de funcionalidades y la reducción de código duplicado, optimizando el tiempo de desarrollo y mantenimiento.

- `Validación de Datos y Manejo de Excepciones`: La verificación de la existencia del usuario y de cada tarea antes de realizar operaciones como creación, actualización o eliminación minimiza errores y previene excepciones no controladas. Esto resulta en una aplicación más robusta y reduce el riesgo de fallos en producción.

- `Implementación Guardias de Seguridad`: La decisión de aplicar UseGuards y configuraciones de seguridad en los controladores asegura que solo los usuarios autenticados puedan acceder a ciertas rutas, lo cual es crucial para proteger los recursos sensibles.
