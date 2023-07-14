document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetButton = document.getElementById("reset-button");
    const newGameButton = document.getElementById("new-game-button");
    let currentPlayer = "X";
    let gameEnd = false;
    let playerXScore = 0;
    let playerOScore = 0;

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (!box.textContent && !gameEnd) {
                box.textContent = currentPlayer;
                box.classList.add(currentPlayer);
                if (checkWin(currentPlayer)) {
                    document.getElementById("result").textContent = `${currentPlayer} wins!`;
                    updateScore(currentPlayer);
                    gameEnd = true;
                } else if (checkDraw()) {
                    document.getElementById("result").textContent = "It's a draw!";
                    gameEnd = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", newGame);

    function checkWin(player) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombos.some((combo) => {
            return combo.every((index) => {
                return boxes[index].textContent === player;
            });
        });
    }

    function checkDraw() {
        return Array.from(boxes).every((box) => {
            return box.textContent !== "";
        });
    }

    function updateScore(player) {
        if (player === "X") {
            playerXScore++;
            document.getElementById("playerX-score").textContent = `Player X: ${playerXScore}`;
        } else {
            playerOScore++;
            document.getElementById("playerO-score").textContent = `Player O: ${playerOScore}`;
        }
    }

    function resetGame() {
        boxes.forEach((box) => {
            box.textContent = "";
            box.className = "box";
        });
        document.getElementById("result").textContent = "";
        currentPlayer = "X";
        gameEnd = false;
    }

    function newGame() {
        boxes.forEach((box) => {
            box.textContent = "";
            box.className = "box";
        });
        document.getElementById("result").textContent = "";
        currentPlayer = "X";
        gameEnd = false;
        playerXScore = 0;
        playerOScore = 0;
        document.getElementById("playerX-score").textContent = "Player X: 0";
        document.getElementById("playerO-score").textContent = "Player O: 0";
    }
});