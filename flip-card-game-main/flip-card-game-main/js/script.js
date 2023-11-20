// import TypeIt from "typeit";

let userName = document.querySelector(".info_container .name span");
let modalTries = document.querySelector("#modalTries span");
let modalHeading = document.querySelector("#modalHeading span");
let errors;
var matched = 0;
let modal = document.getElementById("modal");
let modalTime = document.querySelector("#modalTime span");
let currentTimer;
let timer = document.querySelector(".timer span");
let counter = 0;

let duration = 1000;
let game = document.querySelector(".game");
let cards = Array.from(game.children);
let orderRange = [...Array(cards.length).keys()];

let gameTimer = 3;

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("please enter your name");
  if (yourName == null || yourName == "") {
    userName.innerHTML = `User${Math.floor(Math.random() * 9)}`;
  } else {
    userName.innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  startTimer();
};

shuffle(orderRange);

cards.forEach((card, index) => {
  card.style.order = orderRange[index];

  card.addEventListener("click", function () {
    flipCard(card);
  });
});

function shuffle(array) {
  // set variables
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    // 1 save current alement in stash
    temp = array[current];
    // 2 current element = random
    array[current] = array[random];
    // 3 random element = get element from stash
    array[random] = temp;
  }
  return array;
}

function flipCard(selectedCard) {
  selectedCard.classList.add("is-flipped");

  let allFlippedCards = cards.filter((flipCard) =>
    flipCard.classList.contains("is-flipped")
  );

  if (allFlippedCards.length === 2) {
    stopClicking();
    checkcards(allFlippedCards[0], allFlippedCards[1]);
  }
}

function stopClicking() {
  game.classList.add("no-clicking");

  setTimeout(() => {
    game.classList.remove("no-clicking");
  }, duration);
}

function checkcards(firstCard, secondCard) {
  errors = document.querySelector(".errors span");
  if (
    firstCard.getAttribute("dataGame") === secondCard.getAttribute("dataGame")
  ) {
    firstCard.classList.remove("is-flipped");

    secondCard.classList.remove("is-flipped");

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matched++;
    console.log(matched);
    if (matched == 10) {
      endGame(false, true);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
    }, duration);
    counter++;
    errors.innerHTML = parseInt(counter);
    endGame();
  }
}

function endGame(endTimer, isWinner) {
  let x;
  if (counter == 15 || endTimer) {
    clearInterval(timerCounter);
    modal.classList.remove("hideModal");
    modalTries.innerHTML = counter;
    modalTime.innerHTML = spentTimer;
    modalHeading.classList.add("text-danger");

    new TypeIt("#modalHeading", {
      speed: 5,

      strings: [
        "<span class='text-danger fs-1 fw-bolder'>Game Over!</span><br>",
        "I Win",
        "You Lose!",
        "And You Are",
        "Never Waking Up?",
        "HAHAHAHAHAHAHAH",
        "HAHAHAHAHAHAHAH",
        "HAHAHAHAHAHAHAH",
        "HAHAHAHAHAHAHAH",
      ],
      color: "red",
      cursorChar: "💀",
      cursor: {
        autoPause: false,
        animation: {
          options: {
            duration: 500,
            easing: "linear",
            direction: "alternate",
          },
          frames: [
            {
              transformOrigin: "0.575em 0.7em",
              transform: "rotate(0deg) scale(2)",
            },
            {
              transformOrigin: "0.575em 0.7em",
              transform: "rotate(45deg) scale(2)",
              // transform: "rotate(360deg) scale(2)",
              // transform: " scale(2)",
            },
          ],
        },
      },
    }).go();
  }
  if (isWinner) {
    modal.classList.remove("hideModal");
    modalTries.innerHTML = counter;
    modalTime.innerHTML = spentTimer;

    modalHeading.classList.add("text-success");

    new TypeIt("#modalHeading", {
      speed: 20,
      strings: [
        "<span class='text-success fs-1 fw-bolder'>Congratulation</span><br>",

        "You Win",
        "I Lose ",
      ],
      color: "red",
      cursorChar: "⭐",
      cursor: {
        autoPause: false,
        animation: {
          options: {
            duration: 500,
            easing: "linear",
            direction: "alternate",
          },
          frames: [
            {
              transformOrigin: "0.575em 0.7em",
              transform: "rotate(0deg) scale(1)",
            },
            {
              transformOrigin: "0.575em 0.7em",
              transform: "rotate(45deg) scale(1.5)",
            },
          ],
        },
      },
    }).go();
  }
}
var spentTimer;
let timerCounter;
function startTimer() {
  let seconds = 0;
  let minutes = gameTimer;
  timerCounter = setInterval(() => {
    seconds -= 1;
    if (seconds < 0) {
      seconds = 59;
      minutes -= 1;
    }
    spentTimer = `${"0" + (gameTimer - 1 - minutes)}:${
      seconds < 50 ? 59 - seconds : "0" + (59 - seconds)
    }`;

    currentTimer = `${"0" + minutes} : ${
      seconds > 9 ? seconds : "0" + seconds
    }`;
    timer.innerHTML = currentTimer;
    if (minutes == 0 && seconds == 0) {
      endGame(true);
    }
  }, 1000);
}

function playAgain() {
  modal.classList.add("hideModal");
  startTimer();
  counter = 0;
  errors.innerHTML = counter;
  window.location.reload();
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    window.location.replace("../../01.html");
  }
});
