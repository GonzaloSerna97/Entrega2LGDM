//creamos el array que contendrá las preguntas
const preguntas = [
    {
        pregunta: "¿Quién fue la primera mujer en ganar un Premio Nobel?",
        respuestas: [
            {text: "Marie Curie", correcta: true }, 
            {text: "Irène Joliot-Curie", correcta: false },
            {text: "Gerty Cori", correcta: false },
            {text: "Andrea Ghez", correcta: false },
        ]
    },
    {
        pregunta: "¿Qué parte del átomo no tiene carga eléctrica?",
        respuestas: [
            {text: "Núcleo", correcta: false }, 
            {text: "Protón", correcta: false },
            {text: "Neutrón", correcta: true },
            {text: "Electrón", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál es el símbolo del potasio?",
        respuestas: [
            {text: "P", correcta: false }, 
            {text: "As", correcta: false },
            {text: "Ag", correcta: false },
            {text: "K", correcta: true },
        ]
    },
    {
        pregunta: "¿E=mc2 es la fórmula de qué ecuación teórica?",
        respuestas: [
            {text: "Primera Ley de Kepler", correcta: false }, 
            {text: "Ley de la Gravedad", correcta: false },
            {text: "Teoría de la Relatividad", correcta: true },
            {text: "Segunda Ley de la Termodinámica", correcta: false },
        ]
    },
    {
        pregunta: "¿Cuál es el mineral más duro de la naturaleza?",
        respuestas: [
            {text: "Cuarzo", correcta: false }, 
            {text: "Carbón", correcta: false },
            {text: "Diamante", correcta: true },
            {text: "Oro", correcta: false },
        ]
    }
];
//añadimos las variables para almacenar los datos del array
const elementoPregunta = document.getElementById("pregunta");
const botonRespuesta = document.getElementById("botones-respuesta");
const botonSiguiente = document.getElementById("next-btn");

//variables para guardar el número de pregunta y el resultado del quiz
let contadorPreguntas = 0;
let resultadoQuiz = 0;

//creamos la funcion que inicia el juego
function empezarJuego(){
    contadorPreguntas = 0;
    resultadoQuiz = 0;
    botonSiguiente.innerHTML = "Siguiente";
    mostrarPregunta();
}
//funcion que va mostrando las preguntas
function mostrarPregunta(){
    empezarDeNuevo();

    let preguntaActual = preguntas[contadorPreguntas];//la pregunta actual es la pregunta en la ubicacion del array en la posicion del contador de preguntas
    let numPregunta = contadorPreguntas + 1; //actualizamos la variable contador de preguntas
    elementoPregunta.innerHTML = numPregunta + ". " + preguntaActual.pregunta;//imprimimos nº de pregunta. + el texto de la pregunta

    preguntaActual.respuestas.forEach(respuesta => {//llamada al texto de las respuestas
        const button = document.createElement("button");//creamos un boton y lo guardamos en la variable button
        button.innerHTML = respuesta.text;//añadimos el texto a un boton
        button.classList.add("btn");//añadimos el botón a la clase btn del html
        botonRespuesta.appendChild(button);//agregamos la info al botón
        if(respuesta.correcta){
            button.dataset.correcta = respuesta.correcta;
        }
        button.addEventListener("click", seleccionarRespuesta);
    });
}
function empezarDeNuevo(){
    //para eliminar las respuestas anteriores
    botonSiguiente.style.display = "none";
    while(botonRespuesta.firstChild){
        botonRespuesta.removeChild(botonRespuesta.firstChild);
    }
}

function seleccionarRespuesta(e){//comprobamos si la eleccion es correcta o incorrecta
    const botonSeleccionado = e.target;
    const esCorrecta = botonSeleccionado.dataset.correcta == "true";
    if (esCorrecta){
        botonSeleccionado.classList.add("correcta");
        resultadoQuiz++;//incrementamos en uno el resultado si es correcta
    }else{
        botonSeleccionado.classList.add("incorrecta");
    }
    Array.from(botonRespuesta.children).forEach(button => {//cuando hagamos click en una opcion, sea correcta o incorrecta, la ocpión correcta se pondrá verde
        if(button.dataset.correcta === "true"){
            button.classList.add("correcta");
        }else{
            button.classList.add("incorrecta");
        }
        button.disabled = true;//luego desabilitaremos el botón para no poder hacer más clicks
    });
    botonSiguiente.style.display = "block";
}

function mostrarResultado(){
    empezarDeNuevo();
    elementoPregunta.innerHTML = `Tu resultado es de ${resultadoQuiz} sobre ${preguntas.length}`;//mostramos el resultado
    botonSiguiente.innerHTML = "Jugar de nuevo";
    botonSiguiente.style.display = "block";
}

function darSiguiente(){
    contadorPreguntas++;//al clicar en siguiente, incrementamos el numero de la pregunta
    if(contadorPreguntas < preguntas.length){//si hay mas preguntas, irá a la siguiente. Sino, mostramos el resultado
        mostrarPregunta();
    }else{
        mostrarResultado();
    }
}

botonSiguiente.addEventListener("click", () =>{
    if(contadorPreguntas<preguntas.length){
        darSiguiente();
    }else{
        empezarJuego();
    }
} )

empezarJuego();