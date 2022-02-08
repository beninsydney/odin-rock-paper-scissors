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

function playTurn (humanSelection, computerSelection) {
  if (humanSelection === computerSelection) {
    return `Draw!  You both chose ${options[humanSelection]}!`
  }
  if (
      (humanSelection === 0 && computerSelection == 2) ||
      (humanSelection === 1 && computerSelection === 0) ||
      (humanSelection === 2 && computerSelection === 1)
    ) {
    return `You Lose! ${options[computerSelection]} beats ${options[humanSelection]}`
  }
  return `You Win! ${options[humanSelection]} beats ${options[computerSelection]}`
}

function game () {
  const computerSelection = randomSelection()
  let textEntered = prompt('Enter rock, paper or scissors')
  textEntered = textEntered.trim().toLocaleLowerCase()
  const humanSelection = options.indexOf(textEntered)
  if (humanSelection === -1) {
    return alert(`Invalid turn "${textEntered}"`)
  }
  return playTurn(humanSelection, computerSelection)
}
