var randnum = Math.floor((Math.random() * 2) + 1);

function endGame(pNum,pAfter) {
  $(pNum).insertAfter(pAfter);
  document.getElementById("adventurenum").removeAttribute("onClick");
};

function contGame(pNum,pAfter,nextAdventure) {
  $(pNum).insertAfter(pAfter);
  document.getElementById("adventurenum").removeAttribute("onClick");
  document.getElementById("adventurenum").setAttribute("onClick", nextAdventure);
};

var password = "JUSTASMYSDCARDRUNSOUT"

function adventure1 (form) {
    ui = form.response.value;
    if (ui.toUpperCase() === "YES"){
      var p1 = "<p id='p1'>Is it a gun or a sword?</p>";
      contGame(p1,"#init","adventure3(this.form)");
    } else if (ui.toUpperCase() === "NO") {
      var p1 = "<p id='p1'>The dragon is approaching fast! (type cont)</p>";
      contGame(p1,"#init","adventure2(this.form)");
    } else {
      var p1 = "<p>You are an uncooperative person. That is dead.</p>";
      endGame(p1,"#init");
    };
};

function adventure2 (form) {
  ui = form.response.value;
  if (ui.toUpperCase() === "CONT") {
    if (randnum === 2) {
      var p2 = "<p>The dragon passes right past you and devours smeone else. You breathe a sigh of relief and continue on your way.</p>";
      endGame(p2,"#p1");
    } else {
      var p2 = "<p id='p2'>The dragon halts right in front of you, and asks for a password?! What is the password?</p>";
      contGame(p2,"#p1","adventure4(this.form)");
    };
  } else {
    var p2 = "<p>You're unwillingness to comply has lead you to your demise. Pity</p>";
    endGame(p2,"#p1");
  };
};

function adventure3 (form) {
  ui = form.response.value;
  if (ui.toUpperCase() === "SWORD") {
    if (randnum === 2) {
      var p3 = "<p>You slay the dragon with your handy weapon, and continue along your merry way.</p>";
      endGame(p3,"#p1");
    } else {
      var p3 = "<p>You are unlucky, for the dragon is unusually stong for you. You are now dead.</p>";
      endGame(p3,"#p1");
    };
  } else if (ui.toUpperCase() === "GUN") {
    var p3 = "<p>This is the medival ages, and the dragon has a slightly confused face while it gobbles you up.</p>";
    endGame(p3,"#p1");
  } else {
    var p3 = "<p>You're unwillingness to answer has lead you to your demise. Pity.</p>";
    endGame(p3,"#p1");
  };
};

function adventure4 (form) {
  ui = form.response.value;
  if (ui.toUpperCase() === password) {
    if (randnum === 2) {
      var p4 = "<p>The dragon accepts and lets you go on your way.</p>";
      endGame(p4,"#p2");
    } else {
      var p4 = "<p>The dragon was joking with you about the existence of a password to safety. You are now lunch.</p>";
      endGame(p4,"#p2");
    };
  } else {
    var p4 = "<p>The dragon laughs at your feeble attempt to guess the password before chowing down.</p>";
    endGame(p4,"#p2");
  };
};
