
let deckId =''
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    deckId=data.deck_id
  })
  .catch(err => {console.log(`error ${err}`)})

// Deal first round
document.querySelector('#deal').addEventListener('click', deal)
function deal() {
  let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
  fetch(url)
    .then(res=>res.json())
    .then(data=>{
      document.querySelector('#player1-card1').src = data.cards[0].image
      document.querySelector('#player1-card2').src = data.cards[1].image
      document.querySelector('#player2-card1').src = data.cards[2].image
      document.querySelector('#player2-card2').src = data.cards[3].image
      let player1Val1 = convertToNum(data.cards[0].value)
      let player1Val2 = convertToNum(data.cards[1].value)
      let player2Val1 = convertToNum(data.cards[2].value)
      let player2Val2 = convertToNum(data.cards[3].value)
      let player1 = player1Val1 + player1Val2
      let player2 = player2Val1 + player2Val2
      console.log(player1)
      console.log(player2)
      evaluate(player1, player2)
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
  }

  function evaluate(player1, player2) {
    if (player1 === 21)   {
      document.querySelector('h3').innerText = "Player1 has Blackjack!!!"
    } else if (player2 === 21) {
      document.querySelector('h3').innerText = "House has Blackjack!"
    } else {
      document.querySelector('h3').innerText = `Player 1 has ${player1}`
    }
  }

  function convertToNum(val) {
    if(val === "ACE") {
      return 11
    } else if(val === "KING") {
      return 10
    } else if(val === "QUEEN") {
      return 10
    } else if(val === "JACK") {
      return 10
    } else {
      return Number(val)
    }
  }
