import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'react-modal'
import Button from '../Button'
import Select from 'react-select'

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'

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

const options = [
  { value: '1', label: 'Male' },
  { value: '2', label: 'Female' },
]

const EditProfileModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit } = useForm()

  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedGender, setSelectedGender] = useState(options[0])

  const onSubmitInfo = (data) => {
    let profile = {
      fullName: data.fullName,
      gender: selectedGender,
      dateOfBirth: selectedDay,
    }
    console.log(profile)
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-4 w-[500px]">
        <span className="text-2xl font-medium">Edit profile</span>
        <form
          onSubmit={handleSubmit(onSubmitInfo)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2 w-full">
            <span>Full name</span>
            <input
              type="text"
              {...register('fullName')}
              placeholder="Type in full name"
              className="outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Gender</span>
            <Select
              options={options}
              onChange={setSelectedGender}
              type="text"
              placeholder="Pick a gender"
            />
          </div>
          <div className="flex flex-col gap-2 z-0 w-full">
            <span>Date of birth</span>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="Select a day"
              calendarClassName="pickday h-[100px] full"
              wrapperClassName="pickday full z-0 cursor-pointer"
              inputClassName={`w-full border-b-2 outline-none`}
            />
          </div>
        </form>
        <div className="flex flex-row-reverse mt-5 gap-5">
          <Button
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmitInfo)}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
