const html= document.querySelector('html')//seleccionamos los elementos a editar
const Des_corto= document.querySelector('.app__card-button--corto')//seleccionamos los elementos a editar
const Enfoque= document.querySelector('.app__card-button--enfoque')//seleccionamos los elementos a editar
const Des_largo= document.querySelector('.app__card-button--largo')//seleccionamos los elementos a editar
const imagen= document.querySelector('.app__section-banner-container .app__image')
const titulo= document.querySelector('.app__title')
const botones= document.querySelectorAll('.app__card-button')
const Playmusica= document.getElementById('alternar-musica')
const BtnInicio= document.getElementById('start-pause')
const Textoiniciopausa= document.querySelector('#start-pause span')
const contenedorTime= document.getElementById('timer')
const infoPodomoro= document.querySelector('.container_inf')
const botonAceptar= document.querySelector('.Aceptar')
const audio = new Audio('./sonidos/luna-rise-part-one.mp3') // forma de seleccionar las musicas que se van a reproducir. Crea un objeto audio pero aque en el mismo java
const AudioInicio= new Audio('./sonidos/play.wav')
const SonidoPausa= new Audio('./sonidos/pause.mp3')
const Tiempolimite= new Audio('./sonidos/beep.mp3') 
const imageniniciopausa= document.querySelector('#start-pause img')
const cuerpo= document.querySelector('body')


const contenedor= infoPodomoro.parentNode;

botonAceptar.onclick= function(){

    contenedor.removeChild(infoPodomoro)
}


let Tiempo_trascurrido= 1500;// tiempo en segundos osea 25min
let idIntervalo= null



    audio.loop= true; //la musica se repetira una y otra vez a menos que se desactive

Playmusica.addEventListener('change', ()=>{
    if(audio.paused){
        audio.play()
    }else{
        audio.pause()
    }
})


    //creamos los eventos a los elementos seleccionados junto con las funciones que los ejecutan (arown funtion)
Des_corto.addEventListener('click',()=>{
    Tiempo_trascurrido= 300;
    Cambiarcontexto('descanso-corto')
    Des_corto.classList.add('active')
    
    
} )

Enfoque.addEventListener('click', ()=>{
    Tiempo_trascurrido= 1500;
    Cambiarcontexto('enfoque')
    Enfoque.classList.add('active')
    
})    

Des_largo.onclick= function (){
    Tiempo_trascurrido=900;
    Cambiarcontexto('descanso-largo')
    Des_largo.classList.add('active')
    


}

                                //el contexto que recibe puede ser 'descanso-corto', 'descanso-largo', 'enfoque' que son las clases que hacen los cambios de imagen y color en css
    function Cambiarcontexto(contexto){
        mostrarTiempo();
                    //forEach funciona como un bucle que recorre todos los botones con el contexto que se les esta pasando como parte de la node litsa que crea el document.queryselectorAll
        botones.forEach(function(contexto){
                //cuando le escribimos contexto accede a esta parte del html: <button data-contexto="enfoque" class="app__card-button app__card-button--enfoque active">Enfoque</button> y quita el active que ya le halla puesto una funcion
            contexto.classList.remove('active')
        })
                //con el setattribute sustituimos los atributos de los elementos html 
        html.setAttribute('data-contexto',contexto)
        imagen.setAttribute('src',`/img/${contexto}.png` )
        
        


        switch (contexto) {
                //sustituimos el texto segun el boton que se presone como contexto que se le pasa y el innerHTML inserta el nuevo
            case "enfoque": titulo.innerHTML =`
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
                
                break;

            case "descanso-largo":
                titulo.innerHTML =`
            Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`
                
                break;
                
            case "descanso-corto":
                titulo.innerHTML=`
                ¿Qué tal tomar un respiro? 
                    <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
                
                break;
        
            default:
                break;
        }


    }

   const cuentaRegresiva= ()=>{
                        // InicioPausa();
          if(Tiempo_trascurrido <= 0){ //cunado el contador llega a 0 llama automaticamente a la funcion reiniciar lo cual con clearinterval detiene el flujo del setinterval
            Reiniciar(); 
            Tiempolimite.play();
            return;
          }
                            
        Tiempo_trascurrido -= 1 //va descontale 1Seg a la variable que esta establecida en 1500 o 300 o 900 segun sea el caso
        console.log("tiempo"+ Tiempo_trascurrido);
        imageniniciopausa.setAttribute('src','/img/pause.png')
        Textoiniciopausa.textContent= "pausar"  //la funcionalidad texContent solo recibe texto a diferencia de innerHTML que recibe las etiquetas html y los template stream
        mostrarTiempo()
        
   }
    
BtnInicio.addEventListener('click' ,InicioPausa,)



function InicioPausa(){  //esta funcion logra que se ejecute cada 1seg la funcion cuentaRegresiva
    if (idIntervalo){ //la condicion verifica si la variable tiene algun valor y si lo tiene interrunpe el flujo con el reuturn si no sigue llamando a la funcion cada segundo con el set interval
        Reiniciar();  //ahora bien si se presiona btninicio otravez que llama a esta funcion el if dectetara que hay valor en idintervalo al pasar al if los valores que ya se estan guardando en la variable que llama a una funcion cada segundo y detendra el flujo con el retunr
       SonidoPausa.play();
        return;         //a su vez se activa la funcion reiniciar que con clearintervalo detiene el setintervalo y lee que la variable esta en null osea no tiene valor y por tanto da paso al flujo del set intervalo cuando se vuelve a presionar el boton
    }
    AudioInicio.play();
    idIntervalo = setInterval(cuentaRegresiva,1000) //los tiempos en  javascript se manejan en milisegundo 1000milseg = 1seg 
}


function Reiniciar(){
    clearInterval(idIntervalo)// detiene el setinterval y por tanto la funcion cuentaRegresiva
    idIntervalo = null 
    Textoiniciopausa.textContent= "comenzar"
    imageniniciopausa.setAttribute('src','/img/play_arrow.png')
}


function mostrarTiempo(){
    const tiempo = new Date(Tiempo_trascurrido * 1000) //creamos un objeto Date donde le pasamos el valor de la variable tiempo_trascurrido = 1500 y lo multiplicamos por 1000 para llevarlos a 1.500.000 milisegundos que son 25min
    const tiempoFormato = tiempo.toLocaleTimeString('es-MX',{minute: '2-digit',second: '2-digit'}) //creamos una variable que guarde el cambio de formato de tiempo. Formateamos el tiempo con la funcionalidad .toLocaleTimeString en los parentesis seleccionamos la zona horaria y como se presentaran los numeros 
    contenedorTime.innerHTML= `${tiempoFormato}`
    contenedorTime.style.fontSize= '8rem'
}






mostrarTiempo(); // llamamos esta funcion fuera para que siempre se vea el tiempo en pantalla aun que aun no se haya comenzado 
// Des_corto.addEventListener('click', () => {

//     html.setAttribute('data-contexto','descanso-corto')
//     imagen.setAttribute('src','/imagenes/descanso-corto.png')
// })


// Enfoque.addEventListener('click', ()=> {

//     html.setAttribute('data-contexto','enfoque')
//     imagen.setAttribute('src','/imagenes/enfoque.png')
// })

// Des_largo.onclick = function (){ //funciona igual que el addEnventListener

//     html.setAttribute('data-contexto','descanso-largo')
//     imagen.setAttribute('src','/imagenes/descanso-largo.png')
// }
