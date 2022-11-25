import moment from 'moment'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const TeacherReviewAnswers = () => {
  const { assignmentId } = useParams()
  const [assignment, setAssignment] = useState({
    assignmentName: 'Test',
    time: 30,
    totalScore: 30,
  })
  const [questionList, setQuestionlist] = useState([
    {
      content: 'ádjslakdjasldkjdlasjdklasd',
      score: '10',
      answer: 'áljdklasdjaklsdjklasjdlaksdjlks',
    },
    {
      content: 'ádjslakdjasldkjdlasjdklasd',
      score: '10',
      answer: 'áljdklasdjaklsdjklasjdlaksdjlks',
    },
    {
      content: 'ádjslakdjasldkjdlasjdklasd',
      score: '10',
      answer: 'áljdklasdjaklsdjklasjdlaksdjlks',
    },
  ])

  const executeScroll = (id) => {
    let elementId = `question-${id}`
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="px-10 py-7 flex flex-row">
      {/* left */}
      <div className=" bg-white  w-[40%] h-fit px-5 py-4 shadow rounded-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-[500] text-primary">
              {assignment.assignmentName}
            </span>
            <span className="text-gray-500 text-sm">
              <i className="fa-regular fa-clock"></i> {assignment.time} mins -{' '}
              <i className="fa-regular fa-calendar"></i>{' '}
              {moment(assignment.dateDue).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span className="font-base">
              Total Score: {assignment?.totalScore}
            </span>
          </div>
          {/* answers */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-base">Answers</span>
            <div className="flex flex-wrap gap-5 px-2 py-3 rounded-xl items-center">
              {questionList.map((val, i) => {
                return (
                  <div
                    onClick={() => executeScroll(i)}
                    key={i}
                    className="h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-200 hover:outline-primary rounded overflow-hidden transition-all cursor-pointer select-none"
                  >
                    <div className="flex justify-center items-center">
                      <span>{i + 1}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="px-10 gap-5 h-[90vh] w-[60%] overflow-y-auto  items-center justify-center">
        <div className="flex flex-col gap-5 pb-5 ">
          {questionList.map((val, i) => {
            return (
              <div
                id={`question-${i}`}
                key={i}
                className="flex flex-row gap-5 w-full bg-white rounded-lg shadow px-3 py-3"
              >
                <div className="w-[80px] h-[80px] flex items-center justify-center bg-primary rounded-lg select-none">
                  <span className="text-white text-xl font-semibold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-3">
                      <span className="text-xl w-[480px]">{val?.content}</span>
                    </div>
                    <span className="text-sm text-gray-400 pt-1">
                      {val?.score}pt
                    </span>
                  </div>
                  <div className="text-sm flex flex-row items-center gap-5">
                    <div className="bg-[#dcedfd] w-[480px] flex justify-between px-3 py-5 rounded-lg">
                      <span className="max-w-[430px] break-words whitespace-normal">
                        {val?.answer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TeacherReviewAnswers
