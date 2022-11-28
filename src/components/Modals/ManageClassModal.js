import React from 'react'

import Modal from 'react-modal'
import Button from '../Button'
import { useForm } from 'react-hook-form'

import classroomBackground from './../../assets/image/classroom-background.jpg'

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

const ManageClassModal = ({ isOpen, setIsOpen, edit }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const classInfo = {
      className: data.className,
      year: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      classImg: '',
    }

    if (edit) {
      return console.log('do edit', classInfo)
    }
    // else add
    console.log(classInfo)
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col w-[500px] h-fit gap-5">
        <span className="text-2xl">{edit ? `Edit` : `Create`} class</span>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* class name */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              {...register('className', { required: true })}
              placeholder="Type in class name"
              className="outline-none px-3 py-1 border-b-2 w-[80%] border-opacity-0 transition-all focus:border-primary"
            />
          </div>
          {/* class image */}
          <div className="flex items-center justify-center w-full">
            <div
              className={`relative rounded-lg min-h-[100px] w-[80%] overflow-hidden flex items-center justify-center bg-center select-none cursor-pointer transition-all`}
            >
              <img
                src={classroomBackground}
                className="h-[200px] w-full"
                alt=""
              />
              <label
                className="absolute z-1 w-full text-transparent hover:text-white hover:bg-gray-800 flex justify-center items-center hover:bg-opacity-50 transition-all min-h-[300px] cursor-pointer"
                htmlFor="image"
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-0 h-0 opacity-0"
                  // onChange={handleChangeImage}
                ></input>
                <span className="text-2xl">Pick an image</span>
              </label>
            </div>
          </div>
          {/*  */}
          <div className="w-full flex flex-row-reverse gap-5">
            <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
            <Button type="submit">{edit ? `Save` : `Create`}</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ManageClassModal
