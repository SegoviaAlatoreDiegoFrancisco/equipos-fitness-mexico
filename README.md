# Equipos Fitness de México — Landing Page

Landing page one-page para la venta de equipos de gimnasio. HTML, CSS y JS vanilla (sin frameworks ni preprocesadores).

## Estructura

```
index.html            # Página principal
css/estilos.css       # Estilos (variables, grid, responsive)
js/app.js             # Lógica: catálogo, menú, formulario → WhatsApp
assets/img/           # Coloca aquí las fotos reales
README.md
```

## Cómo reemplazar los placeholders de imagen

1. Guarda las fotos en `assets/img/` (JPG de preferencia, optimizadas para web).
2. Hero: reemplaza el archivo `assets/img/hero.jpg`.
3. Catálogo: en `js/app.js`, en el bloque `CATALOGO`, cambia `imagen: null` por la ruta,
   ej. `imagen: "assets/img/prensa.jpg"`. Mientras esté `null` se muestra el placeholder gris.

## Datos de contacto (ya configurados)

- WhatsApp: `5554949029` → enlace `https://wa.me/525554949029`
- Correo: `equiposfitmexdiego@gmail.com`

Para cambiar el número o el correo en el futuro, actualiza las constantes
`TELEFONO` y `CORREO` al inicio de `js/app.js`, y los enlaces en `index.html`
(busca `525554949029` y `equiposfitmexdiego@gmail.com`).

## Personalizar catálogo

El catálogo se genera desde el arreglo `CATALOGO` en `js/app.js`. Cada producto admite:

| Campo              | Descripción                                |
| ------------------ | ------------------------------------------- |
| `nombre`         | Nombre del aparato                          |
| `descripcion`    | Descripción técnica o de uso              |
| `precio`         | Precio actual (entero, se formatea solo)    |
| `precioAnterior` | Precio tachado.`null` = sin descuento     |
| `imagen`         | Ruta de la foto.`null` = placeholder gris |

## Uso

Abre `index.html` directamente en el navegador. No requiere servidor ni build, aun no se despliega a producción.

## Notas legales

- El footer incluye un aviso de privacidad básico (requisito común de Google Ads).
- El formulario no envía datos a un servidor: construye un mensaje de WhatsApp prellenado.
