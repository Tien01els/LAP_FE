import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import moment from 'moment'

import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { utils } from 'react-modern-calendar-datepicker'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker'

import { API_URL } from '../constant'
import Button from '../components/Button'
import TokenExpire from '../components/Modals/TokenExpire'
import createAxiosJWT from '../createAxiosJWT'

const axiosJWT = createAxiosJWT()

const ModalAssign = ({
  modalAssignIsOpen,
  setAssignIsOpen,
  assignId,
  assignmentName,
}) => {
  const currentDate = moment()
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState({
    day: currentDate.date(),
    month: currentDate.month() + 1,
    year: currentDate.year(),
  })
  const [time, setTime] = useState(() => {
    const hours = currentDate.hours()
    const minutes = currentDate.minutes()
    return `${hours > 9 ? hours : '0' + hours}:${
      minutes > 9 ? minutes : '0' + minutes
    }`
  })
  const [isExpired, setIsExpired] = useState(false)

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: formStateCreate,
  } = useForm()

  const formatInputValue = () => {
    if (!selectedDay) return ''
    return `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`
  }

  const handleCloseModalAssign = () => {
    setAssignIsOpen(false)
  }

  const handleCreateAssignment = async (data) => {
    try {
      const assignment = {
        assignmentName: data.assignmentName,
        dueTime: data.dueTime,
        doTime: data.doTime,
        passScore: data.passScore,
        totalScore: data.totalScore,
        redo: data.redo,
      }
      const newAssignment = await axiosJWT.post(
        API_URL + `assignment`,
        assignment,
      )
      const newSkillAssignment = await axiosJWT.post(
        API_URL + `skill-assignment`,
        {
          assignmentId: newAssignment.data?.id,
          skillId: assignId,
        },
      )
      console.log(newSkillAssignment)
      navigate(
        `/skill/${newSkillAssignment.data?.skillId}/assignment/${newSkillAssignment.data?.assignmentId}/`,
      )
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }

  useEffect(() => {
    resetCreate({
      assignmentName: assignmentName,
    })
  }, [resetCreate, assignmentName])

  useEffect(() => {
    if (formStateCreate.isSubmitSuccessful) {
      resetCreate({
        assignmentName: '',
        time: 0,
        totalScore: 100,
        redo: 0,
      })
      setSelectedDay({
        day: currentDate.date(),
        month: currentDate.month() + 1,
        year: currentDate.year(),
      })
      setTime(() => {
        const hours = currentDate.hours()
        const minutes = currentDate.minutes()
        return `${hours > 9 ? hours : '0' + hours}:${
          minutes > 9 ? minutes : '0' + minutes
        }`
      })

      handleCloseModalAssign()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStateCreate, resetCreate])

  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(165, 165, 165, 0.6)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '8px',
      overflow: 'visible',
    },
  }

  return (
    <Modal
      isOpen={modalAssignIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex justify-end">
        <button onClick={handleCloseModalAssign}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col w-[500px]"
          onSubmit={handleSubmitCreate(handleCreateAssignment)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold">Create assignment</h2>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="assignmentName" className="font-[500]">
                Assignment name
              </label>
              <input
                type="text"
                name="assignmentName"
                placeholder="Enter assignment name"
                className="focus:outline-primary border border-gray-500 px-2 py-1 rounded"
                {...registerCreate('assignmentName')}
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="time" className="w-[45%] font-[500]">
                Date due
              </label>
              <div className="flex flex-row w-full items-center gap-2">
                <input
                  type="number"
                  className="border form-control focus:outline-primary px-2 py-1 w-[80%] rounded-md border-gray-500 placeholder:text-sm"
                  placeholder="Will due next ... days since opened"
                  {...registerCreate('dueTime', {
                    min: 1,
                    max: 100,
                    value: 1,
                  })}
                />
                <span>days</span>
              </div>
            </div>
            <div className="flex flex-row items-center w-full">
              <div className="flex flex-col font-[500] w-[45%] gap-4">
                <label htmlFor="totalScore" className="py-1">
                  Total Score
                </label>
                <label htmlFor="passScore" className="py-1">
                  Pass Score
                </label>
                <label htmlFor="time" className="py-1">
                  Time to do
                </label>
                <label htmlFor="redo" className="py-1">
                  Allow redo
                </label>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="number"
                  name="totalScore"
                  className="border form-control focus:outline-primary px-2 py-1 w-[80%] rounded-md border-gray-500"
                  {...registerCreate('totalScore', {
                    min: 0,
                    max: 100,
                    value: 100,
                    valueAsNumber: true,
                    validate: (value) =>
                      (value >= 0 && value <= 100) ||
                      'Please enter from 0 to 100',
                  })}
                />
                <input
                  type="number"
                  name="passScore"
                  className="border form-control focus:outline-primary px-2 py-1 w-[80%] rounded-md border-gray-500"
                  {...registerCreate('passScore', {
                    min: 0,
                    max: 100,
                    value: 10,
                    valueAsNumber: true,
                    validate: (value) =>
                      (value >= 0 && value <= 100) ||
                      'Please enter from 0 to 100',
                  })}
                />
                <div className="flex flex-row gap-2 items-center w-full">
                  <input
                    type="number"
                    name="time"
                    className="border focus:outline-primary px-2 py-1 rounded-md w-[80%] border-gray-500"
                    {...registerCreate('doTime', {
                      min: 1,
                      max: 100,
                      value: 0,
                    })}
                  />
                  <span>min(s)</span>
                </div>
                <div className="flex flex-row gap-2 items-center w-full">
                  <input
                    type="number"
                    name="redo"
                    className="border form-control focus:outline-primary px-2 py-1 rounded-md w-[80%] border-gray-500"
                    {...registerCreate('redo', {
                      min: 0,
                      max: 100,
                      value: 0,
                      valueAsNumber: true,
                    })}
                  />
                  <span>time(s)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="border-none bg-primary mt-5 w-[50%]">
              Create
            </Button>
          </div>
        </form>
      </div>
      <TokenExpire isOpen={isExpired} />
    </Modal>
  )
}

export default ModalAssign
