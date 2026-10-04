const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-pie.webp",
  },
];

/**
 * Descripción: Muestra un modal con información del producto seleccionado.
 * @method mostrarModal
 * @param {number} num - El índice del producto seleccionado en el arreglo de productos.
 */
function mostrarModal(num) {
  document.getElementById("nombre-producto").innerText =
    productos[num].nombre;

  document.getElementById("descripcion-producto").innerText =
    productos[num].description;

  document.getElementById("modal").style.display = "block";
}

/**
 * Descripción: Cierra el modal con información del producto.
 * @method cerrarModal
 */
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

/**
 * Descripción: Muestra el catálogo con botones para consultar
 * los detalles y agregar productos al carrito.
 * @method mostrarCatalogo
 */
function mostrarCatalogo() {
  let contenido = "";

  productos.forEach((producto, id) => {
    contenido += `
      <div>
        <img
          src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
          alt="${producto.nombre}"
        >

        <h3>${producto.nombre}</h3>

        <button
          type="button"
          onclick="mostrarModal(${id})"
        >
          Ver detalle de Producto
        </button>

        <button
          type="button"
          onclick="agregarAlCarrito(${id})"
        >
          Agregar al Carrito
        </button>
      </div>
    `;
  });

  document.getElementById("catalogo").innerHTML = contenido;
}

/**
 * Descripción: Obtiene el carrito almacenado en localStorage.
 * Si no existe, devuelve un arreglo vacío.
 * @method obtenerCarrito
 * @returns {number[]} Arreglo con los índices de los productos del carrito.
 */
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

/**
 * Descripción: Agrega un producto al carrito de compras
 * y guarda los cambios en localStorage.
 * @method agregarAlCarrito
 * @param {number} num - El índice del producto seleccionado en el arreglo de productos.
 */
function agregarAlCarrito(num) {
  const carrito = obtenerCarrito();

  carrito.push(num);

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 * Descripción: Muestra los productos del carrito con un botón
 * para eliminar cada elemento. Si está vacío, muestra un mensaje.
 * @method mostrarCarrito
 */
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  let contenido = "";

  carrito.forEach((num, posicion) => {
    const producto = productos[num];

    contenido += `
      <div>
        <img
          src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
          alt="${producto.nombre}"
        >

        <h3>${producto.nombre}</h3>

        <p>${producto.description}</p>

        <p>Precio: $${producto.precio}</p>

        <button
          type="button"
          onclick="eliminarProducto(${posicion})"
        >
          Eliminar producto
        </button>
      </div>
    `;
  });

  document.getElementById("carrito").innerHTML =
    contenido || "<p>No hay productos en el carrito.</p>";
}

/**
 * Descripción: Vacía el carrito eliminándolo de localStorage
 * y actualiza su visualización.
 * @method vaciarCarrito
 */
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

/**
 * Descripción: Elimina un elemento según su posición dentro del carrito,
 * guarda los cambios y actualiza su visualización.
 * @method eliminarProducto
 * @param {number} posicion - La posición del elemento que se eliminará del carrito.
 */
function eliminarProducto(posicion) {
  const carrito = obtenerCarrito();

  carrito.splice(posicion, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}