import React, { useState } from 'react'

const MultiChoiceAnswer = ({ answers, setAnswers }) => {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const handleAnswer = (e) => {
    let { value } = e.target
    setChosenAnswer(value)
    setAnswers({
      multiChoice: [
        { answer: answers[0]?.answer, isTrue: value === 'a' ? true : false },
        { answer: answers[1]?.answer, isTrue: value === 'b' ? true : false },
        { answer: answers[2]?.answer, isTrue: value === 'c' ? true : false },
        { answer: answers[3]?.answer, isTrue: value === 'd' ? true : false },
      ],
    })
  }

  return (
    <div className="flex flex-wrap">
      <div className="hidden">
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="a"
          id="option-A"
          name="chosenAnswer"
        />
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="b"
          id="option-B"
          name="chosenAnswer"
        />
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="c"
          id="option-C"
          name="chosenAnswer"
        />
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="d"
          id="option-D"
          name="chosenAnswer"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 my-5">
        <label
          htmlFor="option-A"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'a'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers[0]?.answer}
        </label>
        <label
          htmlFor="option-B"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'b'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers[1]?.answer}
        </label>
        <label
          htmlFor="option-C"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'c'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers[2]?.answer}
        </label>
        <label
          htmlFor="option-D"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'd'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers[3]?.answer}
        </label>
      </div>
    </div>
  )
}

export default MultiChoiceAnswer
