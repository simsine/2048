if (!localStorage.getItem("score")){
    localStorage.setItem("score", 0)
}

let score = parseInt(localStorage.getItem("score"), 10)
const scoreDisplay = document.querySelector(".score-display")
scoreDisplay.innerText = score

function itterateScore(i) {
    score += parseInt(i, 10)
    scoreDisplay.innerText = score
    localStorage.setItem("score", score)
}
function reset() {
    score = 0
    scoreDisplay.innerText = 0
    localStorage.clear()
}