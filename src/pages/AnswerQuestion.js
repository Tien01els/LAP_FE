import React, { useState } from 'react'
import Button from '../components/Button'
import MultiChoice from '../components/Teacher/AnswerType/MultiChoice'

const answerType = 'multichoice'
const answers = [
  { isTrue: true, answer: 'Hehe' },
  { isTrue: false, answer: 'Huhu' },
  { isTrue: false, answer: 'Hihi' },
  { isTrue: false, answer: 'hoho' },
]

const AnswerQuestion = () => {
  //   const [countdown, setCountdown] = useState()

  const renderAnswer = () => {
    switch (answerType) {
      case 'multichoice':
        return (
          <div>
            <MultiChoice answers={answers} setAnswers={() => {}} />
          </div>
        )
      default:
        return <div>404</div>
    }
  }

  //   setInterval(() => {
  //     setCountdown((prevState) => prevState - 1)
  //   }, 1000)

  return (
    <div className="flex flex-col px-10 gap-5 py-7">
      <h2 className="font-semibold font-inter px-3 text-xl">Assignment name</h2>
      <div className="flex flex-row gap-5 h-[full] w-full">
        {/* right */}
        <div className="flex flex-col w-[65%] gap-5">
          <div className="w-full bg-white shadow rounded-lg px-12 pt-7 pb-5 flex flex-col gap-5 text-justify">
            <div className="flex">
              <h2 className="font-semibold font-inter text-primary rounded-lg text-xl">
                Question - 10
              </h2>
            </div>
            {/* problem */}
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
            {/* answer */}
            <div className="">{renderAnswer()}</div>
            {/* Next */}
            <div className="flex flex-row-reverse">
              <Button className="border-none">Save</Button>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="flex flex-col gap-5 w-[35%]">
          <div className="flex flex-col h-[450px] pt-7 px-5 pb-5 items-center bg-white justify-between rounded-lg shadow">
            <div className="flex flex-col items-center gap-3 h-full ">
              <span className="font-semibold text-2xl text-primary">
                01 : 10
              </span>
              <div className="flex flex-wrap gap-5 max-h-[300px] px-5 overflow-y-auto py-3">
                {new Array(20).fill(0).map((item, i) => {
                  return (
                    <div className="h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-500 hover:outline-green-500 rounded overflow-hidden transition-all cursor-pointer select-none">
                      <div className="flex justify-center items-center">
                        <span>{i + 1}</span>
                      </div>
                      <div className="text-white flex w-full h-full items-center justify-center bg-green-500">
                        <i className="fas fa-check text-[8px]"></i>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <Button className="border-none w-[70%]">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerQuestion
