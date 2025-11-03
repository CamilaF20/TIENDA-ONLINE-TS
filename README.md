# Tienda Online API - TypeScript

API RESTful desarrollada con **Node.js**, **Express**, **TypeScript** y **MongoDB**, que gestiona usuarios, clientes, productos y pedidos.  
Incluye autenticación con **JWT**, documentación con **Swagger**, y vistas con **EJS**.

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o una instancia local de MongoDB
- [Git](https://git-scm.com/)

---

## Instalación del proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/CamilaF20/TIENDA-ONLINE-TS.git
   ```

2. **Accede al directorio del proyecto:**
   ```bash
   cd TIENDA-ONLINE-TS
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Crea el archivo de variables de entorno `.env` en la raíz del proyecto:**
   ```bash
   PORT=3330
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/TiendaOnline
   JWT_SECRET=miclaveultrasecreta
   ```

---

##  Estructura del proyecto

```
TIENDA-ONLINE-TS/
├── src/
│   ├── config/            # Configuración de Swagger y otros servicios
│   ├── controllers/       # Controladores de negocio
│   ├── drivers/           # Conexión a la base de datos
│   ├── middlewares/       # Autenticación y validaciones
│   ├── models/            # Modelos Mongoose + Interfaces TypeScript
│   ├── routes/            # Definición de endpoints
│   ├── views/             # Vistas EJS
│   └── index.ts           # Punto de entrada principal
├── dist/                  # Código compilado (tras `npm run build`)
├── package.json
├── tsconfig.json
└── .env
```

---


###  Ejecutar en modo desarrollo
Compila y ejecuta el proyecto con **recarga automática**:
```bash
npm run dev
```

### 🔹 Compilar el proyecto
Transpila el código TypeScript a JavaScript (carpeta `dist/`):
```bash
npm run build
```

### 🔹 Ejecutar en modo producción
Ejecuta la versión compilada:
```bash
npm start
```

---

## Configuración del compilador TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
```
## Acceso a las vistas de la aplicación
---

http://localhost:3330 -- pagina principal (inicio de sesión o registrarse)

http://localhost:3330/login -- inicio de sesión

http://localhost:3330/register -- registrarse

http://localhost:3330/clients -- lista de clientes

localhost:3330/clients/newClient -- crear nuevo usuario

http://localhost:3330/orders/6907e263fce3fbf78511d0ee -- lista de pedidos hechos por usuario

http://localhost:3330/orders/newOrder/6907e263fce3fbf78511d0ee -- registrar pedido 

---
