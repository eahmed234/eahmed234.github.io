/*global $*/

$(function() { $(".rpslsGame").hide(); });

function initialScreen() {
  $("#initScreen").fadeOut();
  $(".rpslsGame").fadeIn();
  $("#resetBtn").hide();
}

class rpsObjects {
  constructor(rock, scissors, pizzaroll, monk, moose, ogre, apexam, fire, water, mushroom, sword, name, picture) {
    this.rock = rock;
    this.scissors = scissors;
    this.pizzaroll = pizzaroll;
    this.monk = monk;
    this.moose = moose;
    this.ogre = ogre;
    this.apexam = apexam;
    this.fire = fire;
    this.water = water;
    this.mushroom = mushroom;
    this.sword = sword;
    this.name = name;
    this.picture = picture;
  }
}

let rock = new rpsObjects("tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "rock", "rock.jpg");
let scissors = new rpsObjects("wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "scissors", "scissors.jpg");
let pizzaroll = new rpsObjects("wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "pizzaroll", "pizzarolls.jpg");
let monk = new rpsObjects("wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "wins", "monk", "smoking-monk.jpg");
let moose = new rpsObjects("wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "wins", "moose", "moose.jpg");
let ogre = new rpsObjects("wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "lose", "ogre", "shrek.jpg");
let apexam = new rpsObjects("lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "lose", "apexam", "test.jpeg");
let fire = new rpsObjects("lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "lose", "fire", "fire.jpg");
let water = new rpsObjects("lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "lose", "water", "water.jpg");
let mushroom = new rpsObjects("lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "lose", "mushroom", "mushroom.jpg");
let sword = new rpsObjects("lose", "lose", "lose", "lose", "lose", "wins", "wins", "wins", "wins", "wins", "tie", "sword", "sword.png");

let rpsArray = [rock, scissors, pizzaroll, monk, moose, ogre, apexam, fire, water, mushroom, sword];

let result;
let comp = 0;
let humanScore = 0;
let randNum = Math.floor(Math.random() * 11);
let compChoice = rpsArray[randNum];
let compPic = compChoice.picture;
let humanChoice;
let humanPic;

function resetFunction() {
  comp = 0;
  humanScore = 0;
  $("#score").html(comp + " - " + humanScore);
  $('#compImage').html("");
  $('#humanImage').html("");
  $("#rpslsForm").empty();
  $("#resetBtn").hide();
  $(".rpslsBtn").show();
}

function compareFunction() {
  randNum = Math.floor(Math.random() * 11);
  compChoice = rpsArray[randNum];
  compPic = compChoice.picture;
  
  if (humanScore === 5) {
    result = "<p>You win best of 5!</p>";
    $(".rpslsBtn").hide();
    $("#resetBtn").show();
  }
  else if (comp === 5) {
    result = "<p>Computer wins best of 5!</p>";
    $(".rpslsBtn").hide();
    $("#resetBtn").show();
  }
  else {
    if (compChoice.name === humanChoice) {
      result = `<p>It's a tie!</p>`;
    }
    else if (compChoice[humanChoice] === "lose") {
      comp += 1;
      result = `<p>Computer wins with ${compChoice.name}!</p>`;
    }
    else if (compChoice[humanChoice] == "wins") {
      humanScore += 1;
      result = `<p>You win against ${compChoice.name}!</p>`;
      
    }
    else {
      console.log("how");
    }
  }
}

function rpsFunction(object) {
  humanChoice = object;
  humanPic = eval(humanChoice).picture;
  compareFunction();
  $("#score").html(comp + " - " + humanScore);
  $("#rpslsForm").empty();
  $("#rpslsForm").append(result);
  $('#humanImage').html(`<img src=${humanPic} id="humanImage" />`);
  $('#compImage').html(`<img src=${compPic} id="compImage" />`);
}
