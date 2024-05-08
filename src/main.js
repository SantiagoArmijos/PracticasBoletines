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
            <h5>Respuesta</h5>
            <div id="repuesta_${i+1}" class="mt-2 text-center border rounded p-3" style="display: none;"></div>
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
    let tipoPregunta = document.querySelector('#tipoPregunta');
    const om_region = document.querySelector('#om_region');
    
    const pregunta = listaPreguntas.find(pregunta => pregunta.id === parseInt(id));
    preguntaHTML.value = '';
    // Verificamos si ya hay un evento de clic adjuntado al botón
    if (btn_grabar_pregunta.clickHandler) {
        btn_grabar_pregunta.removeEventListener('click', btn_grabar_pregunta.clickHandler);
    }
    var seccion1 = document.createElement("section");

    tipoPregunta.addEventListener('change', function() {
        let seleccionado = tipoPregunta.value;
        if (tipoPregunta.value === 'om'){
            om_region.style.display = 'block';
            om_region.appendChild(seccion1);
        }else{
            om_region.style.display = 'none';
        }
    });

    btn_grabar_pregunta.clickHandler = function() {
        // Modificamos la pregunta cuando se hace clic en el botón
        pregunta.pregunta = preguntaHTML.value;
        pregunta.tipo = tipoPregunta.value;
        preguntaEdit.innerText = pregunta.pregunta;
        agregarRespuesta(pregunta.tipo, id);
    };
    btn_grabar_pregunta.addEventListener('click', btn_grabar_pregunta.clickHandler);
}

//Función para agregar la zona de respuesta
function agregarRespuesta(tipo, id){
    var contenedorRespuesta = document.querySelector(`#repuesta_${id}`);
    const pregunta = listaPreguntas.find(pregunta => pregunta.id === parseInt(id));
    const unaRespuesta = document.querySelector('#una_respuesta');
    const variasRespuestas = document.querySelector('#varias_respuestas');
    contenedorRespuesta.style.display = "block";
    contenedorRespuesta.innerHTML = "";
    var seccion = document.createElement("section");
    switch (tipo) {
        case 'pt':
            seccion.innerHTML = `
                <input type="text" class="form-control mb-3" placeholder="Escriba su respuesta">
            `;
            contenedorRespuesta.appendChild(seccion);
            break;
        case 'vf':
            seccion.innerHTML = `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="respuesta" id="verdadero" value="verdadero">
                    <label class="form-check-label" for="verdadero">Verdadero</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="respuesta" id="falso" value="falso">
                    <label class="form-check-label" for="falso">Falso</label>
                </div>
            `;
            contenedorRespuesta.appendChild(seccion);
            break;
        case 'om':
            if (unaRespuesta.checked) {
                seccion.innerHTML = `
                    <div id="contenedor_una_respuesta">
                        <div class="d-flex">
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="opcion" id="una_respuesta" checked>
                        </div>
                        <input type="text" id="input_texto">
                        </div>
                        
                    </div>
                `;
                contenedorRespuesta.appendChild(seccion);
            }
            if (variasRespuestas.checked) {
                seccion.innerHTML = `<h1>A</h1>`;
                contenedorRespuesta.appendChild(seccion);
            }
            //agregarOpcion(pregunta);
            break;        
    }
}

//Funcion para agregar opciones a las pe¿reguntas de opcion múltiple
function agregarOpcion (pregutna){
    let contenedor_om = document.querySelector('#contenedor_om');
    contenedor_om.style.display = "block";
    let opcion = document.createElement("section");
}