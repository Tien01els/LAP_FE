import React from 'react'
import { useState } from 'react'
import QuickViewQuestion from '../Modals/QuickViewQuestion'

const ExamQuestion = ({ index }) => {
  const [openQuickView, setOpenQuickView] = useState(false)

  return (
    <div
      onClick={() => setOpenQuickView(!openQuickView)}
      className="flex flex-row bg-[#f4f7f9] justify-between select-non cursor-pointer shadow rounded-lg px-4 py-3"
    >
      <span className="">Question {index}</span>
      <div className="flex flex-row gap-4">
        <span className="bg-primary text-white rounded-full px-2 text-xs flex items-center">
          Multi choice
        </span>
        <span className="text-gray-500">5pt</span>
      </div>
      <QuickViewQuestion isOpen={openQuickView} setIsOpen={setOpenQuickView} />
    </div>
  )
}

export default ExamQuestion
