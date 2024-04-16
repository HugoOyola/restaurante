let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};

const categorias = {
  1: "Comida",
  2: "Bebida",
  3: "Postre",
};

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;

  // Revisar si campos están vacíos
  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    // Verificar si ya existe una alerta
    const existeAlerta = document.querySelector(".invalid-feedback");

    if (!existeAlerta) {
      const alerta = document.createElement("DIV");
      alerta.classList.add("invalid-feedback", "d-block", "text-center");
      alerta.textContent = "Todos los campos son obligatorios";
      document.querySelector(".modal-body form").appendChild(alerta);

      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }
    return;
  }

  // Asignar datos del formulario al cliente.
  cliente = { ...cliente, mesa, hora };

  // Ocultar modal
  const modalFormulario = document.querySelector("#formulario");
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBootstrap.hide();

  // Mostrar secciones
  mostrarSecciones();

  // Obtener platillos de la API de JSON Server
  obtenerPlatillos();
}

function mostrarSecciones() {
  const seccionesOcultar = document.querySelectorAll(".d-none");
  seccionesOcultar.forEach((seccion) => seccion.classList.remove("d-none"));
}

function obtenerPlatillos() {
  const url = "http://localhost:4000/platillos";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => mostrarPlatillos(resultado))
    .catch((error) => console.log(error));
}

function mostrarPlatillos(platillos) {
  const contenido = document.querySelector("#platillos .contenido");

  platillos.forEach((platillo) => {
    const row = document.createElement("DIV");
    row.classList.add("row", "py-3", "border-top");

    const nombre = document.createElement("DIV");
    nombre.classList.add("col-4");
    nombre.textContent = platillo.nombre;

    const precio = document.createElement("DIV");
    precio.classList.add("col-3", "fw-bold");
    precio.textContent = `S/. ${platillo.precio}`;

    const categoria = document.createElement("DIV");
    categoria.classList.add("col-3");
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement("INPUT");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add("form-control", "col-2");

    // Funcion que detecta la cantidad de platillos que se esta agregando
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      console.log(cantidad);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregar = document.createElement("DIV");
    agregar.classList.add("col-2");
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);

    contenido.appendChild(row);
  });
}

function agregarPlatillo(producto) {
  console.log(producto);
}