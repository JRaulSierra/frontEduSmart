import React, { useEffect, useState } from "react";
import MainNavigation from "../navBar/MainNavigation";
import "../MathGame/MathGame.css";

function MathSum() {
  const [playing, setPlaying] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  let action;

  const start = () => {
    if (!playing) {
      document.getElementById("start").innerHTML = "Iniciar Juego";
      window.location.reload();
    } else {
      setPlaying(false);
      document.getElementById("remainingTime").innerHTML = timeRemaining;
      document.getElementById("instruction").innerHTML =
        "Click en la respuesta Correcta";
      show("time");
      hide("gameover");

      generateQA();
      document.getElementById("start").innerHTML = "Reiniciar Juego";
    }
  };

  useEffect(() => {
    if (playing === true) {
    } else {
      startCountdown();
    }
  });

  //start countdown 20sec
  function startCountdown() {
    action = setTimeout(function () {
      setTimeRemaining(timeRemaining - 1);
      document.getElementById("remainingTime").innerHTML = timeRemaining;
      if (timeRemaining === 0) {
        //game over
        stopCountdown();
        show("gameover");
        document.getElementById("gameover").innerHTML =
          "<p>GAME OVER!</p><p>YOUR SCORE: " + score + "</p>";
        hide("time");
        hide("right");
        hide("wrong");
        document.getElementById("start").innerHTML = "Iniciar Juego";
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }, 1000);
  }

  //stop counter
  function stopCountdown() {
    setPlaying(true);
    setTimeRemaining(30);
  }
  //hide an element
  function hide(id) {
    document.getElementById(id).style.display = "none";
  }
  //show an element
  function show(id) {
    document.getElementById(id).style.display = "block";
  }

  const botonAction = (a) => {
    if (playing === false) {
      console.log(a);
    } else {
      console.log("holi");
    }
  };

  //generate question and answers
  function generateQA() {
    //a random digit from 0 to 10 inclusive
    var randomNumber1 = Math.round(Math.random() * 10);
    var randomNumber2 = Math.round(Math.random() * 10);
    document.getElementById("problem").innerHTML =
      randomNumber1 + " + " + randomNumber2;

    setCorrectAnswer(randomNumber1 + randomNumber2);
    let respuesta = randomNumber1 + randomNumber2;
    var answerBox = Math.round(Math.random() * 3) + 1;
    //to fill on if the random answer boxes with the right answer
    document.getElementById("answer" + answerBox).innerHTML = respuesta;

    //storing answer choices;
    var answers = [respuesta];

    //to fill the other answer boxes with the wrong answers

    //make sure to exclude the box with the right answer
    for (var i = 1; i < 5; i++) {
      if (i !== answerBox) {
        var wrongAnswer;
        // check that the wrong answer is not equal to the right answer or another taken wrong answer
        //do: at least one possible answer, while: generate then a new possible answer, if the previous answer is not ok
        do {
          wrongAnswer =
            Math.round(Math.random() * 10) + Math.round(Math.random() * 10);
        } while (answers.indexOf(wrongAnswer) > -1); //wrongAnswer is already in the answer list, we countinue do loop

        document.getElementById("answer" + i).innerHTML = wrongAnswer;
        //adding wrong answer to answer choices
        answers.push(wrongAnswer);
      }
    }
  }

  return (
    <div>
      <MainNavigation />
      <div id="container">
        <h1 className="gametitle">Juego de Suma</h1>

        <div id="board">
          <div id="right">Correcto</div>
          <div id="wrong">Incorrecto</div>
          <div id="score">
            Score: <span id="scoreNumber">0</span>
          </div>
          <div id="problem"></div>
          <div id="instruction"></div>
          <div id="answers">
            <div
              id="answer1"
              onClick={() => {
                let answer = correctAnswer.toString();
                if (document.getElementById("answer1").innerHTML == answer) {
                  setScore(score + 1);
                  document.getElementById("scoreNumber").innerHTML = score + 1;
                  show("right");
                  setTimeout(function () {
                    hide("right");
                  }, 1000);
                  generateQA();
                } else {
                  show("wrong");
                  setTimeout(function () {
                    hide("wrong");
                  }, 1000);
                }
              }}
            ></div>
            <div
              id="answer2"
              onClick={() => {
                let answer = correctAnswer.toString();
                if (document.getElementById("answer2").innerHTML == answer) {
                  setScore(score + 1);
                  document.getElementById("scoreNumber").innerHTML = score + 1;
                  show("right");
                  setTimeout(function () {
                    hide("right");
                  }, 1000);
                  generateQA();
                } else {
                  show("wrong");
                  setTimeout(function () {
                    hide("wrong");
                  }, 1000);
                }
              }}
            ></div>
            <div
              id="answer3"
              onClick={() => {
                let answer = correctAnswer.toString();
                if (document.getElementById("answer3").innerHTML == answer) {
                  setScore(score + 1);
                  document.getElementById("scoreNumber").innerHTML = score + 1;
                  show("right");
                  setTimeout(function () {
                    hide("right");
                  }, 1000);
                  generateQA();
                } else {
                  show("wrong");
                  setTimeout(function () {
                    hide("wrong");
                  }, 1000);
                }
              }}
            ></div>
            <div
              id="answer4"
              onClick={() => {
                let answer = correctAnswer.toString();
                if (document.getElementById("answer4").innerHTML == answer) {
                  setScore(score + 1);
                  document.getElementById("scoreNumber").innerHTML = score + 1;
                  show("right");
                  setTimeout(function () {
                    hide("right");
                  }, 1000);
                  generateQA();
                } else {
                  show("wrong");
                  setTimeout(function () {
                    hide("wrong");
                  }, 1000);
                }
              }}
            ></div>
          </div>
          <div id="start" onClick={start}>
            Start Game
          </div>

          <div id="time">
            Time: <span id="remainingTime">55</span> sec
          </div>
          <div id="gameover">
            GAME OVER Your score: <span id="finalscore">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MathSum;
