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
    let i = 1;//Contador de clics
    switch (tipo) {
        case 'pt':
            seccion.innerHTML = `
                <input type="text" class="form-control mb-3" placeholder="Escriba su respuesta">
            `;
            contenedorRespuesta.appendChild(seccion);
            pregunta.tipo = 'pt';
            break;
        case 'vf':
            seccion.innerHTML = `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="respuesta_${id}" value="verdadero">
                    <label class="form-check-label">Verdadero</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="respuesta_${id}" value="falso">
                    <label class="form-check-label">Falso</label>
                </div>
            `;
            contenedorRespuesta.appendChild(seccion);
            pregunta.tipo = 'vf';
            break;
        case 'om':
            if (unaRespuesta.checked) {
                seccion.innerHTML = `
                <div id="contenedor_una_respuesta_${id}" class="position-relative">
                    <div class="d-flex">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="opcion_${id}" checked>
                        </div>
                        <input type="text" id="opcion_${i}">
                    </div>
                    <div class="d-flex mt-2 position-relative">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="opcion_${id}">
                        </div>
                        <input type="text" id="opcion_${i+1}">
                    </div>
                    <div class="d-flex mt-2 position-absolute top-0 end-0">
                        <button id="btn_agregar_opcion_${id}" type="button" class="btn btn_nuevo  mx-2">+</button>
                        <button id="btn_guardar_opcion_${id}" type="button" class="btn btn_nuevo  mx-2">Aceptar</button>
                    </div>
                </div>
                `;
                contenedorRespuesta.appendChild(seccion);
                const btnAgregarOpcion = seccion.querySelector(`#btn_agregar_opcion_${id}`);
                i=2;
                btnAgregarOpcion.addEventListener('click', () => {
                    // Incrementar el contador
                    i++;
                    // Crear los elementos de radio button y campo de texto
                    const nuevaOpcionDiv = document.createElement('div');
                    nuevaOpcionDiv.classList.add('d-flex', 'mt-2');
                    nuevaOpcionDiv.innerHTML = `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="opcion_${id}">
                        </div>
                        <input type="text" id="opcion_${i}">
                    `;
                    // Adjuntar la nueva opción debajo de las anteriores
                    seccion.appendChild(nuevaOpcionDiv);
                });
                pregunta.tipo = 'omu';   
                const btnGuardarOpcion = seccion.querySelector(`#btn_guardar_opcion_${id}`);
                btnGuardarOpcion.addEventListener('click', () => {
                    for (var j = 1; j <= i; j++) {
                        console.log(document.querySelector(`#opcion_${j}`).value);
                        pregunta.listaOpcionMultiple.push(seccion.querySelector(`#opcion_${j}`).value);
                    }
                });
            }
            if (variasRespuestas.checked) {
                i=1;
                seccion.innerHTML = `
                <div id="contenedor_una_respuesta_${id}" class="position-relative">
                    <div class="d-flex">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="opcionV_${id}" checked>
                        </div>
                        <input type="text" id="opcionV_${i}">
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="opcionV_${id}">
                        </div>
                        <input type="text" id="opcionV_${i+1}">
                    </div>
                    <div class="d-flex mt-2 position-absolute top-0 end-0">
                        <button id="btn_agregar_opcionV_${id}" type="button" class="btn btn_nuevo  mx-2">+</button>
                        <button id="btn_guardar_opcionV_${id}" type="button" class="btn btn_nuevo  mx-2">Aceptar</button>
                    </div>
                </div>
                `;
                contenedorRespuesta.appendChild(seccion);
                const btnAgregarOpcion = seccion.querySelector(`#btn_agregar_opcionV_${id}`);
                i=2;
                btnAgregarOpcion.addEventListener('click', () => {
                    // Incrementar el contador
                    i++;
                    // Crear los elementos de checkbox y campo de texto
                    const nuevaOpcionDiv = document.createElement('div');
                    nuevaOpcionDiv.classList.add('d-flex', 'mt-2');
                    nuevaOpcionDiv.innerHTML = `
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="opcionV__${id}">
                        </div>
                        <input type="text" id="opcionV_${i}">
                    `;
                    // Adjuntar la nueva opción debajo de las anteriores
                    seccion.appendChild(nuevaOpcionDiv);
                });
                pregunta.tipo = 'omv';
                const btnGuardarOpcion = seccion.querySelector(`#btn_guardar_opcionV_${id}`);
                btnGuardarOpcion.addEventListener('click', () => {
                    for (var j = 1; j <= i; j++) {
                        console.log(document.querySelector(`#opcionV_${j}`).value);
                        pregunta.listaOpcionMultiple.push(seccion.querySelector(`#opcionV_${j}`).value);
                    }
                });
            }
            break;        
    }
}

//Funcion para agregar opciones a las pe¿reguntas de opcion múltiple
function agregarOpcion (pregutna){
    let contenedor_om = document.querySelector('#contenedor_om');
    contenedor_om.style.display = "block";
    let opcion = document.createElement("section");
}