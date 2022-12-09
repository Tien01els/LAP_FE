import React from 'react'
import { customStyles } from '../../../constant'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import Button from '../../Button'

const ManageQuestionTypeModal = ({ isOpen, setIsOpen }) => {
  const { register: registerQType, handleSubmit: createQType } = useForm()

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const createNewQType = (data) => {
    console.log({ ...data })
  }

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <form
        className="flex flex-col gap-5 w-[500px]"
        onSubmit={createQType(createNewQType)}
      >
        <span className="text-2xl font-[500]">Create question type</span>
        <div className="flex flex-col gap-2 px-2 w-full">
          <span className="px-2">Question type</span>
          <input
            type="text"
            {...registerQType('typeName', { required: true })}
            placeholder="Type in type name"
            className="outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <Button type="submit">Create</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default ManageQuestionTypeModal
