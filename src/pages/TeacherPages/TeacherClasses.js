import React from 'react'
import PageHeader from '../../components/PageHeader'
import ClassCard from '../../components/Teacher/ClassCard'

const TeacherClasses = () => {
  const classInfo = {
    name: 'MATH_11ASLDJ3ASDASDSAD',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
    year: '2022-2023',
    grade: '40A',
  }
  return (
    <div className="flex flex-col gap-5 h-[100%]">
      <PageHeader pageName={`Classes`}></PageHeader>
      <div className="flex flex-col px-10 ml-7 pt-2">
        <span className="text-xl font-semibold ">Active Class</span>
        <div className="flex flex-row flex-wrap mt-5 gap-10 mb-10">
          {new Array(8).fill(0).map((item, index) => {
            return <ClassCard key={index} classInfo={classInfo} />
          })}
        </div>
      </div>
    </div>
  )
}

export default TeacherClasses
