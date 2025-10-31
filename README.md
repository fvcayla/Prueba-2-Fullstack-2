# TechStore - Aplicación React

Aplicación de tienda de tecnología (TechStore) migrada de HTML estático a React con Bootstrap, operaciones CRUD y pruebas unitarias.

## Requisitos Cumplidos

✅ **Migración de HTML a React**
- Todos los componentes HTML migrados a componentes React reutilizables
- Cada componente maneja su propio estado y propiedades de manera eficiente

✅ **Archivo de datos en JavaScript**
- Archivo `src/data/database.js` actúa como fuente de datos simulada
- Implementa funciones CRUD completas para productos, usuarios y blog posts

✅ **Integración de persistencia**
- El archivo de persistencia está conectado con componentes React
- Los datos se actualizan en tiempo real y la interfaz se actualiza automáticamente

✅ **Diseño responsivo con Bootstrap**
- Bootstrap 5.3 integrado para diseño responsivo
- Experiencia óptima en móviles, tabletas y escritorios

✅ **Vistas adicionales**
- Panel de administración completo
- Gestión de productos y usuarios con CRUD
- Páginas de detalle mejoradas

✅ **Interactividad mejorada**
- Formularios avanzados con validación
- Filtros de búsqueda en productos y blog
- Navegación mejorada con React Router
- Carrito de compras funcional

✅ **Configuración de pruebas**
- Entorno de pruebas configurado con Jasmine y Karma
- Archivo `karma.conf.js` configurado

✅ **Pruebas unitarias**
- Pruebas escritas para servicios de datos (CRUD)
- Pruebas para componentes React

## Instalación

1. Instalar dependencias:
```bash
npm install
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas con Karma y Jasmine

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header/
│   ├── Footer/
│   └── ProductCard/
├── pages/              # Páginas principales
│   ├── Home/
│   ├── Products/
│   ├── Blog/
│   ├── Contact/
│   └── Admin/          # Panel de administración
├── data/
│   └── database.js     # Archivo de datos con CRUD
├── App.js
└── index.js
```

## Funcionalidades

### Usuario Regular
- Navegación por productos
- Búsqueda y filtrado de productos
- Detalle de productos
- Carrito de compras
- Registro e inicio de sesión
- Blog con posts

### Administrador
- Dashboard con estadísticas
- Gestión de productos (CRUD)
- Gestión de usuarios (CRUD)
- Acceso protegido con autenticación

## Credenciales de Prueba

**Administrador:**
- Email: admin@techstore.com
- Password: admin123

**Usuario:**
- Email: juan@example.com
- Password: user123

## Tecnologías Utilizadas

- React 18.2
- React Router 6.20
- Bootstrap 5.3
- React Bootstrap 2.9
- Jasmine 5.1
- Karma 6.4
- Webpack 5.89

## Desarrollo

El proyecto está configurado con:
- Hot reload en desarrollo
- Enrutamiento con React Router
- Gestión de estado local con React Hooks
- Validación de formularios
- Manejo de errores

## Pruebas

Las pruebas están configuradas con Jasmine y Karma. Para ejecutar:

```bash
npm test
```

Las pruebas cubren:
- Operaciones CRUD de datos
- Funcionalidad de componentes
- Lógica de negocio

## Licencia

Este proyecto es de uso educativo.
