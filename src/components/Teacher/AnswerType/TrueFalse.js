import React, { useEffect } from 'react'
import { useState } from 'react'

const TrueFalse = ({ questionType, answers, setAnswers }) => {
  const [value, setValue] = useState('')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  const trueAnswer = answers.findIndex((element) => element.isTrue === true)
  const convert = {
    0: 'True',
    1: 'False',
  }

  useEffect(() => {
    if (convert[trueAnswer] !== value) {
      setValue(convert[`${trueAnswer}`])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  useEffect(() => {
    if (convert[trueAnswer] !== value && value) {
      setAnswers([
        { isTrue: value === 'True' ? true : false, answer: 'True' },
        { isTrue: value === 'False' ? true : false, answer: 'False' },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (questionType?.value !== 2) {
      setValue([])
    }
  }, [questionType?.value])

  return (
    <div>
      <div className="hidden" onChange={handleOnChange}>
        <input type="radio" name="right-answer" value="True" id="option-True" />
        <input
          type="radio"
          name="right-answer"
          value="False"
          id="option-False"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 my-5" onChange={handleOnChange}>
        <label
          htmlFor="option-True"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center cursor-pointer select-none"
        >
          <input
            value="True"
            readOnly
            className=" text-white outline-none bg-primary placeholder-gray-100 w-full"
          />
          {value === 'True' ? (
            <div className="w-[23px] h-[20px] rounded-full bg-green-400 text-white  flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[21px] h-[20px] rounded-full border-2  cursor-pointer"></div>
          )}
        </label>
        <label
          htmlFor="option-False"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center select-none  cursor-pointer"
        >
          <input
            value="False"
            className=" text-white outline-none bg-primary placeholder-gray-100 w-full "
            readOnly
          />
          {value === 'False' ? (
            <div className="w-[23px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[21px] h-[20px] rounded-full border-2 "></div>
          )}
        </label>
      </div>
    </div>
  )
}

export default TrueFalse
