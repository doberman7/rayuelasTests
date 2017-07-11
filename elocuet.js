$(document).ready(function(){
  //asignar filas a variable
  var $tableRows = $("tr")
    // iterar en filas, k es el index de iteracion, tableRow es el value de cada iteracin
    $.each($tableRows,function(k,tableRow){
      //AGREGAR CASILLAS: td es el tableData, iniciando en 1, mientras sea menor o igual a 20, aumentar 1
      for (var tdN = 1; tdN <= 10; tdN++) {
        //anexar en cada fila un "td" con id="tdN"
        $(tableRow).append("<td id="+tdN+">fila: "+k+" id: "+tdN+"</td>");
        //MOVER CLASE ACTIVE:
        //en 950 milisegs, en la fila encontrar hijo con lcase "active" y al siguiente elemento y añadir la clase "active"
      };
    });

	//crear funcion que recibe un jugador
  function lanzar_dado(player) {
    //-asignar variable que obtiene objeto con la clase active = CURRENT
    var $current_player = $(player).find(".active");
    //-asignar variable que obtiene el siguiente objeto a la clase active = NEXT
    var $next_player = $current_player.next();
    //-remover la clase "active" de CURRENT
    $current_player.removeClass("active");
    //-agregar clase "active" a NEXT
    $next_player.addClass("active")
  }

  var p1 = "#Player1"
  do {
    lanzar_dado(p1);
    //lanzar dado hasta que <tr id="Player1"> se igual al index de la clase active. se agregan el 2 ya que las 2 primeros "td"'s tienen las  palabras"Jugador 1" y "ACTIVE" respectivamente
  } while (p1.length + 2 >= $(p1).find(".active").index() );

  var p2 = "#Player2"
  do {
    lanzar_dado(p2);
    //lanzar dado hasta que <tr id="Player1"> se igual al index de la clase active. se agregan el 2 ya que las 2 primeros "td"'s tienen las  palabras"Jugador 1" y "ACTIVE" respectivamente
  } while (p2.length + 2 >= $(p2).find(".active").index() );

});


/*






  -establecer SetTimeout
*/
