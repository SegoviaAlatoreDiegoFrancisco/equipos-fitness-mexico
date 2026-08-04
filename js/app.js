/* ============================================================
   Equipos fitness de México — JS vanilla
   - Catálogo generado desde datos
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
     CAMBIAR: para usar tus fotos reales, guarda el archivo en
     assets/img/ y cambia `imagen` a la ruta (ej: "assets/img/prensa.jpg").
     Deja `imagen: null` para mostrar el placeholder gris.
     Usa `precioAnterior: null` si el producto no tiene descuento.
  ---------------------------------------------------------- */
  var CATALOGO = [
    {
      nombre: "Prensa de Piernas 45 grados",
      descripcion: "Plataforma inclinada para trabajo intenso de pierna y glúteo. Ideal para zonas de fuerza y cardio.",
      precio: 45900,
      precioAnterior: 51000,
      imagen: null
    },
    {
      nombre: "Jaula de Sentadillas (Squat Rack)",
      descripcion: "Estructura reforzada con soportes regulables y barras de seguridad para entrenar con confianza.",
      precio: 23800,
      precioAnterior: null,
      imagen: null
    },
    {
      nombre: "Smith Machine",
      descripcion: "Guías de acero con movimiento controlado. Soporta cargas altas para rutinas de fuerza y volumen.",
      precio: 38500,
      precioAnterior: 42500,
      imagen: null
    },
    {
      nombre: "Polea Alta y Baja",
      descripcion: "Torre de poleas con dos estaciones para espalda, brazos y abdominales. Cable de acero de larga duración.",
      precio: 29800,
      precioAnterior: null,
      imagen: null
    },
    {
      nombre: "Banco Olímpico Plano",
      descripcion: "Base ancha con acojinamiento antideslizante. Soporta press de banca con cargas olímpicas.",
      precio: 9800,
      precioAnterior: 11500,
      imagen: null
    },
    {
      nombre: "Banco Ajustable Inclinable",
      descripcion: "Respaldar con múltiples ángulos para desarrollar pecho, hombros y core de forma versátil.",
      precio: 12400,
      precioAnterior: null,
      imagen: null
    },
    {
      nombre: "Juego de Mancuernas Hex",
      descripcion: "Juego de 2.5 kg a 25 kg (par) con cabeza hexagonal antirrotación y agarre cromado.",
      precio: 21800,
      precioAnterior: 24500,
      imagen: null
    },
    {
      nombre: "Discos Olímpicos (Carga Completa)",
      descripcion: "Juego completo de discos de goma con agujero de 50 mm. Protege tu piso y soporta el uso diario.",
      precio: 18900,
      precioAnterior: null,
      imagen: null
    }
  ];

  var formatearPrecio = function (valor) {
    return "$" + valor.toLocaleString("es-MX");
  };

  /* ----------------------------------------------------------
     GENERAR TARJETAS DEL CATÁLOGO
  ---------------------------------------------------------- */
  var grid = document.getElementById("gridCatalogo");

  if (grid) {
    var html = "";
    CATALOGO.forEach(function (producto, indice) {
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
