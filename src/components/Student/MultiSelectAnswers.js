import React, { useState, useEffect } from 'react'
import CustomCheckbox from '../CustomeCheckbox'

const MultiSelectAnswers = ({ answers, setAnswers, review }) => {
  const [answerSelect, setAnswerSelect] = useState([])
  const handleOnChangeIsTrue = (answer) => {
    const indexAnswer = answerSelect.findIndex(
      (option) => option.answer === answer,
    )
    if (indexAnswer !== -1) {
      answerSelect[indexAnswer].isTrue = !answerSelect[indexAnswer].isTrue
      setAnswerSelect(answerSelect)
      setAnswers({ ...answers, multiSelect: answerSelect })
    }
  }

  useEffect(() => {
    if (answers.multiSelect?.length > 0) setAnswerSelect(answers.multiSelect)
  }, [answers])

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full">
        <span className="text-yellow-400">Multi select question</span>
      </div>
      {answers?.multiSelect?.map((item, i) => {
        return (
          <CustomCheckbox
            key={item.isTrue + item.answer + i}
            item={item}
            onClickCheckbox={handleOnChangeIsTrue}
            review={review}
          />
        )
      })}
    </div>
  )
}

export default MultiSelectAnswers
