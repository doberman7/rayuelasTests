$(document).ready(function(){
  var $tableRows = $("tr")

  $.each($tableRows,function(k,tableRow){
    for (var tdN = 1; tdN <= 3; tdN++) {
      $(tableRow).append("<td>TD</td>");
      $(tableRow).find(".active").next().addClass("active");
      $(tableRow).find(".active").first().removeClass("active");
    };
  });


});
