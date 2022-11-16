import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'

const AssignExamModal = ({ isOpen, setIsOpen }) => {
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
    },
  }
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen()}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-4 w-[500px]">
        <div className="flex flex-row justify-between">
          <span className="text-2xl font-medium">Assign Students</span>
          <input
            type="text"
            className="bg-[#f4f7f9] rounded-lg shadow px-2 outline-none mr-2"
            placeholder="Search student"
          />
        </div>
        <div className="flex flex-col gap-4 px-2 py-2 h-[350px] overflow-y-auto">
          {new Array(15).fill(0).map((val, i) => {
            return (
              <label
                htmlFor={`student-${i}`}
                className="w-full flex flex-row bg-[#f4f7f9] cursor-pointer gap-5 h-fit px-4 py-2 rounded-lg"
              >
                <input id={`student-${i}`} type="checkbox" className=""></input>
                <span>Student Name</span>
                <span className="text-gray-500">avS : 68</span>
              </label>
            )
          })}
        </div>
        <div className="flex flex-row-reverse gap-5">
          <Button
            onClick={() => setIsOpen()}
            className="bg-white text-primary shadow-primary shadow"
          >
            Cancel
          </Button>
          <Button onClick={() => {}}>Assign</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AssignExamModal
