import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import ExamQuestion from '../../components/Teacher/ExamQuestion'
import AssignExamModal from '../../components/Modals/AssignExamModal'
import CreateExamModal from '../../components/Modals/CreateExamModal'
import ExamItem from '../../components/Teacher/ExamItem'
import TokenExpire from '../../components/Modals/TokenExpire'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()
const TeacherExams = () => {
  const { classId } = useParams()
  const [isExpired, setIsExpired] = useState(false)
  const [openAssignStudent, setOpenAssignStudent] = useState(false)
  const [openCreateExam, setOpenCreateExam] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [currentAssignment, setCurrentAssignment] = useState({})
  const navigate = useNavigate()

  const getAssignmentOfClass = useCallback(
    async (currentAssignmentId) => {
      try {
        const { data } = await axiosJWT.get(
          API_URL + `class-assignment/class/${classId}`,
        )
        setAssignments(data)
        if (data?.length) {
          const assignment = data?.find(
            (assign) => assign.assignment.id === currentAssignmentId,
          )
          if (assignment) setCurrentAssignment(assignment)
          else setCurrentAssignment(data[0])
        } else setCurrentAssignment({})
      } catch (error) {
        console.log(error)
        if (error.response.status === 401) setIsExpired(true)
      }
    },
    [classId],
  )

  useEffect(() => {
    console.log(currentAssignment)
  }, [currentAssignment])

  useEffect(() => {
    getAssignmentOfClass()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-10 py-7 flex h-full flex-row gap-5">
      <CreateExamModal
        isOpen={openCreateExam}
        setIsOpen={setOpenCreateExam}
        assignId={classId}
        typeAssignment="Class"
      />
      {/* left */}
      <div className="flex flex-col gap-5 h-fit w-[60%] bg-white rounded-lg shadow lg px-5 py-4">
        {currentAssignment?.assignment && (
          <div className="flex flex-col gap-5 h-fit">
            <AssignExamModal
              isOpen={openAssignStudent}
              setIsOpen={setOpenAssignStudent}
              classId={classId}
              currentAssignment={currentAssignment}
              studentsOfAssignment={
                currentAssignment.assignment.studentAssignment
              }
              getAssignmentOfClass={getAssignmentOfClass}
            />
            <span className="text-4xl w-[650px] truncate text-gray-800">
              {currentAssignment.assignment?.assignmentName}
            </span>
            {/* infos */}
            <span className="font-[500]">Exams Information</span>
            <div className="flex flex-row justify-between text-sm items-baseline">
              <div className="flex flex-col gap-3">
                {/* datedue */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-regular fa-calendar"></i>
                  </div>
                  <span>
                    {moment(currentAssignment.dateOpen).format('MMMM Do YY')}
                  </span>
                </div>
                {/* do time */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <span>{`${currentAssignment.assignment?.doTime} min${
                    currentAssignment.assignment?.doTime > 1 ? 's' : ''
                  }`}</span>
                </div>
                {/* students */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  {`${
                    currentAssignment.assignment?.studentAssignment.length
                  } student${
                    currentAssignment.assignment?.studentAssignment.length > 1
                      ? 's'
                      : ''
                  }`}
                </div>
              </div>
              <div className="flex flex-col gap-3 w-[35%]">
                {/* total score */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <span>
                    Total Score: {currentAssignment.assignment?.totalScore} pt
                  </span>
                </div>
                {/* Pass score */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <span>
                    Pass Score: {currentAssignment.assignment?.passScore} pt
                  </span>
                </div>
                {/* questions */}
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex items-center w-[40px] h-[40px] bg-gray-100 rounded-lg justify-center">
                    <i className="fa-regular fa-circle-question"></i>
                  </div>
                  <span>
                    {`${
                      currentAssignment.assignment?.assignmentQuestion.length ||
                      0
                    } question${
                      currentAssignment.assignment?.assignmentQuestion.length >
                      1
                        ? 's'
                        : ''
                    }`}
                  </span>
                </div>
              </div>
            </div>
            {/* Question */}
            <div className="flex flex-col h-full gap-5 ">
              <div className="flex flex-row items-base justify-between">
                <span className="font-[500]">Questions</span>
                <Button
                  onClick={() =>
                    navigate(
                      `/class/${classId}/assignment/${currentAssignment.assignment.id}`,
                    )
                  }
                  className="text-sm flex gap-3 items-center"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit questions
                </Button>
              </div>
              <div className="flex flex-col h-[380px] py-3 px-2 gap-4 overflow-y-auto">
                {currentAssignment?.assignment?.assignmentQuestion &&
                  currentAssignment?.assignment?.assignmentQuestion.map(
                    (val, i) => {
                      return (
                        <ExamQuestion
                          key={val.questionId}
                          question={val.question}
                        />
                      )
                    },
                  )}
              </div>
              <div className="flex flex-row-reverse">
                <Button
                  onClick={() => setOpenAssignStudent(!openAssignStudent)}
                >
                  Assign
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* right */}
      <div className="flex flex-col gap-3 h-[100%] w-[40%] bg-white rounded-lg shadow lg px-5 py-4">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl">Exams</span>
          <Button
            onClick={() => setOpenCreateExam(!openCreateExam)}
            className="text-xs"
          >
            Create new exam
          </Button>
        </div>
        <div className="flex flex-col gap-5 pr-2 h-[400px] overflow-auto">
          {assignments &&
            assignments.map((val, i) => {
              return (
                <ExamItem
                  key={i}
                  val={val}
                  currentAssignment={currentAssignment}
                  setCurrentAssignment={setCurrentAssignment}
                  getAssignmentOfClass={getAssignmentOfClass}
                />
              )
            })}
        </div>
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default TeacherExams
