import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import ConfirmModal from '../Modals/ConfirmModal'

const ExamItem = ({ val, currentAssignment, setCurrentAssignment }) => {
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)

  const handleDeleteExam = (id) => {
    setModalConfirmDelete(!modalConfirmDelete)
    console.log(id)
  }

  return (
    <div
      onClick={() => {
        setCurrentAssignment(val)
      }}
      className="border h-fit w-full hover:bg-gray-100 transition-all flex flex-row cursor-pointer select-none justify-between items-baseline rounded-lg px-3 py-2"
    >
      <div className="flex flex-col gap-3">
        <span className="w-[250px] truncate">
          {val.assignment?.assignmentName}
        </span>
        <div className="flex flex-row gap-3 text-xs text-gray-500">
          <span>
            <i className="fa-regular fa-calendar"></i>{' '}
            {moment(val.dateOpen).format('MMMM Do YY')}
          </span>
          <span>
            <i className="fa-regular fa-clock"></i>{' '}
            {`${val.assignment?.doTime}   min${
              val.assignment?.doTime > 1 ? 's' : ''
            }`}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-row-reverse items-center gap-5">
          <i
            className="fa-solid fa-xmark text-sm hover:text-red-500 transition-all"
            onClick={() => {
              setModalConfirmDelete(!modalConfirmDelete)
            }}
          ></i>
          <ConfirmModal
            message="Are you sure to delete this?"
            isOpen={modalConfirmDelete}
            setIsOpen={setModalConfirmDelete}
            yesConfirm={() => {
              handleDeleteExam(val?.assignmentId)
            }}
            noConfirm={() => {
              setModalConfirmDelete(!modalConfirmDelete)
            }}
          />
          <span className="text-sm text-primary">
            {currentAssignment?.assignmentId === val?.assignmentId
              ? `Current`
              : ``}
          </span>
        </div>
        <span className="text-xs text-gray-500 flex flex-row-reverse">
          {val.dateDue && moment(val.dateDue) > moment()
            ? moment(val.dateDue).format('DD MMM YYYY')
            : 'Overdue'}
        </span>
      </div>
    </div>
  )
}

export default ExamItem
