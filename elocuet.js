$(document).ready(function(){
  //asignar filas a variable
  var $tableRows = $("tr")
    // iterar en filas, k es el index de iteracion, tableRow es el value de cada iteracin
    $.each($tableRows,function(k,tableRow){
      //AGREGAR CASILLAS: td es el tableData, iniciando en 1, mientras sea menor o igual a 20, aumentar 1
      for (var tdN = 1; tdN <= 20; tdN++) {
        //anexar en cada fila un "td" con id="tdN"
        $(tableRow).append("<td id="+tdN+">fila: "+k+" casilla: "+tdN+"</td>");
        //MOVER CLASE ACTIVE:
        //en 950 milisegs, en la fila encontrar hijo con lcase "active" y al siguiente elemento y añadir la clase "active"
        setTimeout(function(){
          $(tableRow).find(".active").next().addClass("active");
        }, 950);
        //en 1500 milisegs, en la fila encontrar el primer hijo con classe "active" y remover clase "active"
        setTimeout(function(){
          $(tableRow).find(".active").first().removeClass("active");
        }, 1500);
      };
    });




});
