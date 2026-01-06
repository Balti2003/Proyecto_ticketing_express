# Ticketing System Express

Sistema de gestión de tickets educativo desarrollado con **Node.js**, **Express** y **MongoDB**. Esta aplicación permite administrar el ciclo de vida de incidencias mediante una API RESTful, incluyendo gestión de usuarios, autenticación y roles.

## 🚀 Características

- **Autenticación y Autorización**: Implementada con **JWT (JSON Web Tokens)** y encriptación de contraseñas con **bcryptjs**.
- **Gestión de Tickets**: CRUD completo que incluye título, descripción, prioridad y estado.
- **Roles de Usuario**: Diferenciación entre usuarios estándar y administradores; los administradores poseen permisos exclusivos para eliminar tickets.
- **Búsqueda y Filtrado**: Soporte para filtrado por estado, prioridad y búsqueda por texto mediante middlewares especializados.
- **Paginación**: Sistema de paginación integrado para el listado de tickets.
- **Validación**: Validación de esquemas de datos para tickets mediante **Joi**.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js (ES Modules).
- **Framework**: Express.
- **Base de Datos**: MongoDB con Mongoose.
- **Seguridad**: JWT, bcryptjs y UUID.
- **Logging**: Morgan y Winston.
- **Testing**: Jest y Supertest.

## 📦 Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <tu-url-del-repositorio>
   cd Proyecto_ticketing_express    