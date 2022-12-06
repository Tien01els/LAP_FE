import React, { useEffect } from 'react'
import { useState } from 'react'
import QuickViewQuestion from '../Modals/QuickViewQuestion'
import 'mathlive'

const ExamQuestion = ({ question, index }) => {
  const [openQuickView, setOpenQuickView] = useState(false)

  useEffect(() => {
    const mf = document.querySelector(`#formula-exam-${index}`)
    console.log(mf)
    if (mf) {
      mf.setValue(question?.content)
    }
  }, [question?.content, index])

  return (
    question && (
      <>
        <QuickViewQuestion
          isOpen={openQuickView}
          setIsOpen={setOpenQuickView}
          question={question}
        />
        <div
          onClick={() => setOpenQuickView(!openQuickView)}
          className="flex flex-row bg-[#f4f7f9] justify-between select-non cursor-pointer shadow rounded-lg px-4 py-3"
        >
          {/* <span className="w-[70%] truncate">{question.content}</span> */}
          <math-field
            readOnly
            id={`formula-exam-${index}`}
            style={{
              width: '70%',
            }}
          ></math-field>
          <div className="flex flex-row items-center w-[150px] gap-4">
            <span className="bg-primary text-white rounded-full h-fit px-3 py-1 text-xs flex items-center">
              {(question.questionTypeId === 1 && 'Multi Choice') ||
                (question.questionTypeId === 2 && 'True False') ||
                (question.questionTypeId === 3 && 'Input') ||
                (question.questionTypeId === 4 && 'Multi Select')}
            </span>
            <span className="text-gray-500">{question.score} pt</span>
          </div>
        </div>
      </>
    )
  )
}

export default ExamQuestion
