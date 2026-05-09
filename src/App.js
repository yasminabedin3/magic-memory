import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
const cardImages = [
  { "src": "img/apple.png", matched: false },
  { "src": "img/bananas.png", matched: false },
  { "src": "img/cherries.png", matched: false },
  { "src": "img/lemon.png", matched: false },
  { "src": "img/strawberry.png", matched: false },
  { "src": "img/watermelon.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)  
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src ===choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src=== choiceOne.src){
              return {...card,matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //start a nea game automitically
  useEffect(() => {
    shuffleCards()
  }, [])

  console.log(choiceOne, choiceTwo)

  return (
    <div className="App">
       <h1><span className="star-left">★</span> Magic Match <span className="star-right">★</span>
        </h1>      
      <p className="instructions">
        Click a square and find a match! Match all 6 pieces of fruit and WIN!
      </p>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
           key={card.id} 
           card={card}
           handleChoice={handleChoice}
           flipped={card === choiceOne || card ===choiceTwo || card.matched}
           disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
        <footer>
      <a href="../../home.htm">Course Homepage</a>
      <span> | Project adapted from Net Ninja @ </span>
      <a href="https://youtu.be/ZCKohZwGZMw?si=5w7HoSDxY5Lj4Xje">https://t.ly/yhlzy</a>
      <span> | </span>
      <a href="https://github.com/yasminabedin3/magic-memory">GitHub Project</a>
    </footer>
    </div>
  );
}

export default App
