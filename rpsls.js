/*global $*/

function eventListner() {
  $('#rpslsResponse').keypress(function(e) {
    let code = e.keyCode || e.which;
    if (code === 13) {
      $("#rpslsBtn").click();
    }
  });
}

$(document).ready(function() {
  $("#rpslsGame").hide();
  eventListner();
});

class rpsObjects {
  constructor(rock, fire, scissors, human, wolf, sponge, paper, air, water, devil, gun, name) {
    this.rock = rock;
    this.fire = fire;
    this.scissors = scissors;
    this.human = human;
    this.wolf = wolf;
    this.sponge = sponge;
    this.paper = paper;
    this.air = air;
    this.water = water;
    this.devil = devil;
    this.gun = gun;
    this.name = name;
  }
}

let rock = new rpsObjects("tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "rock");
let fire = new rpsObjects("wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "fire");
let scissors = new rpsObjects("wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "scissors");
let human = new rpsObjects("wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "human");
let wolf = new rpsObjects("wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wolf");
let sponge = new rpsObjects("wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "sponge");
let paper = new rpsObjects("lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "paper");
let air = new rpsObjects("lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "air");
let water = new rpsObjects("lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "water");
let devil = new rpsObjects("lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "devil");
let gun = new rpsObjects("lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "gun");

let rpsArray = [rock, fire, scissors, human, wolf, sponge, paper, air, water, devil, gun];

let result;
let comp = 0;
let humanScore = 0;
let randNum = Math.floor(Math.random() * 11);
let compChoice = rpsArray[randNum];

function humanWin() {
  humanScore += 1;
  result = `<p>You win against ${compChoice.name}! Comp: ${comp} You: ${humanScore}</p>`;
  randNum = Math.floor(Math.random() * 11);
  compChoice = rpsArray[randNum];
}

function compWin() {
  comp += 1;
  result = `<p>Computer wins with ${compChoice.name}! Comp: ${comp} You: ${humanScore}</p>`;
  randNum = Math.floor(Math.random() * 11);
  compChoice = rpsArray[randNum];
}

function tie() {
  randNum = Math.floor(Math.random() * 11);
  compChoice = rpsArray[randNum];
  result = `<p>It's a tie! Comp: ${comp} You: ${humanScore}</p>`;
}

function invalid() {
  randNum = Math.floor(Math.random() * 11);
  compChoice = rpsArray[randNum];
  result = `<p>Invalid input! Comp: ${comp} You: ${humanScore}</p>`;
}

function compareFunction() {
  let ui = $("#rpslsResponse").val();
  let humanChoice = ui.toLowerCase();
  if (compChoice.name === humanChoice) {
    tie();
  }
  else if (compChoice[humanChoice] === "lose") {
    compWin();
  }
  else if (compChoice[humanChoice] == "wins") {
    humanWin();
  }
  else {
    invalid();
  }
}

function initialScreen(){
  $("#initScreen").fadeOut();
  $("#rpslsGame").fadeIn();
}

function resetBtn() {
  document.getElementById("rpslsBtn").removeAttribute("onClick");
  document.getElementById("rpslsBtn").setAttribute("onClick", "resetFunction()");
  $("#rpslsBtn").html("Reset?");
}

function resetFunction() {
  $("#rpslsForm").empty();
  comp = 0;
  humanScore = 0;
  result = "";
  document.getElementById("rpslsBtn").removeAttribute("onClick");
  document.getElementById("rpslsBtn").setAttribute("onClick", "rpsls1(this.form)");
  $("#rpslsBtn").html("Submit");
}

function rpsls1(form) {
  if (humanScore === 5) {
    result = "<p>You win best of 5!</p>";
    resetBtn();
    $("#rpslsForm").append(result);
  }
  else if (comp === 5) {
    result = "<p>Computer wins best of 5!</p>";
    resetBtn();
    $("#rpslsForm").append(result);
  }
  else {
    compareFunction();
    $("#rpslsForm").append(result);
  }
}
