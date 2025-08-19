let num_relojes = 0;

// Cuando se haya renderizado todo el documento, que ejecute iniciar
$("document").ready(iniciar);

function iniciar(){
    // cargar las ciudades de las cuales podemos saber la hora
    let ciudades=data_ciudades;

    // Renderizamos la hora local cada segundo
    setInterval(() => {
        $("#horaLocal").val((new Date).toLocaleTimeString());           
    }, 1000);

    // Cargar el combo de ciudades
    cargar_ciudades(ciudades);

    // Agregar listeners para seleccion de elementos
    $("#sel-ciudades option").click(function(){
       if (num_relojes > 3){
          alert("No puede añadir más relojes. Debe eliminar antes uno de los existentes.");
       }else{
          agregar_reloj(this.value, this.text);
          // Agregamos listener al ultimo reloj agregado para cerrar tarjeta
          $(".card-header button:last").click(eliminar_reloj);
       }
    });   
}

function cargar_ciudades(ciudades){
    for (let ciudad of ciudades){
        $("#sel-ciudades").append(`<option value="${ciudad.zona}">${ciudad.ciudad}</option>`)
    }
}

function agregar_reloj(zona, ciudad){
    // Incrementamos el número de relojes
    num_relojes++;   
    actualizar_clases_css();

    // Agregamos el nuevo reloj al card deck y ponemos la hora más grande
    $(".card-deck").append(`
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <h2 id="titleHora1" class="card-title col-10">${ciudad}</h2>
                    <button class="btn btn-outline-danger col-2" type="button">X</button>
                </div>
            </div>
            <div class="card-body">
                <p class="badge p-2 badge-success"></p>
            </div>
        </div>
    `);

    let tarjeta = $(".card-deck .card:last p");
    tarjeta.css("font-size","3em");

    //Renderizamos la hora cada segundo
    setInterval(() => {
        let formato = Intl.DateTimeFormat("es-ES",{
            timeZone: zona,
            timeStyle: "medium"
        });
        let hora = formato.format(new Date);

        tarjeta.text(hora);
        tarjeta.toggleClass("azul");    
    }, 1000);   
}

function eliminar_reloj(){
    // Decrementamos el número de relojes
    num_relojes--; 
     
    // eliminamos la tarjeta
    let tarjeta = this.closest(".card");
    tarjeta.remove();
    
    actualizar_clases_css();
}

function actualizar_clases_css(){
    //  Eliminamos las clases previas que pudiera haber
    $(".card-deck").removeClass("w-25 w-50 w-75 w-100");

    switch (num_relojes) {
        case 0:
        case 1:    
            $(".card-deck").addClass("w-25");   
            break;
        case 2:
            $(".card-deck").addClass("w-50");
            break;
        case 3:
            $(".card-deck").addClass("w-75");
            break;
        default:
            $(".card-deck").addClass("w-100");
            break;
    }
}