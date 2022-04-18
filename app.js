let currentWord = generateRandomWord()
let currentLetterGuess = 0
let currentWordAttempt = 1
let currentWordAttemptCorrectLetters = 0
let isGameActive = true

const MAX_ATTEMPTS = 5

drawLetterboxes(currentWord.length)

function toggleIsGameActive() {
  isGameActive = !isGameActive
}

function drawLetterboxes(n) {
  const letterBox = '<div class="letterbox"> </div>'
  document.body.innerHTML += String(letterBox).repeat(n) + "<br />"
}

function generateRandomWord() {
  const words = ["hello", "world", "apple", "brown"]
  const randomNumber = Math.floor(Math.random() * words.length)
  return words[randomNumber]
}

function checkForWin() {
  if (currentWordAttemptCorrectLetters === currentWord.length) {
    toggleIsGameActive()
    return setTimeout(() => {
      indicateWin()
    }, 100)
  }
}

function getNodeIndex(index) {
  return index + currentWord.length * (currentWordAttempt - 1)
}

function addLetterToBox(index, letter) {
  document.querySelectorAll(".letterbox")[getNodeIndex(index)].innerHTML =
    letter
}

function colorizeBox(index, color) {
  const GREEN = "background-color: green; color: white;"
  const BLACK = "background-color: black; color: white;"
  const YELLOW = "background-color: yellow; color: black;"

  const colors = {
    black: BLACK,
    green: GREEN,
    yellow: YELLOW,
  }

  document
    .querySelectorAll(".letterbox")
    [getNodeIndex(index)].setAttribute("style", colors[color])
}

function indicateWin() {
  document.body.innerHTML += `<h1 style="color: green">You win!</h1>`
}

function indicateLose() {
  document.body.innerHTML += '<h1 style="color: red">You lose!</h1>'
}

document.body.addEventListener("keypress", (e) => {
  if (!isGameActive) return

  const isLetterTheCurrentLetter = currentWord[currentLetterGuess] === e.key
  const isLetterInWord = currentWord.includes(e.key)

  addLetterToBox(currentLetterGuess, e.key)

  //COLORIZE BOXES
  if (isLetterTheCurrentLetter) {
    colorizeBox(currentLetterGuess, "green")
    currentWordAttemptCorrectLetters++
    checkForWin()
  } else if (isLetterInWord) colorizeBox(currentLetterGuess, "yellow")
  else colorizeBox(currentLetterGuess, "black")

  if (currentLetterGuess === currentWord.length - 1) {
    // Guessing last letter
    currentWordAttempt++
    currentWordAttemptCorrectLetters = 0

    if (currentWordAttempt <= MAX_ATTEMPTS && isGameActive) {
      //  Not over the word attempt limit
      drawLetterboxes(currentWord.length)
      currentLetterGuess = 0
    } else if (currentWordAttempt > MAX_ATTEMPTS) {
      toggleIsGameActive()
      return indicateLose()
    }
  } else {
    currentLetterGuess++
  }
})
