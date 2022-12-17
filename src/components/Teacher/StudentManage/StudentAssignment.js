import React, { useState } from 'react'
import ExamModal from '../../Modals/ExamModal'

const StudentAssignment = ({ assignmentInfo }) => {
  const [openExamModal, setOpenExamModal] = useState(false)

  const { studentAssignment } = assignmentInfo?.assignment

  return (
    <>
      <ExamModal
        isOpen={openExamModal}
        setIsOpen={setOpenExamModal}
        val={assignmentInfo}
        viewStudentResult
      />
      <div
        onClick={() => setOpenExamModal(true)}
        className="flex flex-row ml-3 rounded-lg transition-all hover:bg-gray-50 cursor-pointer px-3 py-2 justify-between items-center"
      >
        <span className="text-primary w-[60%] truncate">
          {assignmentInfo?.assignment?.assignmentName}
        </span>
        <div className="flex flex-row gap-5  text-sm">
          {studentAssignment?.score && (
            <span className="text-gray-400">{studentAssignment.score}.pt</span>
          )}
          {studentAssignment?.score > assignmentInfo.passScore && (
            <span className="text-green-400">Passed</span>
          )}
        </div>
      </div>
    </>
  )
}

export default StudentAssignment
