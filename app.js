const showRulesButton = document.querySelector(".show_rules");
const closeRulesButton = document.querySelector(".close_rules");
const rulesDiv = document.querySelector(".rules_wrapper");

const choiceButtons = document.querySelectorAll(".choice button");
const gameDiv = document.querySelector(".game_wrapper");
const resultDiv = document.querySelector(".result_wrapper");
const resultDivs = document.querySelectorAll(".result");
const winnerTextP = document.querySelector(".winner_text");

const scoreText = document.querySelector(".score_text");
let score = 0;

const playAgainButton = document.querySelector(".play_again");

const CHOICES = [
    {
        name: "spock",
        beats: ["scissors","rock"]
    },
    {
        name: "scissors",
        beats: ["paper", "lizard"]
    },
    {
        name: "paper",
        beats: ["rock", "spock"]
    },
    {
        name: "rock",
        beats: ["lizard", "scissors"]
    },
    {
        name: "lizard",
        beats: ["spock", "paper"]
    },
]

choiceButtons.forEach(button => {
    // add an event listener for each of the buttons
    button.addEventListener("click", () => {
        // get the choice using the dataset (choice specified in HTML)
        const choiceName = button.dataset.choice;
        // find the name and what it beats in the CHOICES array
        const choice = CHOICES.find(choice => choice.name === choiceName)
        // function defined below
        choose(choice);
    })
})

// function incharge of getting the computer choice, displaying the result and displaying the winner 
const choose = (choice) => {
    const compChoice = compChoose()
    displayResult([choice, compChoice])
    displayWinner([choice, compChoice])
}

// get a random choice for the computer
const compChoose = () => {
    const randomNumber = Math.floor(Math.random() * CHOICES.length) // get a random number between 0 and 4
    return CHOICES[randomNumber]
}

const showRules = () => {
    rulesDiv.classList.toggle("hidden"); // display modal
};
const closeRules = () => {
    rulesDiv.classList.toggle("hidden"); // hide modal
}

// function incharge of displaying your choice and the computer's choice
const displayResult = (results) => {
    // loop throught your two result divs (yours and the computer's) to add the choices chosen
    resultDivs.forEach((resultDiv, i) => {
        // set Timeout is added so as to not display both choices at the same time
        // display yours, then computer's in a second
        setTimeout(() => {
            // et the innerHTML of the divs to the choices chosen
            resultDiv.innerHTML = `
            <div class="choice ${results[i].name}">
                <button data-choice="${results[i].name}">
                    <img src="./images/icon-${results[i].name}.svg" alt="${results[i].name}">
                </button>
            </div>
            `
        }, i * 1000);
    });
    gameDiv.classList.toggle("hidden"); // hide the game div
    resultDiv.classList.toggle("hidden"); // show the result div
};

// check for the winner
const isWinner = (results) => {
    return results[0].beats[0] === results[1].name || results[0].beats[1] === results[1].name;
}

const displayWinner = (results) => {
    setTimeout(() => {
        // check if you win
        const userWins = isWinner(results)
        // or the computer wins, reversing it makes the comp choice coe first, therefore checking if the computer wins
        const compWins = isWinner(results.reverse())
        // console.log(userWins, compWins)
        if(userWins) {
            winnerTextP.textContent = "you win"
            keepScore(1);
        } 
        else if(compWins) {
            winnerTextP.textContent = "you lose"
            keepScore(-1);
        } else {
            winnerTextP.textContent = "draw"
        }
    }, 1000)
}

// function incharge of keeping the score
const keepScore = (point) => {
    score += point;
    scoreText.textContent = score;
}

// function incharge of the pla again button
const playAgain = () => {
    gameDiv.classList.toggle("hidden"); // show the game div
    resultDiv.classList.toggle("hidden"); // hide the result div
    // set the divs to "" to restart
    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
    });
    // winner text to nothing too
    winnerTextP.textContent = "";
}

showRulesButton.addEventListener("click", showRules)
closeRulesButton.addEventListener("click", closeRules)
playAgainButton.addEventListener("click", playAgain)