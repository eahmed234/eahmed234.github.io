function rpsls1 (form) {
  var ui = document.getElementById('rpslsResponse').value;
  $("#dragGame").remove();
  $("#rpslsForm").empty();
  function rpslsFunction() {
    var randNum = Math.floor(Math.random() * 5) + 1;
    var comp = 0;
    var human = 0;
    while (comp !== 3 || human !== 3) {
      if (human === 3){
        var p1 = "<p>You win best of 3!</p>"
        $("#rpslsForm").append(p1);
        break;
      } else if (comp === 3) {
        var p1 = "<p>The computer wins best of 3!</p>"
        $("#rpslsForm").append(p1);
        break;
      } else {
        if (ui.toUpperCase() === "ROCK") {
          switch (randNum) {
            case 1:
              var p1 = "<p>It's a tie! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 2:
              comp += 1;
              var p1 = "<p>Computer wins with paper! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 3:
              human += 1;
              var p1 = "<p>You win against scissors! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 4:
              human += 1;
              var p1 = "<p>You win against lizard! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 5:
              comp += 1;
              var p1 = "<p>Computer wins with Spock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            default:
              comp += 1;
              var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
          }
        } else if (ui.toUpperCase() === "PAPER") {
          switch (randNum) {
            case 1:
              human += 1
              var p1 = "<p>You win against rock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 2:
              var p1 = "<p>It's a tie! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 3:
              comp += 1;
              var p1 = "<p>Computer wins with scissors! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 4:
              comp += 1;
              var p1 = "<p>Computer wins with lizard! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 5:
              human += 1;
              var p1 = "<p>You win against Spock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            default:
              comp += 1;
              var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
          }
        } else if (ui.toUpperCase() === "SCISSORS") {
          switch (randNum) {
            case 1:
              comp += 1;
              var p1 = "<p>Computer wins with rock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 2:
              human += 1;
              var p1 = "<p>You win against paper! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 3:
              var p1 = "<p>It's a tie! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 4:
              human += 1;
              var p1 = "<p>You win against lizard! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 5:
              comp += 1;
              var p1 = "<p>Computer wins with Spock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            default:
              comp += 1;
              var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
          }
        } else if (ui.toUpperCase() === "LIZARD") {
          switch (randNum) {
            case 1:
              comp += 1
              var p1 = "<p>Computer wins with rock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 2:
              human += 1;
              var p1 = "<p>You win against paper! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 3:
              comp += 1;
              var p1 = "<p>Computer wins with scissors! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 4:
              var p1 = "<p>It's a tie! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 5:
              human += 1;
              var p1 = "<p>You win against Spock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            default:
              comp += 1;
              var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
          }
        } else if (ui.toUpperCase() === "SPOCK") {
          switch (randNum) {
            case 1:
              human += 1
              var p1 = "<p>You win against rock! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 2:
              comp += 1;
              var p1 = "<p>Computer wins with paper! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 3:
              human += 1;
              var p1 = "<p>You win against scissors! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 4:
              comp += 1;
              var p1 = "<p>Computer wins with lizard! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            case 5:
              var p1 = "<p>It's a tie! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
              break;
            default:
              comp += 1;
              var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
              $("#rpslsForm").append(p1);
              var randNum = Math.floor(Math.random() * 5) + 1;
          }
        } else {
          computer += 3
          var p1 = "<p>Invalid input. Computer wins! Comp: " + comp + "  You: " + human + "</p>"
          $("#rpslsForm").append(p1);
          console.log("else");
        }
      }
    }
  }
  rpslsFunction();
}
