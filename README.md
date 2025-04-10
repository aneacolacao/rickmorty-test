# Rick & Morty App 

Aplicación web que permite explorar personajes de Rick and Morty, seleccionar favoritos y ver sus detalles.

## Levantamiento de proyecto

### 1. Instalar dependencias

```console
npm install
```

### 2. Poblar base de datos

```console
npm run seed
```

### 3. Levantar el servidor JSON (json-server)

```console
npm run server
```
Esto levantará el backend local en: http://localhost:3001

### 4. Levantar aplicación
```console
npm run dev
```
Esto abrirá la app en: http://localhost:3000

## Pruebas unitarias
La app incluye pruebas unitarias para componentes clave como:

1. Selección de personaje
2. Visualización de favoritos
3. Activación del ícono de favoritos

Correr el comando
```console
npm run test
```
Las pruebas están configuradas con Jest y React Testing Library.

## Desarrollo

### Cosas que más me gustaron
Disfruté la parte de manejar los diferentes estados de los personajes y cómo se verían en el navegador dependiendo de la situación.

### ¿Qué hubiera hecho con más tiempo?
- Hubiera agregado Lazy Load en la lista de personajes
- Manejar variables de entorno para las URLs que se ocupan en las llamadas al json-server
- Hubiera agregado una librería con íconos en lugar de colocar directamente el SVG
- Manejar la visibilidad de los botones del scroll a que desaparecieran cuando los elementos del buscador eran pocos

### Pain Point
En el json-server, en la sección de favoritos tenía personajes duplicados y no se controlaba correctamente la visualización del corazón (no se desactivaba), por lo que tuve que revisar previsamente que no estuviera en la lista de favoritos, antes de añadirlo.