let numero_secciones = document.querySelector('#numero_secciones');
let btn_generar_seccion = document.querySelector('#btn_generar_seccion');

//Clases
class Pregunta {
    constructor(id, pregunta, tipo){
        this.id = id;
        this.pregunta = pregunta;
        this.tipo = tipo;
        this.listaOpcionMultiple = [];
    }
}

let listaPreguntas = [];

btn_generar_seccion.addEventListener('click', function(event){
    event.preventDefault(); 
    generarPreguntas(numero_secciones.value);
});

//Funciones
function generarPreguntas(numero) {
    var contenedorPadre = document.getElementById("contenedor_padre");
    contenedorPadre.style.display = "block";
    contenedorPadre.innerHTML = "";
    contenedorPadre.innerHTML = `<h2>Cuestionario</h2>`
    for (var i = 0; i < numero; i++) {
        //JS
        listaPreguntas.push(new Pregunta((i+1), "pregunta"+i+1, "null"));
        //HTML
        var seccion = document.createElement("section");
        seccion.classList.add("border", "rounded","p-3", "mb-3"); 
        seccion.id = "Pregunta" + (i+1);
        seccion.innerHTML = `
            <div class="cotainer d-flex m-2 align-items-center">
                <h5 id="pregunta_${i+1}" class="mb-3">Pregunta ${i+1}</h5>
                <button id="btn_editar_${i+1}" class="btn btn_editar mx-5"></button>
            </div>
            <input type="text" class="form-control mb-3" placeholder="Respuesta...">
        `;
        contenedorPadre.appendChild(seccion);
    }
    
    // Agregar un solo event listener para delegar los clics de los botones de edición
    contenedorPadre.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('btn_editar')) {
            var idBoton = event.target.id;
            var idPregunta = idBoton.split('_')[2];
            editarPregunta(idPregunta);
        }
    });
}

//Función para editar una pregunta
function editarPregunta(id){
    $('#modalEditarPregunta').modal('show');
    let btn_grabar_pregunta = document.querySelector('#btn_grabar_pregunta');
    let preguntaHTML = document.querySelector('#pregunta');
    let preguntaEdit = document.querySelector(`#pregunta_${id}`); // Seleccionar la pregunta específica con el ID recibido
    const pregunta = listaPreguntas.find(pregunta => pregunta.id === parseInt(id));
    preguntaHTML.value = '';
    // Verificamos si ya hay un evento de clic adjuntado al botón
    if (btn_grabar_pregunta.clickHandler) {
        btn_grabar_pregunta.removeEventListener('click', btn_grabar_pregunta.clickHandler);
    }
    btn_grabar_pregunta.clickHandler = function() {
        // Modificamos la pregunta cuando se hace clic en el botón
        pregunta.pregunta = preguntaHTML.value;
        preguntaEdit.innerText = pregunta.pregunta;
    };
    btn_grabar_pregunta.addEventListener('click', btn_grabar_pregunta.clickHandler);
}