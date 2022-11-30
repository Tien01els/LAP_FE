import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'

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
    overflow: 'unset !important',
  },
}

const ExamModal = ({ isOpen, setIsOpen, val }) => {
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleDoAssignment = () => {}

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-4 w-[500px] text-gray-500">
        <span className="text-2xl font-medium text-primary">
          {val?.assignmentName}
        </span>
        <span className=" ">
          <i className="fa-regular fa-clock"></i>{' '}
          <span>{val?.doTime} mins</span>
        </span>
        <div className="flex flex-row justify-between">
          <span className=" text-gray-500">
            <i className="fa-regular fa-calendar"></i>{' '}
            <span>{val?.dateDue}</span>
          </span>
          <span className=" text-gray-500"> status</span>
        </div>
        <span>30 questions</span>
        <div className="flex flex-row justify-between">
          <span>Total score : </span>
          <span>Pass score : </span>
        </div>
      </div>
      <div className="flex flex-row-reverse mt-5 gap-5">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleDoAssignment}>Do assignment</Button>
      </div>
    </Modal>
  )
}

export default ExamModal
