⚠️ Disclaimer
Este proyecto, Zapa-Store-React, ha sido desarrollado exclusivamente con fines educativos y demostrativos. 
No está diseñado para entornos de producción. El código puede contener fallas de seguridad, lógica no optimizada y carece de validaciones exhaustivas y controles de acceso.
No se recomienda su uso en aplicaciones reales sin una auditoría completa, pruebas rigurosas y fortalecimiento de seguridad.

Sitio Web:
https://react-proyecto-czfhznp11-adrianeses-projects.vercel.app/

Sitio Web:
https://react-proyecto-nu.vercel.app/

# Proyecto E-commerce con React

Este es el repositorio de un proyecto de E-commerce desarrollado con React. La aplicación simula una tienda en línea, permitiendo a los usuarios explorar un catálogo de productos, filtrarlos según sus necesidades, compararlos y gestionar un carrito de compras. Accediendo al Sector Admin se realiza un CRUD de productos.

## Descripción General

La aplicación está diseñada para ser una plataforma de comercio electrónico robusta y moderna. Utiliza una arquitectura basada en componentes de React para crear una interfaz de usuario interactiva y reutilizable. El enfoque principal es ofrecer una experiencia de usuario fluida para la búsqueda y selección de productos.

## Características Principales

*   **Catálogo de Productos:** Muestra una lista de productos en un diseño de cuadrícula (grid) fácil de navegar.
*   **Búsqueda y Filtrado:** Incluye un potente componente de búsqueda que permite a los usuarios filtrar productos por:
    *   Marca
    *   Actividad o categoría
    *   Ordenar por precio (ascendente/descendente)

*   **Carrito de Compras:** Los usuarios pueden agregar productos a un carrito, ver un resumen de su selección y simular el proceso de compra.
*   **Páginas Estáticas:** Incluye secciones informativas como "Nosotros" y un formulario de "Contacto".
*   **Páginas Dinámicas:** Incluye secciones informativas con Detalles de Productos y un formulario de "Inicio de Sesión".
*   **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio, gracias al uso de Media Queries.

Formato Basico del Proyecto:

src/
├── App.jsx
├── index.js
│
├── pages/
│   ├── Inicio.jsx
│   ├── Productos.jsx
│   ├── Nosotros.jsx
│   ├── Contacto.jsx
│   ├── Carrito.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Checkout.jsx
│   └── admin/
│       ├── Board.jsx
│       ├── ProductosAdmin.jsx
│       ├── CrearProducto.jsx
│       ├── EditarProducto.jsx
│       ├── PedidosAdmin.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductoCard.jsx
│   ├── CarritoItem.jsx
    ├── Buscador.jsx
│   ├── CarritoModal.jsx
│   ├── Header.jsx
│   └── SeccionProductos.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CarritoContext.jsx
│   ├── AuthProvider.jsx
│   └── CarritoProvider.jsx



#

###  Autenticación básica (Login y Registro)

** Permite que usuarios se registren, inicien sesión y se identifiquen para comprar.

### Se crea una estructura de usuarios en MockAPI
- Endpoint: `/users`
- Campos: `id`, `nombre`, `correo`, `password`, `compras[]`, `rol` (`usuario` o `admin`)

#### Se Implementa `Register.jsx`
- Formulario con `nombre`, `correo`, `password`
- Validaciones visuales (SweetAlert2, campos obligatorios)
- POST a MockAPI para crear usuario

#### Se Implementa `Login.jsx`
- Formulario con `correo`, `password`
- Validación contra MockAPI (GET con filtro por correo)
- Guardado de sesión 
- Redirigir a `/checkout` si hay productos en el carrito


---

### Gestión de pedidos

Se Procesan las compras y se las vincula al usuario logueado.

#### Estructura de pedidos en MockAPI
- Endpoint: `/users`
 Campos: `id`, `nombre`, `correo`, `password`, `compras[]`, `rol` (`usuario` o `admin`), `fecha`, `total`, `estado`, `factura`



### Panel de administración

 Control total sobre productos y pedidos.

####  Login de administrador
- Validación contra correo `admin@correo.com` y password `admin`
    Se redirige a /board.jsx
- Se accede a todos los Productos para Editarlos o Borrarlos
- Creación de Producto Nuevo
- Acceso a la lista de los Usuarios Registrados y sus pedidos
- Cierre de Sesión de ADMIN.

#### 3. `ProductosAdmin.jsx`
- GET `/products`
- SE muestran los productos en Cards similares a los productos, con textareas para las 
    descripciones, con botón de editar y eliminar
- DELETE para eliminar Con confirmación.
- Navegar a `EditarProducto.jsx` con un formulario para acceder a todos los campos.
#### 4. `EditarProducto.jsx`
- Formulario precargado con datos del producto
- PUT para actualizar
#### 5. `CrearProducto.jsx`
- Formulario completo con imagen, nombre, precio, actividad, disponibilidad
- POST a `/products`

#### 6. `PedidosAdmin.jsx`
- GET `/users`
- SE muestra una tabla con: ID, usuario, fecha, total, productos, estado
- Filtro por usuarios con botones y cards.
