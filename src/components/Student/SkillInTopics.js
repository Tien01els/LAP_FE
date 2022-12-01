import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import Button from '../Button'
import TokenExpire from '../Modals/TokenExpire'

const axiosJWT = createAxiosJWT()

const SkillInTopics = ({ isTeacher, val, getTopicOfClass }) => {
  const navigate = useNavigate()

  const [openMoreOption, setOpenMoreOption] = useState(false)
  const [assignmentsOfSkill, setAssignmentsOfSkill] = useState([])
  const [isExpired, setIsExpired] = useState(false)

  const handleGetAssignmentsOfSkill = useCallback(async () => {
    try {
      const res = await axiosJWT.get(
        API_URL + `skill-assignment/skill/${val?.id}`,
      )
      setAssignmentsOfSkill(res.data)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [val])

  const handleDoAssignment = async (id) => {
    navigate(`/assignment/${id}/question/`)
  }

  useEffect(() => {
    handleGetAssignmentsOfSkill()
  }, [handleGetAssignmentsOfSkill])

  const handleDeleteSkill = async (id) => {
    try {
      await axiosJWT.delete(API_URL + `skill/${id}`)
      getTopicOfClass()
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }

  return (
    <div className="flex flex-col gap-3 px-2 py-3 ">
      <div className="flex border-b p-y-2 pb-2 flex-row justify-between items-center">
        <span className="text-xl">{val.skillName}</span>
        <div className="flex flex-row gap-5 items-center">
          <span className="text-primary text-sm">{val.standardName}</span>
          {isTeacher && (
            <div className="flex flex-col">
              <div
                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
                  openMoreOption ? `gray-100` : `white`
                } hover:bg-gray-100`}
                onClick={() => setOpenMoreOption(!openMoreOption)}
              >
                <i className="fas fa-ellipsis-h font-xs"></i>
                {openMoreOption && (
                  <div className="absolute z-1 w-[125px] translate-y-14 -translate-x-12 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b">
                    <div
                      className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all"
                      onClick={() => {
                        handleDeleteSkill(val.id)
                      }}
                    >
                      <span>Remove</span>
                    </div>
                    <div className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all">
                      <span>Create Assignment</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {assignmentsOfSkill?.map((val, i) => {
          return (
            <div key={i} className="flex flex-row items-center justify-between">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/assignment-summary/${val.id}/`)
                }}
              >
                {val?.assignment?.assignmentName}
              </span>
              {false ? (
                <Button
                  className="text-xs"
                  onClick={() => handleDoAssignment(val.assignment.id)}
                >
                  Do assignment
                </Button>
              ) : (
                <Button className="text-xs" onClick={() => {}}>
                  View
                </Button>
              )}
            </div>
          )
        })}
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default SkillInTopics
