import { useState } from 'react';
import './App.css';
import Box from './component/Box'

// 1. 박스 2개 (타이틀, 사진정보, 결과)
// 2. 가위 바위 보 버튼이 있다
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다
// 5. 3 4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 테두리 색이 바뀐다(이기면-초록, 지면-빨강, 비기면-검은색)

const choice = {
  rock: {
    name: "Rock",
    img: "data:image/jpeg;base64,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"
  },
  scissors: {
    name: "Scissors",
    img: "data:image/png;base64,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"
  },
  paper: {
    name: "Paper",
    img: "data:image/jpeg;base64,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"
  },
}

let i = 0
let a = 0
let b = 0
let c = 0

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [comSelect, setComSelect] = useState(null)
  const [result, setResult] = useState("")
  const [result1, setResult1] = useState("")
  const [gameTurn, setgameTurn] = useState(0)
  const [winTurn, setwinTurn] = useState(0)
  const [tieTurn, settieTurn] = useState(0)
  const [loseTurn, setloseTurn] = useState(0)

  const play = (userChoice) => {
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice()
    setComSelect(computerChoice)
    setResult(judgement(choice[userChoice], computerChoice))
    setResult1(judgement1(computerChoice, choice[userChoice]))
    setgameTurn(i = i + 1)
    setwinTurn(judgenum(judgement(choice[userChoice], computerChoice)))
    settieTurn(judgenum1(judgement(choice[userChoice], computerChoice)))
    setloseTurn(judgenum2(judgement(choice[userChoice], computerChoice)))
  }

  const judgenum = (event) => {
    if (event === "win") {
      return a = a + 1
    } else {
      return a
    }
  }

  const judgenum1 = (event) => {
    if (event === "tie") {
      return b = b + 1
    } else {
      return b
    }
  }

  const judgenum2 = (event) => {
    if (event === "lose") {
      return c = c + 1
    } else {
      return c
    }
  }

  const judgement = (user, computer) => {

    // user == computer tie
    // user == rock, computer == scissors user 이김
    // user == rock, computer == paper computer 이김
    // user == scissors computer == paper user 이김
    // user == scissors computer == rock user 짐
    // user == paper computer == rock user 이김
    // user == paper computer == scissors user 짐

    if (user.name === computer.name) {
      return "tie"
    } else if (user.name === "Rock") return computer.name == "Scissors" ? "win" : "lose"
    else if (user.name === "Scissors") return computer.name == "Paper" ? "win" : "lose"
    else if (user.name === "Paper") return computer.name == "Rock" ? "win" : "lose"
  }

  const judgement1 = (user3, user4) => {

    if (user3.name === user4.name) {
      return "tie"
    } else if (user3.name === "Rock") return user4.name == "Scissors" ? "win" : "lose"
    else if (user3.name === "Scissors") return user4.name == "Paper" ? "win" : "lose"
    else if (user3.name === "Paper") return user4.name == "Rock" ? "win" : "lose"
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice) // 객체에 키값만 뽑아서 어레이로 만들어주는 함수
    let randomItem = Math.floor(Math.random() * itemArray.length)
    let final = itemArray[randomItem]
    return choice[final]
  }

  return (
    <div>
      <div className='main'>
        <Box title='You' item={userSelect} result={result} />
        <Box title='Computer' item={comSelect} result={result1} />
      </div>
      <div className='buttons'>
        <button onClick={() => play("scissors")}><i class="fa-solid fa-hand-scissors"></i></button>
        <button onClick={() => play("rock")}><i class="fa-solid fa-hand-back-fist"></i></button>
        <button onClick={() => play("paper")}><i class="fa-solid fa-hand"></i></button>
      </div>
      <div className='text'>
        <div>게임 횟수: {gameTurn}</div>
        <div>이긴 횟수: {winTurn}</div>
        <div>비긴 횟수: {tieTurn}</div>
        <div>진 횟수: {loseTurn}</div>
      </div>
    </div>
  );
}

export default App;
