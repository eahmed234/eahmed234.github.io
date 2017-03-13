function rpsls1 (form) {
  ui = form.rpslsResponse.value;
  var randNum = Math.floor(Math.random() * 5) + 1;
  var comp = 0;
  var human = 0;
  if (ui.toUpperCase() === "ROCK") {
    switch (randNum) {
      case 1:
        var p1 = "<p>It's a tie!</p>"
        $("#rpslsForm").append(p1);
        break;
      
      default:
        // code
    }
  } else if (ui.toUpperCase() === "PAPER") {
    
  } else if (ui.toUpperCase() === "SCISSORS") {
    
  } else if (ui.toUpperCase() === "LIZARD") {
    
  } else if (ui.toUpperCase() === "SPOCK") {
    
  } else {
    
  }
}
