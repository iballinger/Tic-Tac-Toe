// constants

// variables
let turn;

// cached
const topMsg = document.querySelector('h1');
const botMsg = document.querySelector('h2');
const playAgainBtn = document.getElementById('play-again-btn');
const playBtns = [...document.querySelectorAll('article > button')];
const btn0 = document.getElementById('0');
const btn1 = document.getElementById('1');
const btn2 = document.getElementById('2');
const btn3 = document.getElementById('3');
const btn4 = document.getElementById('4');
const btn5 = document.getElementById('5');
const btn6 = document.getElementById('6');
const btn7 = document.getElementById('7');
const btn8 = document.getElementById('8');
const btnArray = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8];

// listeners
document.querySelector('article').addEventListener('click', handlePlayBtnClick);
playAgainBtn.addEventListener('click',init);

// functions

init();
function init() {
    gameStatus = null;
    board = [,,,,,,,,,];
    turn = "x";
    render();
}

function render() {
    renderMsg();
    for (let i=0; i<9; i++) {
        btnArray[i].className = board[i];
        if (board[i]) {btnArray[i].innerText = board[i];}
            else {btnArray[i].innerText = '';}
    };
    botMsg.innerText = `${turn} to play.`
    botMsg.style.visibility = gameStatus ? 'hidden' : 'visible';
    playAgainBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function renderMsg() {
    if (gameStatus === null) {
        topMsg.innerText = "tick tock, mister bond. or should i say tic TAC!"
    } else if (gameStatus === "tie") {topMsg.innerText = "well that's disappointing."
    } else topMsg.innerText = (gameStatus === 'x') ? "x wins!" : "o wins!";
}

function handlePlayBtnClick(evt) {
    if (!playBtns.includes(evt.target)
        || gameStatus
        || evt.target.className === 'x'
        || evt.target.className === 'o') return;
    board[evt.target.id] = turn;
    victoryCheck();
    turn = (turn === 'x') ? 'o' : 'x';
    render();
}

function victoryCheck() {
    if ((board[0] === board[1] && board[0] === board[2] && board[0]) //Top row
        || (board[3] === board[4] && board[3] === board[5] && board[3]) //Mid row
        || (board[6] === board[7] && board[6] === board[8] && board[6]) //Bot row
        || (board[0] === board[3] && board[0] === board[6] && board[0]) //Left column
        || (board[1] === board[4] && board[1] === board[7] && board[1]) //Mid column
        || (board[2] === board[5] && board[2] === board[8] && board[2]) //Right column
        || (board[0] === board[4] && board[0] === board[8] && board[0]) //Neg diag
        || (board[2] === board[4] && board[2] === board[6] && board[2])) //Pos diag
        {gameStatus = turn;
    } else if (board[0] && board[1] && board[2] && board[3]
        && board[4] && board[5] && board[6] && board[7] && board[8]) //Check tie
        {gameStatus = "tie";
    }
}