import React from 'react'
import 'mathlive'
import { useEffect } from 'react'

const Result = ({
  questionOfStudent,
  index,
  getCorrectAnswerOfQuestion,
  listQuestionOfAssignment,
  checkStudentAnswered,
}) => {
  useEffect(() => {
    const mf = document.querySelector(`#formula-${index}`)
    mf.setValue(
      String.raw`\begin{multline}
  ` +
        questionOfStudent?.content +
        String.raw`
  \end{multline}`,
    )
  }, [questionOfStudent?.content])

  return (
    <div className="flex flex-row gap-5 w-full bg-white rounded-lg shadow px-3 py-3">
      <div className="w-[80px] h-[80px] flex items-center justify-center bg-primary rounded-lg select-none">
        <span className="text-white text-xl font-semibold">{index + 1}</span>
      </div>
      <div className="flex flex-col gap-3 w-[80%]">
        <div className="flex flex-row  justify-between">
          <div className="flex flex-col gap-3 w-[90%]">
            <math-field
              id={`formula-${index}`}
              style={{
                whiteSpace: 'initial',
                fontSize: '20px',
                outline: 'none',
                userSelect: 'none',
                width: '100%',
                maxHeight: '150px',
                overflowWrap: 'break-word',
                fontFamily: 'Poppins',
              }}
              readonly
            ></math-field>
            <span>
              Correct Answer:{' '}
              {getCorrectAnswerOfQuestion(
                listQuestionOfAssignment.find(
                  (questionOfAssignment) =>
                    questionOfAssignment.questionId ===
                    questionOfStudent.questionId,
                ),
              )}
            </span>
          </div>
          <span className="text-sm text-gray-400 pt-1">
            {questionOfStudent.score}pt
          </span>
        </div>
        <div className="text-sm flex flex-row items-center gap-5">
          <div className="bg-[#dcedfd] w-[480px] flex justify-between px-3 py-5 rounded-lg">
            <span className="max-w-[430px] break-words whitespace-normal">
              Your Answer: {checkStudentAnswered(questionOfStudent)}
            </span>
          </div>
          {/* sai nao thi lay do */}
          <div>
            {questionOfStudent?.answerOfStudent?.isCorrect ? (
              <i className="fa-solid fa-circle-check text-xl text-green-400"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark text-xl text-red-500"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
