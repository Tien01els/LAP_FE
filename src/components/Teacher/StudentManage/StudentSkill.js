import React from 'react'
import StudentAssignment from './StudentAssignment'

const StudentSkill = ({ skill }) => {
  return (
    <div className="flex ml-7 flex-col gap-4">
      <span className="w-[85%] truncate">
        <i className="fa-solid fa-book text-gray-500"></i> {skill?.skillName}
      </span>
      <div className="flex flex-col gap-3">
        {skill?.skillAssignment?.length > 0 &&
          skill?.skillAssignment?.map((val, i) => {
            return <StudentAssignment key={i} assignmentInfo={val} />
          })}
      </div>
    </div>
  )
}

export default StudentSkill
