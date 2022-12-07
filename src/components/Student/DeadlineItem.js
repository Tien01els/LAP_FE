import React, { useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import ExamModal from '../Modals/ExamModal'

const DeadlineItem = ({ item, selectedDay }) => {
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false)

  return (
    <>
      <ExamModal
        isOpen={openAssignmentModal}
        setIsOpen={setOpenAssignmentModal}
        val={item}
      />
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        layout
        onClick={() => setOpenAssignmentModal(!openAssignmentModal)}
        className="bg-white w-full px-5 py-3 h-[60px] flex justify-between cursor-pointer items-center rounded-lg font-inter font-semibold text-gray-600"
      >
        <div className="flex flex-col max-w-[200px] gap-2">
          <span className="text-sm truncate text-primary">
            {item?.assignment?.assignmentName}
          </span>
          <div className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <span>
              {moment(selectedDay?.day + selectedDay?.month.toString()).format(
                'DD-MMM',
              )}
            </span>
            <span>Due: {moment(item.dateDue).format('hh:mm A')}</span>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default DeadlineItem
