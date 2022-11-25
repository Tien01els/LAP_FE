import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentAssignment = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/assignment/:assignmentId/student/:studentId/result`)
  }

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-row ml-3 rounded-lg transition-all hover:bg-gray-50 cursor-pointer px-3 py-2 justify-between items-center"
    >
      <span className="text-primary">Assignment name</span>
      <div className="flex flex-row gap-5  text-sm">
        <span className="text-gray-400">60.pt</span>
        <span className="text-green-400">Passed</span>
      </div>
    </div>
  )
}

export default StudentAssignment
