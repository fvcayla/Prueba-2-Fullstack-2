# Instrucciones de Instalación y Uso

## Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```
   La aplicación se abrirá en http://localhost:3000

3. **Construir para producción:**
   ```bash
   npm run build
   ```

## Ejecutar Pruebas

Para ejecutar las pruebas unitarias con Jasmine y Karma:

```bash
npm test
```

O directamente:

```bash
npm run test:jasmine
```

## Estructura del Proyecto

### Componentes React
- `src/components/` - Componentes reutilizables (Header, Footer, ProductCard)
- `src/pages/` - Páginas principales de la aplicación
- `src/data/database.js` - Archivo de datos con operaciones CRUD

### Páginas Principales
- `/` - Página de inicio con productos destacados
- `/productos` - Lista de todos los productos con filtros y búsqueda
- `/productos/:id` - Detalle de producto
- `/blog` - Lista de posts del blog
- `/blog/:id` - Detalle de post del blog
- `/nosotros` - Página sobre nosotros
- `/contacto` - Formulario de contacto
- `/login` - Inicio de sesión
- `/registro` - Registro de nuevos usuarios

### Panel de Administración
- `/admin` - Dashboard principal
- `/admin/productos` - Gestión de productos (CRUD)
- `/admin/productos/nuevo` - Crear nuevo producto
- `/admin/productos/editar/:id` - Editar producto
- `/admin/usuarios` - Gestión de usuarios (CRUD)
- `/admin/usuarios/nuevo` - Crear nuevo usuario
- `/admin/usuarios/editar/:id` - Editar usuario

## Credenciales de Prueba

### Administrador
- **Email:** admin@techstore.com
- **Password:** admin123

### Usuario Regular
- **Email:** juan@example.com
- **Password:** user123

## Funcionalidades Implementadas

### ✅ Migración HTML a React
- Todos los componentes HTML convertidos a React
- Componentes reutilizables con estado y props

### ✅ Archivo de Datos JavaScript
- `database.js` con operaciones CRUD completas
- Servicios para productos, usuarios, blog posts y carrito

### ✅ Integración de Persistencia
- Datos conectados con componentes React
- Actualización en tiempo real de la interfaz

### ✅ Bootstrap Responsivo
- Bootstrap 5.3 integrado
- Diseño responsivo para móviles, tablets y escritorio

### ✅ Vistas Adicionales
- Panel de administración completo
- Gestión CRUD de productos y usuarios

### ✅ Interactividad Mejorada
- Formularios avanzados con validación
- Filtros de búsqueda en productos
- Navegación mejorada con React Router
- Carrito de compras funcional

### ✅ Configuración de Pruebas
- Karma y Jasmine configurados
- `karma.conf.js` listo para usar

### ✅ Pruebas Unitarias
- Pruebas para servicios de datos (CRUD)
- Pruebas básicas para componentes React

## Notas Importantes

1. **Datos Simulados:** Los datos se almacenan en memoria (no persisten después de refrescar la página)
2. **Autenticación:** El sistema de autenticación es básico y funciona en memoria
3. **Carrito:** El carrito persiste durante la sesión pero se pierde al refrescar

## Desarrollo

El proyecto está configurado con:
- Hot reload en desarrollo
- Enrutamiento con React Router v6
- Estado local con React Hooks
- Validación de formularios
- Manejo de errores básico

## Solución de Problemas

Si encuentras errores al ejecutar las pruebas:
1. Asegúrate de tener Chrome instalado (para Karma)
2. Verifica que todas las dependencias estén instaladas: `npm install`
3. Revisa la configuración de Karma en `karma.conf.js`

## Tecnologías

- React 18.2
- React Router 6.20
- Bootstrap 5.3
- Jasmine 5.1
- Karma 6.4
- Webpack 5.89
