This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Firts, install the necessary dependecies:

```bash
npm i

```

Then, copy the contents of the `.env.example` file and paste the in a new `.env` file

Finally, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Decisiones Técnicas

- `Uso de Componentes de Servidor`: Optar por componentes de servidor en Next.js permite una mejor gestión del estado y una mayor eficiencia en el renderizado, asegurando que el contenido se genere en el servidor antes de enviarlo al cliente. Esto mejora el rendimiento y la experiencia del usuario.

- `Implementación de URL Query Parameters`: Manejar la visibilidad del modal mediante parámetros de consulta en la URL facilita la navegación sin necesidad de estados en el cliente, lo que simplifica la lógica del componente y reduce la complejidad.

- `Autenticación Segura`: Integrar NextAuth para la autenticación de usuarios garantiza que solo los usuarios autorizados puedan acceder a las funcionalidades del proyecto, mejorando la seguridad de la aplicación.

- `Diseño Responsivo y Modular`: Utilizar Tailwind CSS para el diseño permite crear una interfaz moderna y responsiva, lo que asegura que la aplicación funcione bien en dispositivos de diferentes tamaños.

- `Interacción con APIs`: Implementar servicios de tareas para la gestión de datos (fetchTasks) permite una separación clara de la lógica de negocio y la presentación, mejorando la organización del código.

- `Gestión de Errores y Validaciones`: Implementar validaciones en el formulario de creación de tareas garantiza que los datos ingresados sean correctos antes de enviarlos al servidor, lo que reduce la posibilidad de errores.

- `Documentación Clara`: Mantener una documentación clara y accesible sobre la arquitectura del proyecto, el uso de componentes y las decisiones técnicas tomadas facilita la incorporación de nuevos desarrolladores al equipo y la comprensión del sistema.
