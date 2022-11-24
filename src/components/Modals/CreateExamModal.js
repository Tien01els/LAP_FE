import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

const CreateExamModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    if (data) {
      navigate('/class/1/create-exam')
    }
    console.log(data)
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
          <span className="text-2xl font-medium text-gray-600">
            Create Exam
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-gray-600 gap-4"
        >
          <div className="flex flex-col px-5 w-full gap-4">
            <div className="flex flex-col gap-2 w-full">
              <span>Exams title</span>
              <input
                type="text"
                {...register('assignmentName', { required: true })}
                placeholder="Title"
                className="outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
              />
            </div>
            <div className="flex flex-row w-full gap-5">
              <div className="flex flex-col gap-2 w-[50%]">
                <span>Time to do exams</span>
                <input
                  type="number"
                  {...register('doTime', { required: true, min: 0 })}
                  placeholder="min(s)"
                  className="outline-none px-3  py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2 w-[50%]">
                <span>Will due on next</span>
                <input
                  type="number"
                  {...register('dueTime', { required: true, min: 0 })}
                  placeholder="day(s)"
                  className="outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <span>Total Score</span>
              <input
                type="number"
                {...register('totalScore', { required: true, min: 0 })}
                placeholder="Ex : 100"
                className="outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <span>Pass Score</span>
              <input
                type="number"
                {...register('passScore', { required: true, min: 0 })}
                placeholder="Ex : 10"
                className="outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
              />
            </div>
          </div>
          {/* submit */}
          <div className="flex flex-row-reverse gap-5">
            <Button onClick={() => setIsOpen()}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateExamModal
