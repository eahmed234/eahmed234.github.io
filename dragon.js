/*global $*/

var randnum = Math.floor(Math.random() * 2) + 1;

function endGame(pNum,pAfter) {
  $(pNum).insertAfter(pAfter);
  document.getElementById("adventurenum").removeAttribute("onClick");
  document.getElementById("adventurenum").setAttribute("onClick","resetFunction()");
}

function contGame(pNum,pAfter,nextAdventure) {
  $(pNum).insertAfter(pAfter);
  document.getElementById("adventurenum").removeAttribute("onClick");
  document.getElementById("adventurenum").setAttribute("onClick", nextAdventure);
}

var password = "The one and only, Christopher Cannoli";

function resetFunction(){
  $("#adventureForm").empty();
  document.getElementById("adventurenum").removeAttribute("onClick");
  document.getElementById("adventurenum").setAttribute("onClick","adventure1(this.form)");
}

function adventure1 (form) {
    var ui = document.getElementById('response').value;
    $("#rpslsGame").remove();
    if (ui.toUpperCase() === "YES"){
      var p1 = "<p id='p1'>Is it a gun or a sword?</p>";
      contGame(p1,"#init","adventure3(this.form)");
    } else if (ui.toUpperCase() === "NO") {
      p1 = "<p id='p1'>The dragon is approaching fast! (hit submit)</p>";
      contGame(p1,"#init","adventure2(this.form)");
    } else {
      p1 = "<p>You are an uncooperative person. That is dead.</p>";
      endGame(p1,"#init");
    }
}

function adventure2 (form) {
  var ui = document.getElementById('response').value;
  if (isNaN(ui)) {
    if (randnum === 2) {
      var p2 = "<p>The dragon passes right past you and devours someone else. You breathe a sigh of relief and continue on your way.</p>";
      endGame(p2,"#p1");
    } else {
      p2 = "<p id='p2'>The dragon halts right in front of you, and asks for a password?! What is the password?</p>";
      console.log("The password is: " + password);
      contGame(p2,"#p1","adventure4(this.form)");
    }
  } else {
    var p2 = "<p>You're unwillingness to comply has lead you to your demise. Pity</p>";
    endGame(p2,"#p1");
  }
}

function adventure3 (form) {
  var ui = document.getElementById('response').value;
  if (ui.toUpperCase() === "SWORD") {
    if (randnum === 2) {
      var p3 = "<p>You slay the dragon with your handy weapon, and continue along your merry way.</p>";
      endGame(p3,"#p1");
    } else {
      p3 = "<p>You are unlucky, for the dragon is unusually stong for you. You are now dead.</p>";
      endGame(p3,"#p1");
    }
  } else if (ui.toUpperCase() === "GUN") {
    p3 = "<p id='p3'>The dragon scoffs at your puny gun and charges at you. You fire off your first shot! (hit submit)</p>";
    contGame(p3,"#p1","adventure5(this.form)");
  } else {
    p3 = "<p>You're unwillingness to answer has lead you to your demise. Pity.</p>";
    endGame(p3,"#p1");
  }
}

function adventure4 (form) {
  var ui = document.getElementById('response').value;
  if (ui === password) {
    if (randnum === 2) {
      var p4 = "<p>The dragon accepts and lets you go on your way.</p>";
      endGame(p4,"#p2");
    } else {
      p4 = "<p>The dragon was joking about accepting any password, even though it was correct. You are now lunch.</p>";
      endGame(p4,"#p2");
    }
  } else {
    p4 = "<p>The dragon laughs at your feeble attempt to guess the password before chowing down.</p>";
    endGame(p4,"#p2");
  }
}

function adventure5 (form) {
  var ui = document.getElementById('response').value;
  if (isNaN(ui)){
    var rand = Math.floor(Math.random() * 4) + 1;
    console.log(rand);
    var dragHealth = 5;
    var health = 5;
    while (dragHealth !== 0 || health !== 0) {
      if (dragHealth === 0) {
        var p4end = "<p>Congratulations! You slayed the dragon! You go on to live another day</p>";
        $("#adventureForm").append(p4end);
        document.getElementById("adventurenum").removeAttribute("onClick");
        break;
      } else if (health === 0) {
        p4end = "<p>You died. The end.</p>";
        $("#adventureForm").append(p4end);
        document.getElementById("adventurenum").removeAttribute("onClick");
        break;
      } else if (health === 0 && dragHealth === 0) {
        p4end = "<p>The dragon died, but unfortunately you do too. Pity.</p>";
        $("#adventureForm").append(p4end);
        document.getElementById("adventurenum").removeAttribute("onClick");
        break;
      } else {
        switch (rand) {
          case 1:
            dragHealth -= 1;
            var p4 = "<p>You hit the Dragon! The dragon has " + dragHealth + " lives left</p>";
            $("#adventureForm").append(p4);
            rand = Math.floor(Math.random() * 4) + 1;
            break;
          case 2:
            health -= 1;
            p4 = "<p>You missed the Dragon, and he hits you! You have " + health + " lives left</p>";
            $("#adventureForm").append(p4);
            rand = Math.floor(Math.random() * 4) + 1;
            break;
          case 3:
            dragHealth -= 1;
            health -= 1;
            p4 = "<p>You hit the Dragon, but the dragon also gets a swipe at you!! The dragon has " + dragHealth + " lives left, and you have " + health + " lives left!</p>";
            $("#adventureForm").append(p4);
            rand = Math.floor(Math.random() * 4) + 1;
            break;
          case 4:
            dragHealth -= 1;
            health -= 1;
            p4 = "<p>You hit the dragon, but he does damage to you also! The dragon has " + dragHealth + " lives left, and you have " + health + " lives left!</p>";
            $("#adventureForm").append(p4);
            rand = Math.floor(Math.random() * 4) + 1;
            break;
          default:
            console.log("But y");
            var p5 = "<p>But y tho?</p>";
            endGame(p5,"#p3");
        }
      }
    }
  } else {
    console.log("But y tho?");
    p5 = "<p>But y tho?</p>";
    endGame(p5,"#p3");
  }
}
