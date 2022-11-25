import React from 'react'
import StudentAssignment from './StudentAssignment'

const StudentSkill = () => {
  return (
    <div className="flex ml-7 flex-col gap-4">
      <span className="">
        <i className="fa-solid fa-book text-gray-500"></i> Skill name
      </span>
      <div className="flex flex-col gap-3">
        {new Array(3).fill(0).map((val, i) => {
          return <StudentAssignment />
        })}
      </div>
    </div>
  )
}

export default StudentSkill
