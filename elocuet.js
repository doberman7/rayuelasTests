$(document).ready(function(){
  //asignar filas a variable
  var $tableRows = $("tr");
  //variable global para determinar tamaño de tablero
  lengtH = 15
  //variable global para cachar el id de la casilla meta
  meta = ""
  //variable global para las teclas S y Ñ respectivamente
  teclaS = false;
  teclaÑ = false;

  jugador1Tirado = false
  jugador2Tirado = false
    // iterar en filas, k es el index de iteracion, tableRow es el value de cada iteracin
    $.each($tableRows,function(k,tableRow){
      //AGREGAR CASILLAS: td es el tableData, iniciando en 1, mientras sea menor o igual a 20, aumentar 1
      for (var tdN = 1; tdN <= lengtH; tdN++) {
        //anexar en cada fila un "td" con id="tdN"
        $(tableRow).append("<td id="+tdN+"></td>");
        //$(tableRow).append("<td id="+tdN+">fila: "+k+" id: "+tdN+"</td>");//
        //si el id del td creado es al lengtH -1, quiere decir que es el penultimo, entonces....
        if (tdN==lengtH - 1) {
          //agregar al td de cada jugador un fondo color blanco, este serà la meta
          $("#Player1 #"+tdN+"").css("border","solid white");
          $("#Player2 #"+tdN+"").css("border","solid white");
          //capturar numero de id de casilla meta
          meta = tdN
        }
      };
    });//-------------------------------------------

  //boton "jugar" inicia el juego
  $("#start_btn").bind(throwDices());
  //anexar boton reiniciar
  $(".table").prepend("<button id=restart_btn>Reiniciar</button><br>");
  //atar mentodo "restarGame" al boton con id=restart_btn
  $("#restart_btn").bind(restarGame());
  //atar evento "keydown" al metod creado llamando keyStop
  $(window).bind(keyStop());



});//------------------FIN DOCUMENT READY

//FUNCION PARA DETERMINAR GANADOR
function winerIs(tp1,tp2){
  // determinar que tan cerca se esta de la meta
  var p1Point = meta - parseInt(tp1);
  var p2Point = meta - parseInt(tp2);

  // si el p2 tiene un valor menor a p1 y mayor a -1 es el GANADOR
  if (p1Point > p2Point && p2Point > -1 ) {
      console.log("P2 GANA");
      //console.log("P1" + p1Point + "P2" + p2Point+ "");
    // si el p1 tiene un valor menor a p2 y mayor a -1 es el GANADOR
  } else if (p1Point < p2Point && p1Point > -1) {
    console.log("P1 GANA");
    //console.log("P1" + p1Point + "P2" + p2Point+ "");
    //si ambos comparten el mismo valor y son mayores a -1 es EMPATE
  } else if (p1Point == p2Point && p2Point > -1 && p1Point > -1) {
    console.log("P1" + p1Point + "P2" + p2Point+ "");
    //console.log("EMPATE");
    //si ambos son menores a -1 AMBOS PIERDEN
  } else if ( p2Point <= -1 && p1Point <= -1) {
    console.log("AMBOS PIERDEN");
    //console.log("P1" + p1Point + "P2" + p2Point+ "");
  };
};

//funcion para detener avance del metodo lanzar dado, basicamente asigna valores true a las variables globales teclaS y teclaÑ
function keyStop() {
  $(window).keydown(function (  ) {
    p1Index = 0
    p2Index = 0
    if (83 == event.keyCode) {
      teclaS = true;
      console.log(event.type+": "+ event.which);
    }else if ( 80 == event.keyCode){
      teclaÑ = true;
      console.log(event.type+": "+ event.which);
    }

  });

};

//crear funcion que recibe un jugador
function lanzarDado(player, lengtH) {
    //asignar variable que obtiene objeto con la clase active = CURRENT, remover la clase "active" de CURRENT
    var $current_player = $(player).find(".active").removeClass("active");
    //-asignar variable que obtiene el siguiente objeto a la clase active = NEXT, agregar clase "active" a NEXT
    $current_player.next().addClass("active");

    if (player == "#Player1" && teclaS == true){
      //console.log("Player1 terminado");
      //asignar el id de la ultima casilla con la clase active de P1
      tp1 = $("#Player1").find(".active").attr("id");
      jugador1Tirado = true
    }else if (player == "#Player2" && teclaÑ == true){
      //console.log("Player2 terminado");

      //asignar el id de la ultima casilla con la clase active de P2
      tp2 = $("#Player2").find(".active").attr("id");
      jugador2Tirado = true

    //si el largo del <tr id="Player1">  es mayor o igual la indice del <td class="active">
    }else if (lengtH -1 >= $($current_player).index()){
        //establecer tiempo de ejecucion de lanzar el dado
        setTimeout(function() {
          lanzarDado(player, lengtH);
        },30);
    };

  if (jugador1Tirado == true && jugador2Tirado == true) {
    //DETERMINAR GANADOR
    winerIs(tp1,tp2);
    jugador1Tirado = false;
    jugador1Tirado = false;
  };


  //SI la clase active alcanza el final de las casillas
  if ($current_player.attr("id") == lengtH -1) {
    //asignar puntaje de jugadores a la longitud
    tp1 = lengtH;
    tp2 = lengtH;
    // de tal manera que al determinar el GANADOR los puntajes de 0, y ambos sean catalogados como perdedores
    winerIs(tp1,tp2);
  }
};//----------FIN LANZAR DADO

//function para iniciar juego por cada jugador
function throwDices() {
  //vincular click a boton "jugar" las funciones lanzar dados de cada jugador
  $("#start_btn").click(function () {
    lanzarDado("#Player1",lengtH);
    lanzarDado("#Player2", lengtH);
  });
};//----------FIN LANZAR AMABOS DADOS


function restarGame(){//--------REINICIAR JUEGO
  //al hacer click en el boton "reiniciar "
  $("#restart_btn").click(function () {
    //encontrar "td .active" y remover clase active
    $("#Player1").find(".active").removeClass("active");
    $("#Player2").find(".active").removeClass("active");
    //añadir al td siguiente de "#playerN" la clase active
    $("#player1").next().addClass("active");
    $("#player2").next().addClass("active");
    //asignar falso a las variables globales, de tal que se reiniciar funcionalidad lanzarDado
    teclaS = false;
    teclaÑ = false;
  })
};//---------------------FIN REINICIAR JUEGO

//source: https://api.jquery.com/event.which/
//ver en inspector la tecla precionada
// $(window).keydown(function( event ) {
//   //mostrar el tipo de evento y tecla apretada
//   console.log(event.type+": "+ event.which);
// });
