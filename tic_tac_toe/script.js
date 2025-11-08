const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const currentPlayerDisplay = document.getElementById("currentPlayer");

let currentPlayer = "🐱";
let boardState = Array(9).fill(null);
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  for (let [a,b,c] of winPatterns) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      message.textContent = `${boardState[a]} wins! 🎉`;
      gameActive = false;

      // Highlight the winning cells
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      // Fill all other cells with winner emoji
      cells.forEach((cell, idx) => {
        if (!cell.textContent) {
          cell.textContent = boardState[a];
          cell.classList.add("winner");
        }
      });
      return true;
    }
  }

  if (!boardState.includes(null)) {
    message.textContent = "It's a draw! 🤝";
    gameActive = false;
    return true;
  }
  return false;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (!checkWinner()) {
    currentPlayer = currentPlayer === "🐱" ? "🐶" : "🐱";
    currentPlayerDisplay.textContent = currentPlayer;
  }
}

function restartGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  message.textContent = "";
  currentPlayer = "🐱";
  currentPlayerDisplay.textContent = currentPlayer;
  gameActive = true;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
