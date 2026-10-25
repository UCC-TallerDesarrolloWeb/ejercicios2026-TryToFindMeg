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
 * Descripción: Filtra los productos por texto, rango de precios, marca
 * y categoría. Aplica el orden seleccionado, muestra los precios
 * formateados y actualiza el contador del carrito.
 * @method mostrarCatalogo
 */
function mostrarCatalogo() {
  const busqueda = document.getElementById("search")
    .value.trim().toLowerCase();

  const minimo = document.getElementById("price-min").value;
  const maximo = document.getElementById("price-max").value;
  const marca = document.getElementById("marca").value;

  // Obtiene las categorías seleccionadas.
  const categorias = Array.from(
    document.querySelectorAll('input[name="tipo"]:checked')
  ).map((checkbox) => checkbox.value);

  // Crea una copia y conserva el índice original de cada producto.
  // Así, ordenar el catálogo no cambia las referencias del carrito.
  const lista = productos.map((producto, id) => ({
    ...producto,
    id: id,
  }));

  const productosFiltrados = lista.filter((producto) => {
    const coincideTexto =
      producto.nombre.toLowerCase().includes(busqueda) ||
      producto.description.toLowerCase().includes(busqueda);

    const coincideMinimo =
      minimo === "" || producto.precio >= Number(minimo);

    const coincideMaximo =
      maximo === "" || producto.precio <= Number(maximo);

    const coincideMarca =
      marca === "" || producto.marca === marca;

    // Sin categorías seleccionadas, permite todas.
    const coincideCategoria =
      categorias.length === 0 ||
      categorias.includes(producto.categoria.toLowerCase());

    return (
      coincideTexto &&
      coincideMinimo &&
      coincideMaximo &&
      coincideMarca &&
      coincideCategoria
    );
  });

  // Ordena los productos que cumplen los filtros.
  const productosOrdenados = ordenarCatalogo(productosFiltrados);

  let contenido = "";

  productosOrdenados.forEach((producto) => {
    contenido += `
      <div>
        <img
          src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
          alt="${producto.nombre}"
        >

        <h3>${producto.nombre}</h3>
        <p>Marca: ${producto.marca}</p>
        <p>Precio: ${formatearPrecio(producto.precio)}</p>

        <button
          type="button"
          onclick="mostrarModal(${producto.id})"
        >
          Ver detalle de Producto
        </button>

        <button
          type="button"
          onclick="agregarAlCarrito(${producto.id})"
        >
          Agregar al Carrito
        </button>
      </div>
    `;
  });

  document.getElementById("catalogo").innerHTML =
    contenido || "<p>No se encontraron productos con esos filtros.</p>";

  actualizarContador();
}

/**
 * Descripción: Ordena la lista recibida por precio o nombre según
 * la opción seleccionada. Si no se selecciona un orden, conserva la lista.
 * @method ordenarCatalogo
 * @param {Object[]} lista - La lista de productos filtrados que se ordenará.
 * @returns {Object[]} La lista de productos ordenada.
 */
function ordenarCatalogo(lista) {
  const orden = document.getElementById("orden").value;

  switch (orden) {
    case "precio-asc":
      lista.sort((a, b) => a.precio - b.precio);
      break;

    case "precio-desc":
      lista.sort((a, b) => b.precio - a.precio);
      break;

    case "nombre-asc":
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      break;

    case "nombre-desc":
      lista.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
      break;
  }

  return lista;
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
 * Descripción: Agrega una unidad del producto al carrito de compras,
 * guarda los cambios en localStorage y actualiza el contador.
 * @method agregarAlCarrito
 * @param {number} num - El índice del producto seleccionado en el arreglo de productos.
 */
function agregarAlCarrito(num) {
  const carrito = obtenerCarrito();

  carrito.push(num);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContador();
}

/**
 * Descripción: Agrupa los productos del carrito y muestra el precio unitario,
 * la cantidad y el subtotal de cada producto. Calcula el total a pagar
 * y actualiza los contadores de unidades.
 * @method mostrarCarrito
 */
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const cantidades = {};

  let contenido = "";
  let total = 0;

  // Cuenta cuántas unidades hay de cada producto.
  carrito.forEach((num) => {
    cantidades[num] = (cantidades[num] || 0) + 1;
  });

  // Genera una tarjeta por cada producto diferente.
  Object.keys(cantidades).forEach((clave) => {
    const num = Number(clave);
    const producto = productos[num];
    const cantidad = cantidades[num];
    const subtotal = producto.precio * cantidad;

    total += subtotal;

    contenido += `
      <div>
        <img
          src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
          alt="${producto.nombre}"
        >

        <h3>${producto.nombre}</h3>

        <p>${producto.description}</p>

        <p>Precio unitario: ${formatearPrecio(producto.precio)}</p>
        <p>Cantidad: ${cantidad}</p>
        <p>Subtotal: ${formatearPrecio(subtotal)}</p>

        <button
          type="button"
          onclick="eliminarProducto(${num})"
        >
          Eliminar una unidad
        </button>
      </div>
    `;
  });

  document.getElementById("carrito").innerHTML =
    contenido || "<p>No hay productos en el carrito.</p>";

  document.getElementById("cantidad-total").innerText =
    carrito.length;

  document.getElementById("total-pagar").innerText =
    formatearPrecio(total);

  actualizarContador();
}

/**
 * Descripción: Vacía el carrito eliminándolo de localStorage
 * y actualiza los productos, las cantidades y el total mostrado.
 * @method vaciarCarrito
 */
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

/**
 * Descripción: Elimina una unidad del producto seleccionado del carrito,
 * guarda los cambios y actualiza los productos, las cantidades y el total.
 * @method eliminarProducto
 * @param {number} num - El índice del producto seleccionado en el arreglo de productos.
 */
function eliminarProducto(num) {
  const carrito = obtenerCarrito();

  // Busca una unidad del producto dentro del carrito.
  const posicion = carrito.indexOf(num);

  if (posicion !== -1) {
    carrito.splice(posicion, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

/**
 * Descripción: Formatea un precio en pesos argentinos con separadores
 * de miles y dos decimales.
 * @method formatearPrecio
 * @param {number} precio - El precio que se desea formatear.
 * @returns {string} El precio formateado en pesos argentinos.
 */
function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);
}

/**
 * Descripción: Actualiza el contador del enlace al carrito con la cantidad
 * total de unidades almacenadas.
 * @method actualizarContador
 */
function actualizarContador() {
  const contador = document.getElementById("cantidad-carrito");

  if (contador) {
    contador.innerText = obtenerCarrito().length;
  }
}