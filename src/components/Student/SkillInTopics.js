import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import TokenExpire from '../Modals/TokenExpire'
import AssignmentInSkill from './AssignmentInSkill'

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

  useEffect(() => {
    handleGetAssignmentsOfSkill()
  }, [handleGetAssignmentsOfSkill])

  return (
    <>
      <div className="flex flex-col gap-3 px-2 py-3">
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
              <AssignmentInSkill
                key={i}
                assignmentOfSkill={assignmentOfSkill}
                isParent={isParent}
                handleDoAssignment={handleDoAssignment}
              />
            )
          })}
        </div>
        <TokenExpire isOpen={isExpired} />
      </div>
    </>
  )
}

export default SkillInTopics
