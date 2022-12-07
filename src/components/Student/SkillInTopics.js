import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import Button from '../Button'
import TokenExpire from '../Modals/TokenExpire'

const axiosJWT = createAxiosJWT()

const SkillInTopics = ({ val, isParent, studentInfo }) => {
  const navigate = useNavigate()
  const [assignmentsOfSkill, setAssignmentsOfSkill] = useState([])
  const [isExpired, setIsExpired] = useState(false)

  const handleGetAssignmentsOfSkill = useCallback(async () => {
    try {
      let res
      if (isParent) {
        if (studentInfo) {
          res = await axiosJWT.get(
            API_URL +
              `parent/student/${studentInfo?.id}/skill/${val?.skill?.id}`,
          )
        }
      } else {
        res = await axiosJWT.get(
          API_URL + `skill-assignment/student/skill/${val?.skill?.id}`,
        )
      }

      setAssignmentsOfSkill(res.data)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [val?.skill?.id, isParent, studentInfo])

  const handleDoAssignment = async (id, temp) => {
    try {
      if (temp === 'start')
        await axiosJWT.put(
          API_URL + `student-assignment/student/assignment/${id}/start`,
        )
      navigate(`/assignment/${id}/question/`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }

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

  useEffect(() => {
    handleGetAssignmentsOfSkill()
  }, [handleGetAssignmentsOfSkill])

  return (
    <div className="flex flex-col gap-3 px-2 py-3 ">
      <div className="flex border-b p-y-2 pb-2 flex-row justify-between items-center">
        <span className="text-xl">{val?.skill.skillName}</span>
        <div className="flex flex-row gap-5 items-center">
          <span className="text-primary text-sm">
            {val?.skill.standardName}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {assignmentsOfSkill?.map((assignmentOfSkill, i) => {
          return (
            <div key={i} className="flex flex-row items-center justify-between">
              <span>{assignmentOfSkill?.assignment?.assignmentName}</span>
              {renderAssignmentButton(assignmentOfSkill)}
            </div>
          )
        })}
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default SkillInTopics
