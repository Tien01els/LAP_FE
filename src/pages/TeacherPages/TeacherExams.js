import React, { useState } from 'react'
import Button from '../../components/Button'

//
import AssignExamModal from '../../components/Modals/AssignExamModal'

const TeacherExams = () => {
  const [openAssignStudent, setOpenAssignStudent] = useState(false)
  return (
    <div className="px-10 py-7 flex h-[100vh] flex-row gap-5">
      <AssignExamModal
        isOpen={openAssignStudent}
        setIsOpen={setOpenAssignStudent}
      />
      {/* left */}
      <div className="flex flex-col gap-5 h-[97%] w-[60%] bg-white rounded-lg shadow lg px-5 py-4">
        <div className="flex flex-col gap-5">
          <span className="text-4xl text-gray-800">Exams Title</span>
          {/* infos */}
          <span className="font-[500]">Exams Information</span>
          <div className="flex flex-row justify-between text-sm items-baseline">
            <div className="flex flex-col gap-1">
              <span>
                <i class="fa-regular fa-calendar"></i> 25 April 2022
              </span>
              <span>
                <i class="fa-regular fa-clock"></i> 30 mins
              </span>
              <span className="text-primary">
                <i class="fa-solid fa-users"></i> 30 students
              </span>
            </div>
            <div className="flex flex-col text-right gap-1">
              <span>Total Score : 50pt</span>
              <span>Pass Score : 25pt</span>
              <span>
                <i class="fa-regular fa-circle-question"></i> 30 Questions
              </span>
            </div>
          </div>
          {/* Question */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-base justify-between">
              <span className="font-[500]">Questions</span>
              <Button className="text-sm flex gap-3 items-center">
                <i class="fa-solid fa-pen-to-square"></i> Edit questions
              </Button>
            </div>
            <div className="flex flex-col h-[300px] py-3 px-2 gap-4 overflow-y-auto">
              {new Array(7).fill(0).map((val, i) => {
                return (
                  <div className="flex flex-row bg-[#f4f7f9] justify-between shadow rounded-lg px-4 py-3">
                    <span className="">Question {i}</span>
                    <div className="flex flex-row gap-4">
                      <span className="bg-primary text-white rounded-full px-2 text-xs flex items-center">
                        Multi choice
                      </span>
                      <span className="text-gray-500">5pt</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-row-reverse">
              <Button onClick={() => setOpenAssignStudent(!openAssignStudent)}>
                Assign
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-3 h-fit w-[40%] bg-white rounded-lg shadow lg px-5 py-4">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl">Exams</span>
          <Button className="text-xs">Create new exam</Button>
        </div>
        <div className="flex flex-wrap gap-5 py-3">
          {new Array(5).fill(0).map((val, i) => {
            return (
              <div className="border h-fit w-full flex flex-row cursor-pointer select-none justify-between items-baseline rounded-lg px-3 py-2">
                <span className="w-[250px] whitespace-normal break-words">
                  Mid Term ádasdakdjalkdasjdt test
                </span>
                <div className="flex flex-row gap-3 text-sm">
                  <span>Status</span>
                  <span className=" text-primary">View</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TeacherExams
