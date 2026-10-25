const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

let mesVisible = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

let fechaIda = null;
let fechaVuelta = null;

let idaGuardada = null;
let vueltaGuardada = null;

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

mostrarCalendarios();

// Al cerrar sin guardar, recupera la última selección guardada.
document.getElementById("selector-fechas").addEventListener(
  "hidden.bs.dropdown",
  () => {
    fechaIda = idaGuardada;
    fechaVuelta = vueltaGuardada;

    mostrarCalendarios();
  }
);

/**
 * Descripción: Convierte una fecha a texto en formato día/mes/año.
 * @method formatearFecha
 * @param {Date} fecha - La fecha que se desea mostrar.
 * @returns {string} La fecha formateada.
 */
function formatearFecha(fecha) {
  return fecha.toLocaleDateString("es-AR");
}

/**
 * Descripción: Muestra dos meses consecutivos y actualiza
 * el mensaje de selección y el botón Guardar.
 * @method mostrarCalendarios
 */
function mostrarCalendarios() {
  crearCalendario(0);
  crearCalendario(1);

  const estado = document.getElementById("estado-fechas");

  if (!fechaIda) {
    estado.innerText = "Seleccioná la fecha de ida.";
  } else if (!fechaVuelta) {
    estado.innerText =
      `Ida: ${formatearFecha(fechaIda)}. Seleccioná la vuelta.`;
  } else {
    estado.innerText =
      `Ida: ${formatearFecha(fechaIda)} — ` +
      `Vuelta: ${formatearFecha(fechaVuelta)}.`;
  }

  document.getElementById("guardar-fechas").disabled =
    !fechaIda || !fechaVuelta;
}

/**
 * Descripción: Genera los días de uno de los calendarios,
 * destacando las fechas seleccionadas y el período entre ellas.
 * @method crearCalendario
 * @param {number} desplazamiento - Cero para el primer mes o uno para el siguiente.
 */
function crearCalendario(desplazamiento) {
  const mes = new Date(
    mesVisible.getFullYear(),
    mesVisible.getMonth() + desplazamiento,
    1
  );

  const anio = mes.getFullYear();
  const numeroMes = mes.getMonth();

  const titulo = mes.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  document.getElementById(`titulo-mes-${desplazamiento}`).innerText =
    titulo.charAt(0).toUpperCase() + titulo.slice(1);

  // Convierte el día inicial para que la semana comience en lunes.
  const inicio = (mes.getDay() + 6) % 7;

  const cantidadDias = new Date(anio, numeroMes + 1, 0).getDate();

  let contenido = "";

  diasSemana.forEach((dia) => {
    contenido += `<span class="dia-semana">${dia}</span>`;
  });

  // Deja espacios antes del primer día del mes.
  for (let espacio = 0; espacio < inicio; espacio++) {
    contenido += '<span aria-hidden="true"></span>';
  }

  for (let dia = 1; dia <= cantidadDias; dia++) {
    const fecha = new Date(anio, numeroMes, dia);

    const seleccionada =
      (fechaIda !== null && fecha.getTime() === fechaIda.getTime()) ||
      (fechaVuelta !== null && fecha.getTime() === fechaVuelta.getTime());

    const enRango =
      fechaIda !== null &&
      fechaVuelta !== null &&
      fecha > fechaIda &&
      fecha < fechaVuelta;

    let clases = "btn dia rounded-circle ";

    if (seleccionada) {
      clases += "btn-primary";
    } else if (enRango) {
      clases += "en-rango";
    } else {
      clases += "btn-outline-light text-secondary";
    }

    contenido += `
      <button
        type="button"
        class="${clases}"
        onclick="seleccionarFecha(${anio}, ${numeroMes}, ${dia})"
        aria-label="${formatearFecha(fecha)}"
        aria-pressed="${seleccionada}"
        ${fecha < hoy ? "disabled" : ""}
      >
        ${dia}
      </button>
    `;
  }

  document.getElementById(
    `calendario-${desplazamiento}`
  ).innerHTML = contenido;
}

/**
 * Descripción: Cambia el mes inicial que aparece en el selector.
 * @method cambiarMes
 * @param {number} cambio - Cantidad de meses que se avanza o retrocede.
 */
function cambiarMes(cambio) {
  mesVisible = new Date(
    mesVisible.getFullYear(),
    mesVisible.getMonth() + cambio,
    1
  );

  mostrarCalendarios();
}

/**
 * Descripción: Selecciona la ida y luego la vuelta.
 * Si se elige una fecha anterior a la ida o ya había un viaje completo,
 * comienza una nueva selección.
 * @method seleccionarFecha
 * @param {number} anio - El año seleccionado.
 * @param {number} mes - El mes seleccionado, de cero a once.
 * @param {number} dia - El día seleccionado.
 */
function seleccionarFecha(anio, mes, dia) {
  const fecha = new Date(anio, mes, dia);

  if (fecha < hoy) {
    return;
  }

  if (!fechaIda || fechaVuelta || fecha < fechaIda) {
    fechaIda = fecha;
    fechaVuelta = null;
  } else {
    fechaVuelta = fecha;
  }

  mostrarCalendarios();
}

/**
 * Descripción: Guarda las fechas seleccionadas durante la sesión
 * de la página, muestra el resumen y cierra el selector.
 * @method guardarSeleccion
 */
function guardarSeleccion() {
  if (!fechaIda || !fechaVuelta) {
    return;
  }

  idaGuardada = fechaIda;
  vueltaGuardada = fechaVuelta;

  document.getElementById("selector-fechas").innerText =
    `${formatearFecha(idaGuardada)} — ${formatearFecha(vueltaGuardada)}`;

  document.getElementById("resumen-vuelo").innerText =
    `Ida: ${formatearFecha(idaGuardada)}. ` +
    `Vuelta: ${formatearFecha(vueltaGuardada)}.`;

  cerrarSelector();
}

/**
 * Descripción: Descarta los cambios y recupera las últimas fechas guardadas.
 * @method cancelarSeleccion
 */
function cancelarSeleccion() {
  fechaIda = idaGuardada;
  fechaVuelta = vueltaGuardada;

  mostrarCalendarios();
  cerrarSelector();
}

/**
 * Descripción: Cierra el desplegable mediante Bootstrap.
 * @method cerrarSelector
 */
function cerrarSelector() {
  const boton = document.getElementById("selector-fechas");

  bootstrap.Dropdown.getOrCreateInstance(boton).hide();
}