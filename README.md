# Ticketing System Express

Sistema de gestión de tickets desarrollado con **Node.js**, **Express** y **MongoDB**. Esta aplicación permite administrar el ciclo de vida de incidencias mediante una API RESTful, incluyendo gestión de usuarios, autenticación y roles.

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
   git clone https://github.com/Balti2003/Proyecto_ticketing_express.git
   cd Proyecto_ticketing_express
   
2. **Instala las dependencias**:
   ```bash
   npm install
   
3. **Configura las variables de entorno**:
   ```bash
   Crea un archivo .env en la raiz del proyecto y coloca:
   PORT=4000
   JWT_SECRET=tu_clave_secreta_aqui

## 🚀 Uso

1. **El proyecto usa los siguientes scripts**:
   ```bash
   npm run dev (desarrollo con modo watch)
   npm start (produccion)
   npm test (ejecutar tests)

## 🛣️ API Endpoints

### 👤 Usuarios (`/api/users`)

- **POST /signup**  
  Registro de nuevos usuarios con cifrado de contraseña.

- **POST /login**  
  Autenticación y generación de token JWT.

---

### 🎫 Tickets (`/api/tickets`)

- **GET /**  
  Listado paginado con soporte para filtros de estado, prioridad y búsqueda.

- **POST /**  
  Crear un ticket.  
  🔒 Requiere autenticación.

- **GET /:id**  
  Obtener detalles de un ticket por su ID único.

- **PUT /:id**  
  Actualizar datos de un ticket.  
  🔒 Requiere autenticación.

- **DELETE /:id**  
  Eliminar un ticket.  
  🔐 Solo accesible para Administradores.

---

## 📊 Modelos de Datos

### 🎫 Ticket

- **id**: UUID único generado automáticamente.
- **user**: ID del usuario que creó el ticket.
- **status**: `open`, `in-progress`, `closed`.
- **priority**: `low`, `medium`, `high`.
- **title**: Campo obligatorio.
- **description**: Campo obligatorio.

---

### 👤 Usuario

- **id**: UUID único generado automáticamente.
- **role**: `user` (por defecto) o `admin`.
- **email**:  
  - Único  
  - En minúsculas  
  - Validado
- **password**:  
  - Mínimo de 8 caracteres  
  - Almacenada de forma segura mediante hashing.

## ✒️ Autor

**Baltasar Lomello**
