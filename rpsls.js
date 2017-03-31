/*global $*/

var result;
var comp = 0;
var human = 0;
var randNum;
var compChoice;

function randFunction() {
  randNum = Math.floor(Math.random() * 5) + 1;
  switch (randNum) {
    case 1:
      compChoice = "rock";
      break;
    case 2:
      compChoice = "paper";
      break;
    case 3:
      compChoice = "scissors";
      break;
    case 4:
      compChoice = "lizard";
      break;
    case 5:
      compChoice = "spock";
      break;
    default:
      console.log("Why?!");
  }
}

function humanWin(against) {
  human += 1;
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>You win against " + against + "! Comp: " + comp + " You: " + human + "</p>";
}

function compWin(against) {
  comp += 1;
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>Computer wins with " + against + "! Comp: " + comp + " You: " + human + "</p>";
}

function tie() {
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>It's a tie! Comp: " + comp + " You: " + human + "</p>";
}

function invalid() {
  randNum = Math.floor(Math.random() * 5) + 1;
  result = "<p>Invalid input! Comp: " + comp + " You: " + human + "</p>";
}

function rpsObjects(rock,paper,scissors,lizard,spock) {
  this.rock = rock;
  this.paper = paper;
  this.scissors = scissors;
  this.lizard = lizard;
  this.spock = spock;
}

var rock = new rpsObjects("tie","lose","win","win","lose");
var paper = new rpsObjects("win","tie","lose","lose","win");
var scissors = new rpsObjects("lose","win","tie","win","lose");
var lizard = new rpsObjects("lose","win","lose","tie","win");
var spock = new rpsObjects("win","lose","win","lose","tie");

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
  } else if (humanChoice === "paper"){
    if (paper[compChoice] === "win") {
      humanWin(compChoice);
    } else if (paper[compChoice] === "lose"){
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
  } else if (humanChoice === "lizard"){
    if (lizard[compChoice] === "win") {
      humanWin(compChoice);
    } else if (lizard[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else if (humanChoice === "spock"){
    if (spock[compChoice] === "win") {
      humanWin(compChoice);
    } else if (spock[compChoice] === "lose"){
      compWin(compChoice);
    } else {
      console.log("hittin rock bottom");
    }
  } else {
    invalid();
  }
}

function rpsls1(form) {
  if (comp === 3) {
    result = "<p>Computer wins best of 3!</p>";
    document.getElementById("rpslsBtn").removeAttribute("onClick");
  }
  else if (human === 3) {
    result = "<p>You win best of 3!</p>";
    document.getElementById("rpslsBtn").removeAttribute("onClick");
  }
  else {
    compareFunction();
  }
  $("#rpslsForm").append(result);
}
