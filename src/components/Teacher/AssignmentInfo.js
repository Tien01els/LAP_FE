import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { utils } from 'react-modern-calendar-datepicker'
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker'

import { API_URL } from '../../constant'

const AssignmentInfo = ({
  setSelectedAssignmentName,
  setSelectedTotalScore,
  setSelectedTimeDo,
  setSelectedRedo,
  setSelectedTimeDue,
  setSelectedDayDue,
}) => {
  const { assignmentId } = useParams()

  const [assignmentName, setAssignmentName] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)
  const [time, setTime] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  const [examTime, setExamTime] = useState(0)
  const [redo, setRedo] = useState(0)

  const formatInputValue = () => {
    if (!selectedDay) return ''
    return `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`
  }

  const handleExamTime = (e) => {
    setExamTime(e.target.value)
  }

  const handleRedo = (e) => {
    setRedo(e.target.value)
  }

  useEffect(() => {
    setSelectedAssignmentName(assignmentName)
  }, [setSelectedAssignmentName, assignmentName])
  useEffect(() => {
    setSelectedTotalScore(totalScore)
  }, [setSelectedTotalScore, totalScore])
  useEffect(() => {
    setSelectedTimeDo(examTime)
  }, [setSelectedTimeDo, examTime])
  useEffect(() => {
    setSelectedRedo(redo)
  }, [setSelectedRedo, redo])
  useEffect(() => {
    setSelectedTimeDue(time)
  }, [setSelectedTimeDue, time])
  useEffect(() => {
    setSelectedDayDue(selectedDay)
  }, [setSelectedDayDue, selectedDay])

  useEffect(() => {
    axios.get(API_URL + `assignment/${assignmentId}`).then((res) => {
      const assignment = res.data
      const assignmentDate = moment(assignment.dateDue)
      setAssignmentName(assignment.assignmentName)
      setSelectedDay({
        day: assignmentDate.date(),
        month: assignmentDate.month() + 1,
        year: assignmentDate.year(),
      })
      setTime(() => {
        const hours = assignmentDate.hours()
        const minutes = assignmentDate.minutes()
        return `${hours > 9 ? hours : '0' + hours}:${
          minutes > 9 ? minutes : '0' + minutes
        }`
      })
      setExamTime(assignment.time)
      setRedo(assignment.redo)
      setTotalScore(assignment.totalScore)
    })
  }, [assignmentId])

  return (
    <div className="h-fit">
      <div className="flex flex-col justify-between gap-3">
        <input
          className="text-xl min-w-[360px] transition-all max-w-[360px] font-medium outline-none border-b-2 resize-x py-2 px-1"
          value={assignmentName}
          maxLength={45}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              assignmentName === 'Assignment Name'
                ? setAssignmentName('')
                : setAssignmentName(assignmentName)
              // setEnableEdit(!enableEdit);
            }
          }}
          onChange={(e) => {
            setAssignmentName(e.target.value)
          }}
          style={{ width: `${assignmentName.length}ch` }}
        />

        <div className="flex flex-row gap-4 items-center justify-between w-full">
          <label>Will due on next</label>
          <input
            type="number"
            min="0"
            max="200"
            className="outline-none border-b-2 px-1 py-[3px] w-[30%] duration-300 transition-all"
          />
        </div>
        <div className="flex flex-row gap-4 items-center justify-between w-full">
          <label>Pass score</label>
          <input
            type="number"
            min="0"
            className="outline-none border-b-2 px-1 py-[3px] w-[30%] duration-300 transition-all"
          />
        </div>
        <div className="flex flex-row gap-4 items-center justify-between w-full">
          <label>Pass score</label>
          <input
            type="number"
            min="0"
            className="outline-none border-b-2 px-1 py-[3px] w-[30%] duration-300 transition-all"
          />
        </div>
        <div className="flex flex-row gap-10 items-center ">
          <div className="flex items-center justify-between w-full">
            <span>Exam time in</span>
            <div className="w-[30%] flex flex-row gap-2 items-center">
              <input
                className="outline-none border-b-2 px-2 py-[3px] justify-center items-center w-[50px] text-right duration-300 transition-all"
                value={examTime}
                onChange={handleExamTime}
              />
              <span>m</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-10 items-center">
          <div className="flex gap-2 items-center w-full justify-between">
            <span>Redo</span>
            <div className="w-[30%] flex flex-row gap-2 items-center">
              <input
                className="outline-none border-b-2 px-[10px] py-[3px] justify-center items-center text-right w-[50px] duration-300 transition-all"
                value={redo}
                onChange={handleRedo}
              />
              <span>time{redo > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentInfo
