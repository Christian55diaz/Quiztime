// this is linking the html to javascript
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
// when you click the start button it starts the game, click again you go onto the next question
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// this function starts the game and makes the questions random
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
//cycles through the questions and resets the buttons and colors after each question
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
// show the questions and if you choose the right answer it shows green but choose wrong it shows red. Makes sures the buttons are the answers and changes the question to which it chooses.
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
// changes the buttons to go back to the nuetral state
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
// selecting an answer it is either true or false
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
// adds the css class to the answer either being right/wrong
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}
// clears the css elements
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//questions for the quiz
const questions = [
  {
    question: 'Can you type in an alert?',
    answers: [
      { text: 'false', correct: true },
      { text: 'true', correct: false }
    ]
  },
  {
    question: 'What is a prompt?',
    answers: [
      { text: 'modal window with a text message', correct: true },
      { text: 'the visitor can’t interact with the rest of the page', correct: false },
      { text: 'string is now saved into the memory area associated with the variable', correct: false },
      { text: 'variants do the same thing', correct: false }
    ]
  },
  {
    question: 'What is an "if" statement?',
    answers: [
      { text: 'statement evaluates a condition in parentheses and, if the result is true, executes a block of code', correct: true },
      { text: 'type is commonly used to store yes/no values', correct: false },
      { text: ' it works with parentheses or without them. The result is the same.', correct: false },
    ]
  },
  {
    question: 'Are constants and varaibles the same?',
    answers: [
      { text: 'true', correct: false },
      { text: 'false', correct: true }
    ]
  }
]