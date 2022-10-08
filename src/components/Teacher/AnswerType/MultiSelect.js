import React, { useState, useEffect, useRef } from 'react'
import Button from '../../Button'
import { v4 as uuid } from 'uuid'

const MultiSelect = ({ answers, setAnswers }) => {
  const [newAnswer, setNewAnswer] = useState([])
  const count = useRef(1)

  const handleOnChangeIsTrue = (i) => {
    const inputData = [...newAnswer]
    inputData[i].isTrue = !inputData[i].isTrue
    setNewAnswer(inputData)
  }

  const handleOnChangeAnswer = (onChangeValue, i) => {
    const inputData = [...newAnswer]
    inputData[i].answer = onChangeValue.target.value
    setNewAnswer(inputData)
  }

  const handleAddAnswers = () => {
    const newAnswers = [...newAnswer, { id: uuid(), isTrue: false, answer: '' }]
    count.current++
    setNewAnswer(newAnswers)
  }

  const handleDelete = (id) => {
    const newList = newAnswer.filter((item) => item.id !== id)
    count.current--
    setNewAnswer(newList)
  }

  useEffect(() => {
    setAnswers(newAnswer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAnswer])

  useEffect(() => {
    handleAddAnswers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {newAnswer.map((val, i) => {
        return (
          <div key={i} className="flex flex-row gap-3">
            <div className=" flex flex-row  gap-2 items-center px-5 py-3 pt-4 rounded-md w-[500px]">
              <input type="checkbox" onChange={() => handleOnChangeIsTrue(i)} />
              <input
                placeholder="Enter answers"
                value={val?.answer}
                onChange={(e) => handleOnChangeAnswer(e, i)}
                className="outline-none w-full px-2 py-1 border-b duration-300 border-gray-200"
              />
            </div>
            <div className="flex items-center">
              <i
                className="fas fa-times text-xl cursor-pointer text-gray-500 hover:text-red-400 duration-300"
                onClick={() => handleDelete(val?.id)}
              ></i>
            </div>
          </div>
        )
      })}
      <div className="">
        {count.current === 7 ? (
          <></>
        ) : (
          <Button className="border-none text-2xl" onClick={handleAddAnswers}>
            +
          </Button>
        )}
      </div>
    </div>
  )
}

export default MultiSelect