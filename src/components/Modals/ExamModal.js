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
        <div className="flex flex-row ">
          <div className="flex flex-row gap-3 items-center w-[50%]">
            <div className="bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center">
              <i className="fa-regular fa-clock text-primary"></i>
            </div>
            <span>{val?.doTime} mins</span>
          </div>
          <div className="flex flex-row gap-3 items-center ">
            <div className="bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center">
              <i className="fa-regular fa-calendar text-primary"></i>{' '}
            </div>
            <span>{val?.dateDue}</span>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-row gap-3 items-center w-[50%]">
            <div className="bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center">
              <i className="fa-solid fa-clipboard-question text-primary"></i>
            </div>
            <span>30 question</span>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center">
              <i className="fa-regular fa-star text-primary"></i>
            </div>
            <span>Pass score : 30/100 </span>
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center">
            <i className="fa-brands fa-cloudsmith text-primary"></i>
          </div>
          <span className=" text-gray-500"> status</span>
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
