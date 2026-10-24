# Laboratorio 10: Enrutamiento y páginas

Aplicación web desarrollada con Next.js, TypeScript y Tailwind CSS. Incluye una Pokédex y un explorador de personajes de Rick and Morty con rutas estáticas y dinámicas.

## Funcionalidades

- Listado de los primeros 151 Pokémon y fichas con tipos, estadísticas, altura, peso y habilidades.
- Catálogo de personajes de Rick and Morty y búsqueda en tiempo real por nombre, estado, tipo y género.
- Fichas de personajes con imagen, origen, ubicación, episodios y datos del registro.
- Paginación de resultados y navegación a un personaje aleatorio.
- Imágenes con carga bajo demanda y diseño adaptable a distintos tamaños de pantalla.
- Pantallas personalizadas para errores y recursos no encontrados.
- Generación de rutas estáticas y revalidación de datos: 24 horas para Pokémon y 10 días para Rick and Morty.

## Tecnologías

- Next.js con App Router.
- React y TypeScript.
- Tailwind CSS y React Icons.
- PokeAPI y Rick and Morty API.

## Instalación

Se requiere Node.js y npm disponibles en la terminal.

```bash
git clone https://github.com/aleyto123/s10_Bellido_Rony_Enrutamiento-y-P-ginas.git
cd s10_Bellido_Rony_Enrutamiento-y-P-ginas
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

En PowerShell, si la política de ejecución bloquea `npm.ps1`, utilizar `npm.cmd`:

```powershell
npm.cmd run dev
```

## Rutas principales

| Ruta | Contenido |
| --- | --- |
| `/` | Portada y catálogo renderizado en el servidor. |
| `/characters` | Catálogo estático de Rick and Morty. |
| `/characters/search` | Búsqueda con filtros y paginación. |
| `/characters/[id]` | Detalle del personaje por identificador; por ejemplo, `/characters/1`. |
| `/pokemon` | Lista de los primeros 151 Pokémon. |
| `/pokemon/[name]` | Detalle del Pokémon por nombre; por ejemplo, `/pokemon/pikachu`. |

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la compilación para producción. |
| `npm run start` | Inicia la aplicación con la compilación de producción existente. |
| `npm run lint` | Ejecuta ESLint. |

Para ejecutar en modo producción, primero generar la compilación y luego iniciar el servidor:

```bash
npm run build
npm run start
```

Detener el servidor anterior con `Ctrl + C` antes de iniciar otro en el mismo puerto.

## Estructura del proyecto

```text
src/
├── app/             # Páginas, layouts, estilos y manejadores de errores
│   ├── characters/  # Catálogo, búsqueda y detalle de personajes
│   └── pokemon/     # Listado y detalle de Pokémon
├── components/      # Componentes de interfaz y búsqueda
├── lib/             # Consultas al servicio de personajes y configuración de caché
└── types/           # Interfaces de las respuestas de las API
```

## Fuentes de datos

- [PokeAPI](https://pokeapi.co/).
- [Documentación de Rick and Morty API](https://rickandmortyapi.com/documentation/#character).

Las consultas necesitan acceso a internet. La compilación obtiene los personajes disponibles para generar sus rutas estáticas.
