import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import ExamModal from '../Modals/ExamModal'

const AssignmentInSkill = ({
  assignmentOfSkill,
  isParent,
  handleDoAssignment,
}) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const renderAssignmentButton = (assignmentOfSkill) => {
    if (
      isParent &&
      assignmentOfSkill?.assignment?.studentAssignment[0]?.dateComplete
    ) {
      return (
        <Button
          className="text-xs"
          onClick={() => {
            navigate(`/assignment/${assignmentOfSkill.assignment.id}/result`)
          }}
        >
          View Result
        </Button>
      )
    }
    if (!isParent) {
      if (assignmentOfSkill?.numberQuestionOfAssignment === 0) {
        return <></>
      }
      return assignmentOfSkill?.assignment?.studentAssignment[0]
        ?.dateComplete ? (
        <Button
          className="text-xs"
          onClick={() => {
            navigate(`/assignment/${assignmentOfSkill.assignment.id}/result`)
          }}
        >
          View Result
        </Button>
      ) : !assignmentOfSkill?.assignment?.studentAssignment[0]?.dateEnd ? (
        <Button
          className="text-xs"
          onClick={() =>
            handleDoAssignment(assignmentOfSkill.assignment.id, 'start')
          }
        >
          Do Assignment
        </Button>
      ) : (
        <Button
          className="text-xs"
          onClick={() =>
            handleDoAssignment(assignmentOfSkill.assignment.id, 'continue')
          }
        >
          Continue Assignment
        </Button>
      )
    }
  }

  console.log(assignmentOfSkill)

  return (
    <>
      <ExamModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        val={assignmentOfSkill}
        isParent={isParent}
      />
      <div className="flex flex-row items-center justify-between">
        <span
          onClick={() => {
            setOpenModal(true)
          }}
          className="cursor-pointer w-[70%] truncate text-primary"
        >
          {assignmentOfSkill?.assignment?.assignmentName}
        </span>
        {renderAssignmentButton(assignmentOfSkill)}
      </div>
    </>
  )
}

export default AssignmentInSkill
