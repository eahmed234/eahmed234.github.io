/*global $*/

var result;
var comp = 0;
var humanScore = 0;
var randNum;
var compChoice;

function randFunction() {
  randNum = Math.floor(Math.random() * 11) + 1;
  switch (randNum) {
    case 1:
      compChoice = "rock";
      break;
    case 2:
      compChoice = "fire";
      break;
    case 3:
      compChoice = "scissors";
      break;
    case 4:
      compChoice = "human";
      break;
    case 5:
      compChoice = "wolf";
      break;
    case 6:
      compChoice = "sponge";
      break;
    case 7:
      compChoice = "paper";
      break;
    case 8:
      compChoice = "air";
      break;
    case 9:
      compChoice = "water";
      break;
    case 10:
      compChoice = "devil";
      break;
    case 11:
      compChoice = "gun";
      break;
    default:
      console.log("Why?!");
  }
}

function humanWin(against) {
  humanScore += 1;
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>You win against " + against + "! Comp: " + comp + " You: " + humanScore + "</p>";
}

function compWin(against) {
  comp += 1;
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>Computer wins with " + against + "! Comp: " + comp + " You: " + humanScore + "</p>";
}

function tie() {
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>It's a tie! Comp: " + comp + " You: " + humanScore + "</p>";
}

function invalid() {
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>Invalid input! Comp: " + comp + " You: " + humanScore + "</p>";
}

function rpsObjects(rock,fire,scissors,human,wolf,sponge,paper,air,water,devil,gun) {
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
}

var rock = new rpsObjects("tie","win","win","win","win","win","lose","lose","lose","lose","lose");
var fire = new rpsObjects("lose","tie","win","win","win","win","win","lose","lose","lose","lose");
var scissors = new rpsObjects("lose","lose","tie","win","win","win","win","win","lose","lose","lose");
var human = new rpsObjects("lose","lose","lose","tie","win","win","win","win","win","lose","lose");
var wolf = new rpsObjects("lose","lose","lose","lose","tie","win","win","win","win","win","lose");
var sponge = new rpsObjects("lose","lose","lose","lose","lose","tie","win","win","win","win","win");
var paper = new rpsObjects("win","lose","lose","lose","lose","lose","tie","win","win","win","win");
var air = new rpsObjects("win","win","lose","lose","lose","lose","lose","tie","win","win","win");
var water = new rpsObjects("win","win","win","lose","lose","lose","lose","lose","tie","win","win");
var devil = new rpsObjects("win","win","win","win","lose","lose","lose","lose","lose","tie","win");
var gun = new rpsObjects("win","win","win","win","win","lose","lose","lose","lose","lose","tie");


function compareFunction() {
  var ui = $("#rpslsResponse").val();
  var humanChoice = ui.toLowerCase();
  randFunction();
  if (humanChoice === compChoice){
    tie();
    console.log("Actual tie");
  } else if (humanChoice === "rock"){
    if (rock[compChoice] === "win") {
      humanWin(compChoice);
    } else if (rock[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "fire"){
    if (fire[compChoice] === "win") {
      humanWin(compChoice);
    } else if (fire[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "scissors"){
    if (scissors[compChoice] === "win") {
      humanWin(compChoice);
    } else if (scissors[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "human"){
    if (human[compChoice] === "win") {
      humanWin(compChoice);
    } else if (human[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "wolf"){
    if (wolf[compChoice] === "win") {
      humanWin(compChoice);
    } else if (wolf[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "sponge"){
    if (sponge[compChoice] === "win") {
      humanWin(compChoice);
    } else if (sponge[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "paper"){
    if (paper[compChoice] === "win") {
      humanWin(compChoice);
    } else if (paper[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "air"){
    if (air[compChoice] === "win") {
      humanWin(compChoice);
    } else if (air[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "water"){
    if (water[compChoice] === "win") {
      humanWin(compChoice);
    } else if (water[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "devil"){
    if (devil[compChoice] === "win") {
      humanWin(compChoice);
    } else if (devil[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "gun"){
    if (gun[compChoice] === "win") {
      humanWin(compChoice);
    } else if (gun[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else {
    invalid();
  }
}

function resetBtn(){
  document.getElementById("rpslsBtn").removeAttribute("onClick");
  document.getElementById("rpslsBtn").setAttribute("onClick","resetFunction()");
  $("#rpslsBtn").html("Reset?");
  
}

function resetFunction(){
  $("#rpslsForm").empty();
  comp = 0;
  humanScore = 0;
  result = "";
  document.getElementById("rpslsBtn").removeAttribute("onClick");
  document.getElementById("rpslsBtn").setAttribute("onClick","rpsls1(this.form)");
  $("#rpslsBtn").html("Submit");
}

function rpsls1(form) {
  $("#rules").fadeOut();
  if (humanScore === 5) {
    result = "<p>You win best of 5!</p>";
    resetBtn();
    $("#rpslsForm").append(result);
    console.log("human win " + result);
  }
  else if (comp === 5) {
    result = "<p>Computer wins best of 5!</p>";
    resetBtn();
    $("#rpslsForm").append(result);
    console.log("comp win " + result);
  }
  else {
    compareFunction();
    $("#rpslsForm").append(result);
    console.log("bottom " + result);
  }
}
