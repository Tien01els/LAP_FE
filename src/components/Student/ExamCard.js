import React, { useState } from 'react'
import moment from 'moment'

import ExamModal from '../Modals/ExamModal'

const ExamCard = ({ val, isParent }) => {
  const [openExamModal, setOpenExamModal] = useState(false)

  return (
    <>
      <ExamModal
        isOpen={openExamModal}
        setIsOpen={setOpenExamModal}
        val={val}
        isParent={isParent}
      />
      <div
        onClick={() => setOpenExamModal(true)}
        className="bg-white flex flex-col gap-3 w-[260px] rounded-lg px-3 py-3 select-none shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <span className="w-[230px] truncate text-primary">
          {val?.assignment.assignmentName}
        </span>
        <span className="text-xs text-gray-500">
          <i className="fa-regular fa-clock"></i>{' '}
          <span>{val?.assignment.doTime} mins</span>
        </span>
        <div className="flex flex-row justify-between">
          <span className="text-xs text-gray-500">
            <i className="fa-regular fa-calendar"></i>{' '}
            <span>
              {moment(val?.assignment.dateDue).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </span>
          <span className="text-xs text-gray-500"> status</span>
        </div>
      </div>
    </>
  )
}

export default ExamCard
