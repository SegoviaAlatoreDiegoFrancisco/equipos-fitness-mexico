# Equipos Fitness de México — Landing Page

Landing page one-page para la venta de equipos de gimnasio. HTML, CSS y JS vanilla (sin frameworks ni preprocesadores).

## Estructura

```
index.html            # Página principal
css/estilos.css       # Estilos (variables, grid, responsive)
js/datos.js           # Catálogo de productos (generado desde el CSV)
js/app.js             # Lógica: catálogo, búsqueda, menú, formulario → WhatsApp
assets/img/           # Coloca aquí las fotos reales
README.md
```

## Cómo reemplazar los placeholders de imagen

1. Guarda las fotos en `assets/img/` (JPG de preferencia, optimizadas para web).
2. Hero: reemplaza el archivo `assets/img/hero.jpg`.
3. Catálogo: en `js/datos.js`, cambia `imagen` por la ruta de tu foto,
   ej. `imagen: "assets/img/prensa.jpg"`. Las fotos actuales siguen la
   convención `assets/img/maquinas/{id}.png`.

## Datos de contacto (ya configurados)

- WhatsApp: `5554949029` → enlace `https://wa.me/525554949029`
- Correo: `equiposfitmexdiego@gmail.com`

Para cambiar el número o el correo en el futuro, actualiza las constantes
`TELEFONO` y `CORREO` al inicio de `js/app.js`, y los enlaces en `index.html`
(busca `525554949029` y `equiposfitmexdiego@gmail.com`).

## Personalizar catálogo

El catálogo se genera desde el arreglo `CATALOGO` en `js/datos.js` (se carga como
`window.CATALOGO` y lo consume `js/app.js`). Los datos provienen de
`assets/data/lista-equipos.csv`. Cada producto admite:

| Campo              | Descripción                                |
| ------------------ | ------------------------------------------- |
| `id`             | Identificador (coincide con el nombre de la foto) |
| `nombre`         | Nombre del aparato                          |
| `descripcion`    | Descripción técnica o de uso              |
| `precio`         | Precio actual (entero, se formatea solo)    |
| `precioAnterior` | Precio tachado.`null` = sin descuento     |
| `imagen`         | Ruta de la foto.`null` = placeholder gris |

La página incluye un buscador que filtra las tarjetas por nombre y descripción.

## Uso

Abre `index.html` directamente en el navegador. No requiere servidor ni build, aun no se despliega a producción.

## Notas legales

- El footer incluye un aviso de privacidad básico (requisito común de Google Ads).
- El formulario no envía datos a un servidor: construye un mensaje de WhatsApp prellenado.
