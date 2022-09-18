import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import AssignmentCard from '../../components/Teacher/AssignmentCard'
import ClassCard from '../../components/Teacher/ClassCard'

const TeacherDashBoard = () => {
  const classInfo = {
    name: 'MATH_11ASLDJ3ASDASDSAD',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
    year: '2022-2023',
    grade: '40A',
  }

  const assignments = {
    name: 'ADD & SUB',
    className: 'MATH_12l3adasdasdsad',
    date: '16-Sep',
    time: '4 PM',
  }

  const navigate = useNavigate()
  const [value, onChange] = useState(new Date())

  return (
    <div className="flex flex-col gap-5 h-[100%]">
      <PageHeader pageName={`Dashboard`}></PageHeader>
      <div className="flex flex-row w-full divide-x-2 divide-solid h-[80%]">
        <div className="w-[80%]">
          {/*  */}
          <div className="flex flex-row px-10 pt-2 gap-10">
            <div className="ml-7 flex flex-col gap-5 w-[100%]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">
                  Recently accessed class
                </span>
                <span
                  className="mr-3 text-sm duration-300 hover:cursor-pointer hover:underline underline-offset-4"
                  onClick={() => {
                    navigate('/teacher/class')
                  }}
                >
                  View all
                </span>
              </div>
              <div className="flex flex-row gap-10">
                <ClassCard classInfo={classInfo} />
                <ClassCard classInfo={classInfo} />
                <ClassCard classInfo={classInfo} />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-row px-10 mt-10">
            <div className="ml-7 flex flex-col gap-5 w-[100%]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">
                  Upcoming assignments
                </span>
              </div>
              <div className="flex flex-row gap-10">
                <AssignmentCard assignments={assignments} />
                <AssignmentCard assignments={assignments} />
                <AssignmentCard assignments={assignments} />
              </div>
            </div>
          </div>
        </div>
        {/* calendar */}
        <div className="w-[35%]">
          <div className="flex items-center justify-center">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashBoard
