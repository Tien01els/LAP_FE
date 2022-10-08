import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const TrueFalse = ({ answers, setAnswers }) => {
  const [value, setValue] = useState('')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const trueAnswer = answers.findIndex((element) => element.isTrue === true)
    const convert = {
      0: 'a',
      1: 'b',
    }
    setValue(convert[`${trueAnswer}`])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAnswers([
      { id: uuid(), isTrue: value === 'a' ? true : false, answer: 'True' },
      { id: uuid(), isTrue: value === 'b' ? true : false, answer: 'False' },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div>
      <div className="hidden" onChange={handleOnChange}>
        <input type="radio" name="right-answer" value="a" id="option-a" />
        <input type="radio" name="right-answer" value="b" id="option-b" />
      </div>
      <div className="grid grid-cols-2 gap-5 my-5" onChange={handleOnChange}>
        <label
          htmlFor="option-a"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center cursor-pointer select-none"
        >
          <input
            value="True"
            readOnly
            className=" text-white outline-none bg-primary placeholder-gray-100 w-full"
          />
          {value === 'a' ? (
            <div className="w-[23px] h-[20px] rounded-full bg-green-400 text-white  flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[21px] h-[20px] rounded-full border-2  cursor-pointer"></div>
          )}
        </label>
        <label
          htmlFor="option-b"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center select-none  cursor-pointer"
        >
          <input
            value="False"
            className=" text-white outline-none bg-primary placeholder-gray-100 w-full "
            readOnly
          />
          {value === 'b' ? (
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
