//Entrada y botón del DOM.
const salidaElement = document.getElementById('salida');
const botonElement = document.getElementById('boton');

// Saludo con el nombre del usuario.
function preguntarNombre() {
  salidaElement.textContent = '¡Hola! ¿Cuál es tu nombre?';
  botonElement.addEventListener('click', saludar);
}
//Función captar nombre de usuaß
function saludar() {
  const nombre = document.getElementById('entrada').value.trim();
  if (nombre !== '') {
    salidaElement.textContent = `¡Hola ${nombre}! Bienvenido a Dime que Sí.`;
    guardarNombre(nombre);
    preguntarCompra();
  } else {
    salidaElement.textContent = 'Por favor, ingresa tu nombre.';
  }
}
// Función para realizar cotización o compra y evento clic.
function preguntarCompra() {
  salidaElement.textContent = '¿Deseas comprar algo? (Responde "si" o "no")';
  botonElement.removeEventListener('click', saludar);
  botonElement.addEventListener('click', responderCompra);
}
// Función para pedir al usuario que elija la cantidad de cintas para el ramo. Se usa toLowerCase para que sea la pregunta se adapte a mayúsculas y minúsculas.
function responderCompra() {
  const respuesta = document.getElementById('entrada').value.trim().toLowerCase();
  if (respuesta === 'si') {
    preguntarCantidad();
  } else if (respuesta === 'no') {
    salidaElement.textContent = `Muchas gracias por visitar Fiestissima .COM. ¡Hasta pronto!`;
  } else {
    salidaElement.textContent = '¡Detectamos un error! Los datos fueron mal ingresados. Te pedimos por favor intentarlo nuevamente.';
  }
}
// Función para captar respuesta de las opciones de compra.
function preguntarCantidad() {
  salidaElement.textContent = `Elige cuántos combos deseas para tu Fiesta!!:
    ☼ 15 combos
    ☼ 20 combos
    ☼ 30 combos
    ☼ 40 combos
    ☼ más de 50 combos`;
  botonElement.removeEventListener('click', responderCompra);
  botonElement.addEventListener('click', calcularCotizacion);
}

// Función para realizar operaciones y find.
function calcularCotizacion() {
  const cantidad = document.getElementById('entrada').value.trim();
  const opciones = [
    { nombre: '15 combos', operacion: 0.2 },
    { nombre: '20 combos', operacion: 0.25 },
    { nombre: '30 combos', operacion: 0.3 },
    { nombre: '40 combos', operacion: 0.35 },
    { nombre: 'más de 50 combos', operacion: 0.4 }
  ];
  const opcionValida = opciones.find((opcion) => opcion.nombre === cantidad);
  if (opcionValida) {
    const precio = 25000;
    const total = calcularTotal(precio, opcionValida.operacion);
    const totalConIVA = calcularTotalConIVA(total);
    salidaElement.textContent = `El total a pagar (incluyendo IVA) es de: $${totalConIVA.toFixed(2)}`;
  } else {
    salidaElement.textContent = '¡Detectamos un error! Los datos fueron mal ingresados. Te pedimos por favor intentarlo nuevamente.';
  }
}

function calcularTotal(precio, porcentaje) {
  return precio + (precio * porcentaje);
}

function calcularTotalConIVA(total) {
  return total * 1.21;
}

// localStorge guarda datos de usuario e intensión de compra
function guardarNombre(nombre) {
  localStorage.setItem('nombre', nombre);
}

function obtenerNombre() {
  return localStorage.getItem('nombre');
}

function iniciarSesion() {
  const nombreGuardado = obtenerNombre();
  if (nombreGuardado) {
    salidaElement.textContent = `¡Hola ${nombreGuardado}! Bienvenido nuevamente a Fiestissima .COM`;
    preguntarCompra();
  } else {
    preguntarNombre();
  }
}

iniciarSesion();