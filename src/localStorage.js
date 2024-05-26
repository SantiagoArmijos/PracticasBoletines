const btn_add_persona = document.querySelector('#btn_add_persona');
const btn_recuperar_persona = document.querySelector('#btn_recuperar_persona');

btn_add_persona.addEventListener('click', ()=>{
    // Obtener valores de los campos
    const nombre = document.querySelector('#nombre_persona').value;
    const cedula = document.querySelector('#cedula_persona').value;
    const nacimiento = document.querySelector('#nacimiento_persona').value;
    const direccion = document.querySelector('#direccion_persona').value;
    const email = document.querySelector('#email_persona').value;
    const sexo = document.querySelector('input[name="sexo_persona"]:checked');

    // Verificar que todos los campos estén completos
    if (nombre && cedula && nacimiento && direccion && email && sexo) {
        let sexo_valor = sexo.value;
        if (sexo_valor === 'M') {
            sexo_valor = "Masculino";
        }else if (sexo_valor === 'F') {
            sexo_valor = "Femenino";
        }else {
            sexo_valor = "Otro";
        }

        inf_tabla(nombre, cedula, nacimiento, sexo_valor, direccion, email);

        // Limpiar los campos del formulario
        document.querySelector('#nombre_persona').value = '';
        document.querySelector('#cedula_persona').value = '';
        document.querySelector('#nacimiento_persona').value = '';
        document.querySelector('#direccion_persona').value = '';
        document.querySelector('#email_persona').value = '';
        document.querySelectorAll('input[name="sexo_persona"]').forEach((input) => {
            input.checked = false;
        });

        //LocalStorage y JSON
        const persona = {
            nombre: nombre,
            cedula: cedula,
            nacimiento: nacimiento,
            sexo: sexo_valor,
            direccion: direccion,
            email: email
        };
        const personaJSON = JSON.stringify(persona);
        localStorage.setItem(persona+ Date.now(), personaJSON);

    } else {
        alert('Por favor, completa todos los campos.');
    }
});

btn_recuperar_persona.addEventListener('click', ()=>{
    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            const valor = localStorage.getItem(clave);
            // Verificar si el valor es un JSON válido
            let persona;
            try {
                persona = JSON.parse(valor);
            } catch (error) {
                console.error(`Error al parsear JSON para la clave "${clave}": ${error}`);
                continue;
            }
            inf_tabla(persona.nombre, persona.cedula, persona.nacimiento, persona.sexo, persona.direccion, persona.email);
        }
    }else{
        alert('No existe información en el localStorage');
    }
});

//Funciones
//Función para añadir información a la tabla
function inf_tabla(nombre, cedula, nacimiento, sexo, direccion, email) {
    const tabla = document.querySelector('#tabla_personas tbody');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${cedula}</td>
        <td>${nacimiento}</td>
        <td>${sexo}</td>
        <td>${direccion}</td>
        <td>${email}</td>
    `;
    tabla.appendChild(nuevaFila);
}