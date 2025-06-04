# Todo List App

Este proyecto es una aplicación **Todo List** construida con **Angular**, **Ionic** y**Cordova**, diseñada para plataformas web y móviles. Incluye funcionalidades de gestión de tareas y es compatible con Cordova y Capacitor para su despliegue en dispositivos móviles.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Configuración](#configuración)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Configuraciones de Compilación](#configuraciones-de-compilación)
- [Descripción de la Arquitectura](#descripción-de-la-arquitectura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Gestión de Tareas](#gestión-de-tareas)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Aplicación Desplegada](#aplicación-desplegada)


## Características

## Características

1. **Gestión de Tareas**:
   - Añadir, actualizar y eliminar tareas.
   - Las tareas pueden tener un título, categoría (que se puede añadir, editar o eliminar) y fecha opcional.
   - Las categorías permiten organizar las tareas de manera más eficiente, y se pueden gestionar de manera independiente para adaptarse a las necesidades del usuario.
   - Funcionalidad para alternar el estado de completado de las tareas.
   - **Filtrado de Tareas**: Permite filtrar las tareas por nombre o por categoría, facilitando la búsqueda de tareas específicas.
   - **Infinity Scroll**: Mejora el rendimiento mediante la carga paginada de las tareas, evitando cargar todas las tareas al mismo tiempo y optimizando el uso de recursos.

2. **Integración Móvil**:
   - Compatible con **Cordova** y **Capacitor** para el despliegue en Android e iOS.
   - Uso de **Cordova Plugins** para funcionalidades específicas del dispositivo, como el estado de la barra de estado, teclado, y la pantalla de inicio.

3. **Seguridad y Almacenamiento**:
   - **Almacenamiento encriptado**: Los datos se almacenan de manera segura, utilizando técnicas de encriptación para proteger la información tanto en **LocalStorage** como en **SessionStorage**.

4. **Responsive Design**:
   - La interfaz está diseñada para ser **responsive**, garantizando una experiencia de usuario óptima tanto en dispositivos móviles como en plataformas web de escritorio.

5. **Integración con Firebase**:
   - Configuración remota y actualizaciones en tiempo real a través de Firebase.

6. **Componentes UI de Ionic**:
   - Construido con componentes de UI de Ionic para una experiencia de usuario fluida tanto en plataformas móviles como web.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- **Node.js** (>=16.x)
- **Ionic CLI** (>=6.x)
- **Angular CLI** (>=18.x)
- **Capacitor CLI** (>=6.x)
- **Cordova CLI** (>=10.x)
- **Java SDK** y **Android Studio** (para compilar en Android)
- **Xcode** (para compilar en iOS)

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/OsmanJimenez/todo-list_iconic_app.git
   cd todo-list
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar la Aplicación

### Modo de Desarrollo

Para ejecutar la aplicación localmente en modo desarrollo:

```bash
npm start
```

Esto servirá la aplicación en `http://localhost:8100`.

### Desplegar en Móvil (Cordova)

Para ejecutar en un dispositivo móvil usando Cordova:

Android:
```bash
ionic cordova run android
```

iOS:
```bash
ionic cordova run ios
```

Asegúrate de abrir el proyecto en Xcode para probar en un simulador de iOS o un dispositivo real.

### Desplegar en Móvil (Capacitor)

Para ejecutar en un dispositivo móvil usando Capacitor:

Android:
```bash
ionic capacitor run android
```

iOS:
```bash
ionic capacitor run ios
```

## Configuraciones de Compilación

- Compilación estándar:
  ```bash
  npm run build
  ```
  Crea una compilación de producción.

- Compilación móvil (Android o iOS):
  ```bash
  ionic cordova build android
  ionic cordova build ios
  ```

- Compilación en modo desarrollo:
  ```bash
  npm run watch
  ```

## Descripción de la Arquitectura

El proyecto sigue una arquitectura modular para mantener la separación de responsabilidades:

- **Capa de Presentación**: Maneja la UI utilizando componentes de Ionic y Angular.
- **Capa de Aplicación**: Contiene la lógica empresarial y los servicios, como la gestión de tareas.
- **Capa de Infraestructura**: Gestiona las integraciones con Firebase, el almacenamiento local, y otros servicios.
- **Capa de Dominio**: Contiene los modelos de negocio principales (como Task).

## Estructura de Carpetas

```
📦src
 ┣ 📂app
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📂ports
 ┃ ┃ ┃ ┣ 📜task-repository.token.ts
 ┃ ┃ ┃ ┗ 📜task.repository.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📜task.service.spec.ts
 ┃ ┃ ┃ ┗ 📜task.service.ts
 ┃ ┣ 📂domain
 ┃ ┃ ┗ 📂models
 ┃ ┃ ┃ ┣ 📜task-status.enum.ts
 ┃ ┃ ┃ ┣ 📜task.model.spec.ts
 ┃ ┃ ┃ ┗ 📜task.model.ts
 ┃ ┣ 📂infrastructure
 ┃ ┃ ┣ 📂adapters
 ┃ ┃ ┃ ┗ 📜local-storage-task.repository.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📂encrypted-storage
 ┃ ┃ ┃ ┃ ┣ 📜encrypted-storage.service.ts
 ┃ ┃ ┃ ┃ ┗ 📜encryption-key.token.ts
 ┃ ┃ ┃ ┗ 📂remote-config
 ┃ ┃ ┃ ┃ ┣ 📜remote-config.service.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜remote-config.service.ts
 ┃ ┣ 📂presentation
 ┃ ┃ ┗ 📂home
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📂add-task
 ┃ ┃ ┃ ┃ ┃ ┣ 📜add-task.component.html
 ┃ ┃ ┃ ┃ ┃ ┣ 📜add-task.component.scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜add-task.component.spec.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜add-task.component.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜add-task.config.ts
 ┃ ┃ ┃ ┃ ┣ 📂category-filter
 ┃ ┃ ┃ ┃ ┃ ┣ 📜category-filter.component.html
 ┃ ┃ ┃ ┃ ┃ ┣ 📜category-filter.component.scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜category-filter.component.spec.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜category-filter.component.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜category-filter.config.ts
 ┃ ┃ ┃ ┃ ┣ 📂tasks
 ┃ ┃ ┃ ┃ ┃ ┣ 📜tasks.component.html
 ┃ ┃ ┃ ┃ ┃ ┣ 📜tasks.component.scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜tasks.component.spec.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜tasks.component.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜tasks.config.ts
 ┃ ┃ ┃ ┃ ┗ 📂update-task
 ┃ ┃ ┃ ┃ ┃ ┣ 📜update-task.component.html
 ┃ ┃ ┃ ┃ ┃ ┣ 📜update-task.component.scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜update-task.component.spec.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜update-task.component.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜update-task.config.ts
 ┃ ┃ ┃ ┣ 📜home-routing.module.ts
 ┃ ┃ ┃ ┣ 📜home.config.ts
 ┃ ┃ ┃ ┣ 📜home.module.ts
 ┃ ┃ ┃ ┣ 📜home.page.html
 ┃ ┃ ┃ ┣ 📜home.page.scss
 ┃ ┃ ┃ ┣ 📜home.page.spec.ts
 ┃ ┃ ┃ ┗ 📜home.page.ts
 ┃ ┣ 📜app-routing.module.ts
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.scss
 ┃ ┣ 📜app.component.spec.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┗ 📜app.module.ts
 ┣ 📂assets
 ┃ ┣ 📂icon
 ┃ ┃ ┗ 📜favicon.png
 ┃ ┗ 📜shapes.svg
 ┣ 📂environments
 ┃ ┣ 📜environment.prod.ts
 ┃ ┗ 📜environment.ts
 ┣ 📂theme
 ┃ ┗ 📜variables.scss
 ┣ 📜global.scss
 ┣ 📜index.html
 ┣ 📜main.ts
 ┣ 📜polyfills.ts
 ┣ 📜test.ts
 ┗ 📜zone-flags.ts
```

## Gestión de Tareas

- **Servicio de Tareas**:
  - Añadir Tarea: Agrega una tarea con título, categoría y fecha opcional.
  - Actualizar Tarea: Edita tareas existentes.
  - Eliminar Tarea: Elimina tareas según la interacción del usuario.

- **Componentes**:
  - `AddTaskComponent`: Componente de UI para agregar tareas.
  - `UpdateTaskComponent`: Modal para actualizar tareas.
  - `TasksComponent`: Muestra la lista de tareas con la opción de alternar el estado de completado o eliminarlas.

## Pruebas

El proyecto utiliza Jest para las pruebas unitarias.

Para ejecutar las pruebas:
```bash
npm test
```

Para ejecutar las pruebas con cobertura:
```bash
npm run test -- --coverage
```

## Despliegue

### Para Plataformas Móviles

Puedes desplegar la aplicación en Android o iOS usando Cordova o Capacitor.

#### Despliegue con Cordova

Para Android:
```bash
ionic cordova build android
```

Para iOS:
```bash
ionic cordova build ios
```
Abre el proyecto en Xcode para desplegar en un simulador o dispositivo iOS real.

#### Despliegue con Capacitor

Para Android:
```bash
ionic capacitor build android
```

Para iOS:
```bash
ionic capacitor build ios
```
Abre el proyecto en Xcode para desplegar en un dispositivo iOS o simulador.

## Aplicación Desplegada

La aplicación Todo List está desplegada en el hosting de Firebase y se puede acceder a través de la siguiente URL:

[Todo List App](https://todo-list-osman.web.app)

Esta versión desplegada representa la última versión estable de la aplicación y está disponible para su uso inmediato en cualquier navegador web moderno.


## 👤 Autor

**Osman Armando Jiménez Cortés**  
[Portafolio profesional](https://osmanjimenez.com/)  
[Perfil de GitHub](https://github.com/OsmanJimenez)

Ingeniero de Sistemas y Desarrollador Full Stack especializado en desarrollo web y aplicaciones móviles.

