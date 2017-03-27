$(function() {
  var updatePage = function() {
    $(".boxes").remove().fadeOut(1000);
    $(".container-fluid").animate({margin: "20px auto"});
    var $searchText = $(".form-control").val();
    if ($searchText.indexOf(" ")) {
      $searchText = $searchText.replace(/ /g, "%20"); 
    } 
    $.getJSON("https://en.wikipedia.org//w/api.php?action=opensearch&format=json&callback=?&search=" + $searchText, function(data) {
      for (var i = 0; i < data[1].length; i++) {
          var $articles = $("<a></a>");
          $articles.append("<h2 class='title'>" + data[1][i] + "</h2>");
        if (!data[2][i]) {
          $articles.append("<h3>No Description</h3>");
        }
        else {
          $articles.append("<h3>" + data[2][i] + "</h3>");
        }  
          $articles.attr("href", data[3][i]);
          $articles.attr("id", "outer");
          $articles.attr("target", "_blank");
          $articles.attr("class", "boxes");
          $articles.appendTo("body").hide().fadeIn(1000);
      }
    })
  }  
  $("h1").fadeIn(1000);
  $("h2").fadeIn(2000);
  $(".form-control").fadeIn(2500);
  $("#search1").click(updatePage);
  $(".form-control").on({keypress: function() {
    var keycode = event.keyCode;
    if (keycode === 13){
      updatePage();
    }  
  }});  
});