const scoreboard = {}
const options = [
  'paper',
  'rock',
  'scissors'
]
function randomSelection () {
  const r = Math.random()
  if ( r < 0.34) {
    return 0
  } else if (r < 0.67) {
    return 1
  } else {
    return 2
  }
}

function gameResult (humanSelection, computerSelection) {
  if (humanSelection === computerSelection) {
    return 0
  }
  if (
      (humanSelection === 0 && computerSelection == 2) ||
      (humanSelection === 1 && computerSelection === 0) ||
      (humanSelection === 2 && computerSelection === 1)
    ) {
    return -1
  }
  return 1
}

function playGame (event) {
  const computerSelection = randomSelection()
  const textEntered = event.target.innerHTML.toLocaleLowerCase()
  const humanSelection = options.indexOf(textEntered)
  if (humanSelection === -1) {
    return alert(`Invalid turn "${textEntered}"`)
  }
  const result = gameResult(humanSelection, computerSelection)
  const message = document.querySelector('.result')
  message.style.display = 'block'
  if (result === 0) {
    scoreboard.draws++
    message.innerHTML = `Draw, you both chose ${event.target.innerHTML}!`
  } else if (result === 1) {
    scoreboard.human++
    message.innerHTML = `You won!  ${event.target.innerHTML} beats ${options[computerSelection]}!`
  } else {
    scoreboard.computer++
    message.innerHTML = `You lost!  ${options[computerSelection]} beats ${textEntered}!`
  }
  document.querySelector('.details').style.display = 'block'
  document.querySelector('.human').innerHTML = scoreboard.human
  document.querySelector('.computer').innerHTML = scoreboard.computer
  document.querySelector('.draws').innerHTML = scoreboard.draws
  scoreboard.turns.push({
    result: message.innerHTML,
    computerSelection,
    humanSelection
  })
  if (scoreboard.turns.length === 5) {
    message.style.display = 'none'
    const table = document.querySelector('.score-table')
    while (table.rows.length > 1) {
      table.deleteRow(1)
    }
    for (const score of scoreboard.turns) {
      const row = table.insertRow()
      const cell1 = row.insertCell(0)
      cell1.innerHTML = options[score.humanSelection]
      const cell2 = row.insertCell(1)
      cell2.innerHTML = options[score.computerSelection]
      const cell3 = row.insertCell(2)
      cell3.innerHTML = score.result
    }
    const total = document.querySelector('.total')
    if (scoreboard.human > scoreboard.computer) {
      total.innerHTML = "Victory!  You have beaten the computer."
      total.className = "total victory"
    } else if (scoreboard.computer > scoreboard.human) {
      total.innerHTML = "Defeat!  The computer has beaten you."
      total.className = "total loss"
    } else {
      total.innerHTML = "Draw!  You both won the same number of games."
      total.className = "total draw"
    }
    document.querySelector('.new-game').style.display = 'block'
    document.querySelector('.scores').style.display = 'block'
    document.querySelector('.turn').style.display = 'none'
  }
}


function startGame () {
  document.querySelector('.new-game').style.display = 'none'
  document.querySelector('.scores').style.display = 'none'
  document.querySelector('.turn').style.display = 'block'
  document.querySelector('.details').style.display = 'none'
  document.querySelector('.human').innerHTML = ''
  document.querySelector('.computer').innerHTML = ''
  document.querySelector('.draws').innerHTML = ''
  scoreboard.turns = []
  scoreboard.human = 0
  scoreboard.computer = 0
  scoreboard.draws = 0
}


window.addEventListener('load', () => {
  document.querySelector('.start').onclick = startGame
  document.querySelector('.rock').onclick = playGame
  document.querySelector('.paper').onclick = playGame
  document.querySelector('.scissors').onclick = playGame
})