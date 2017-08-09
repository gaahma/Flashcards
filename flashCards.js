var BasicCard = require("./basic.js");
var ClozeCard = require("./cloze.js");
var inquirer = require("inquirer");
var fs = require("fs");
var flashcards;
var i = 0; //the counter for the flash card process

var cardType = process.argv[2];
switch(cardType){
  case "cloze":
    cardType = "ClozeCards.json"
    break;
  case "basic":
    cardType = "BasicCards.json";
    break;
  default: 
    cardType = "BasicCards.json";
    break;
}

if(process.argv[3] === "add"){
  getCards(cardType, true);
} else {
  getCards(cardType, false);
}

function getCards(cardType, addingCard){
  fs.readFile(cardType, "utf8", (err, data) => {

    if (err){
      flashcards = [];
      //console.log(err);
    } else {
      data = JSON.parse(data);
      flashcards = data.cards;
    }
    if(addingCard){
      addCard();
    } else {
      flashCards();
    }
  });
}


function flashCards(){
  if(cardType === "ClozeCards.json"){
    var answer = flashcards[i].deletion,
        question = flashcards[i].partial,
        correctAnswer = flashcards[i].full; 
  } else {
    var answer = flashcards[i].back,
        question = flashcards[i].front,
        correctAnswer = `The correct answer was ${answer}`;
  }

  inquirer.prompt([
    {
      type: "input",
      name: "answer",
      message: question,
    },
  ]).then(function(data){
    if(data.answer === answer){
      console.log(`Correct`);
    } else {
      console.log(correctAnswer);
    }

    i++;
    if(i < flashcards.length)
      flashCards();
  });
  
}

function addCard(){
  var type = process.argv[2],
      constructor,
      fullPrompt,
      answerPrompt,
      file;
  switch(type){
    case "cloze":
      file = "ClozeCards.json";
      answerPrompt = "Enter cloze deletion: ";
      fullPrompt = "Enter full sentence: "
      Card = ClozeCard;
      break;
    default: //defaults to Basic
      file = "BasicCards.json";
      answerPrompt = "Enter answer: ";
      fullPrompt = "Enter question: ";
      Card = BasicCard;
  }
    inquirer.prompt([
      {
        name: "question",
        type: "input",
        message: fullPrompt,

      },
      {
        name: "answer",
        type: "input",
        message: answerPrompt,
      }
    ]).then(function(newCard){
      flashcards.push(new Card(newCard.question, newCard.answer));
      writeToFile(file);
    })

  
}


function writeToFile(path){

  var package = {
    cards: flashcards,
  }
  fs.writeFile(path, JSON.stringify(package, null, 2), function(err){
    if(err)
      console.log(err);
  });
}



