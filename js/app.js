/* ============================================================
   Equipos fitness de México — JS vanilla
   - Catálogo generado desde datos
   - Búsqueda en vivo del catálogo
   - Menú móvil hamburguesa
   - Botón "Me interesa" → WhatsApp prellenado + scroll a contacto
   - Formulario → WhatsApp (sin servidor)
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIGURACIÓN DE CONTACTO
     Cambia aquí el número (con lada internacional, sin +) y el
     correo si alguna vez necesitas actualizarlos.
  ---------------------------------------------------------- */
  var TELEFONO = "525554949029";
  var CORREO = "equiposfitmexdiego@gmail.com";

  /* ----------------------------------------------------------
     DATOS DEL CATÁLOGO
     Los productos se cargan desde js/datos.js (window.CATALOGO),
     convertidos desde assets/data/lista-equipos.csv.
     Para usar otras fotos, guarda el archivo en assets/img/ y
     cambia `imagen` a la ruta (ej: "assets/img/prensa.jpg").
     Usa `precioAnterior: null` si el producto no tiene descuento.
  ---------------------------------------------------------- */
  var CATALOGO = window.CATALOGO || [];

  var formatearPrecio = function (valor) {
    return "$" + valor.toLocaleString("es-MX");
  };

  /* ----------------------------------------------------------
     GENERAR TARJETAS DEL CATÁLOGO
  ---------------------------------------------------------- */
  var grid = document.getElementById("gridCatalogo");

  var pintarCatalogo = function (productos) {
    if (!grid) return;

    var html = "";
    productos.forEach(function (producto, indice) {
      var precio = formatearPrecio(producto.precio);
      var precioAnterior = producto.precioAnterior
        ? '<span class="tarjeta__precio--anterior">' + formatearPrecio(producto.precioAnterior) + "</span>"
        : "";
      var nota = producto.precioAnterior
        ? '<span class="tarjeta__precio--nota">- ' + Math.round((1 - producto.precio / producto.precioAnterior) * 100) + "%</span>"
        : "";
      var imagen = producto.imagen
        ? '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" loading="lazy">'
        : '<span class="tarjeta__img--placeholder" aria-hidden="true">&#128248;</span>';

      html +=
        '<article class="tarjeta">' +
        '<div class="tarjeta__img">' + imagen + "</div>" +
        '<div class="tarjeta__cuerpo">' +
        '<h3 class="tarjeta__nombre">' + producto.nombre + "</h3>" +
        '<p class="tarjeta__descripcion">' + producto.descripcion + "</p>" +
        '<p class="tarjeta__precio">' + precioAnterior + '<span class="tarjeta__precio--actual">' + precio + "</span>" + nota + "</p>" +
        '<button type="button" class="tarjeta__boton" data-interes="' + producto.nombre + '" data-indice="' + indice + '">Me interesa</button>' +
        "</div>" +
        "</article>";
    });

    grid.innerHTML = html;
  };

  pintarCatalogo(CATALOGO);

  /* ----------------------------------------------------------
     BÚSQUEDA EN EL CATÁLOGO (filtra por nombre y descripción)
  ---------------------------------------------------------- */
  var normalizar = function (texto) {
    return (texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  var buscador = document.getElementById("buscadorCatalogo");

  if (buscador) {
    buscador.addEventListener("input", function () {
      var termino = normalizar(buscador.value);
      if (!termino) {
        pintarCatalogo(CATALOGO);
        return;
      }

      var filtrados = CATALOGO.filter(function (producto) {
        return (
          normalizar(producto.nombre).indexOf(termino) !== -1 ||
          normalizar(producto.descripcion).indexOf(termino) !== -1
        );
      });

      pintarCatalogo(filtrados);
    });
  }

  /* ----------------------------------------------------------
     "ME INTERESA" → WhatsApp prellenado + scroll a contacto
  ---------------------------------------------------------- */
  var construirMensaje = function (equipo) {
    var mensaje = equipo
      ? "Hola, me interesa cotizar: " + equipo + ". ¿Pueden darme más información y el precio?"
      : "Hola, me interesa el catálogo de equipos para gimnasio.";
    return encodeURIComponent(mensaje);
  };

  document.addEventListener("click", function (evento) {
    var boton = evento.target.closest("[data-interes]");
    if (!boton) return;

    var nombreEquipo = boton.getAttribute("data-interes");
    var urlWhatsApp = "https://wa.me/" + TELEFONO + "?text=" + construirMensaje(nombreEquipo);

    evento.preventDefault();

    var seccionContacto = document.getElementById("contacto");
    if (seccionContacto) {
      seccionContacto.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(function () {
      window.open(urlWhatsApp, "_blank", "noopener");
    }, 700);
  });

  /* ----------------------------------------------------------
     MENÚ MÓVIL (HAMBURGUESA)
  ---------------------------------------------------------- */
  var hamburguesa = document.getElementById("navHamburguesa");
  var menu = document.getElementById("navMenu");

  if (hamburguesa && menu) {
    hamburguesa.addEventListener("click", function () {
      var abierto = menu.classList.toggle("nav__menu--abierto");
      hamburguesa.classList.toggle("nav__hamburguesa--abierto", abierto);
      hamburguesa.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    menu.addEventListener("click", function (evento) {
      if (evento.target.closest(".nav__enlace")) {
        menu.classList.remove("nav__menu--abierto");
        hamburguesa.classList.remove("nav__hamburguesa--abierto");
        hamburguesa.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----------------------------------------------------------
     FORMULARIO → WHATSAPP (prellenado, sin servidor)
  ---------------------------------------------------------- */
  var formulario = document.getElementById("formularioContacto");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var nombre = document.getElementById("nombre").value.trim();
      var contactoDato = document.getElementById("contactoDato").value.trim();
      var razon = document.getElementById("razon").value;
      var mensaje = document.getElementById("mensaje").value.trim();

      var valido = true;

      if (!nombre) {
        document.getElementById("nombre").classList.add("errores");
        valido = false;
      } else {
        document.getElementById("nombre").classList.remove("errores");
      }

      if (!contactoDato) {
        document.getElementById("contactoDato").classList.add("errores");
        valido = false;
      } else {
        document.getElementById("contactoDato").classList.remove("errores");
      }

      if (!valido) return;

      var lineas = [
        "Hola, les escribo desde la página web:",
        "Nombre: " + nombre,
        "Contacto: " + contactoDato,
        "Razón: " + razon
      ];

      if (mensaje) {
        lineas.push("Detalles: " + mensaje);
      }

      var url = "https://wa.me/" + TELEFONO + "?text=" + encodeURIComponent(lineas.join("\n"));
      window.open(url, "_blank", "noopener");

      formulario.reset();
    });
  }

  /* ----------------------------------------------------------
     AÑO AUTOMÁTICO EN EL FOOTER
  ---------------------------------------------------------- */
  var anio = document.getElementById("anioActual");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
})();
