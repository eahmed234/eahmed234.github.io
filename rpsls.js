/*global $*/

var result;
var comp = 0;
var human = 0;

function gameLogic() {
  var ui = $("#rpslsResponse").val();
  var randNum = Math.floor(Math.random() * 5) + 1;

  function humanWin(against) {
    human += 1;
    var randNum = Math.floor(Math.random() * 5) + 1;
    result = "<p>You win against " + against + "! Comp: " + comp + " You: " + human + "</p>";
  }

  function compWin(against) {
    comp += 1;
    var randNum = Math.floor(Math.random() * 5) + 1;
    result = "<p>Computer wins with " + against + "! Comp: " + comp + " You: " + human + "</p>";
  }

  function tie() {
    var randNum = Math.floor(Math.random() * 5) + 1;
    result = "<p>It's a tie! Comp: " + comp + " You: " + human + "</p>";
  }

  function invalid() {
    var randNum = Math.floor(Math.random() * 5) + 1;
    result = "<p>Invalid input! Comp: " + comp + " You: " + human + "</p>";
  }

  if (ui.toUpperCase() === "ROCK") {
    switch (randNum) {
      case 1:
        tie();
        break;
      case 2:
        compWin("paper");
        break;
      case 3:
        humanWin("scissors");
        break;
      case 4:
        humanWin("lizard");
        break;
      case 5:
        compWin("Spock");
        break;
      default:
        invalid();
    }
  }
  else if (ui.toUpperCase() === "PAPER") {
    switch (randNum) {
      case 1:
        humanWin("rock");
        break;
      case 2:
        tie();
        break;
      case 3:
        compWin("scissors");
        break;
      case 4:
        compWin("lizard");
        break;
      case 5:
        humanWin("Spock");
        break;
      default:
        invalid();
    }
  }
  else if (ui.toUpperCase() === "SCISSORS") {
    switch (randNum) {
      case 1:
        compWin("rock");
        break;
      case 2:
        humanWin("paper");
        break;
      case 3:
        tie();
        break;
      case 4:
        humanWin("lizard");
        break;
      case 5:
        compWin("Spock");
        break;
      default:
        invalid();
    }
  }
  else if (ui.toUpperCase() === "LIZARD") {
    switch (randNum) {
      case 1:
        compWin("rock");
        break;
      case 2:
        humanWin("paper");
        break;
      case 3:
        compWin("scissors");
        break;
      case 4:
        tie();
        break;
      case 5:
        humanWin("Spock");
        break;
      default:
        invalid();
    }
  }
  else if (ui.toUpperCase() === "SPOCK") {
    switch (randNum) {
      case 1:
        humanWin("rock");
        break;
      case 2:
        compWin("paper");
        break;
      case 3:
        humanWin("scissors");
        break;
      case 4:
        compWin("lizard");
        break;
      case 5:
        tie();
        break;
      default:
        invalid();
    }
  }
  else {
    invalid();
    console.log("else");
  }
}

function rpsls1(form) {
  if (comp === 3){
    result = "<p>Computer wins best of 3!</p>";
    document.getElementById("rpslsBtn").removeAttribute("onClick");
  } else if (human === 3){
    result = "<p>You win best of 3!</p>";
    document.getElementById("rpslsBtn").removeAttribute("onClick");
  } else {
    gameLogic();
  }
  $("#rpslsForm").append(result);
}
