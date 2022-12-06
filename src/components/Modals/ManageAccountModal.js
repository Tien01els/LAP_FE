import React, { useState } from 'react'

import Modal from 'react-modal'
import Button from '../Button'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useEffect } from 'react'

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

const options = [
  { value: '1', label: 'Admin' },
  { value: '2', label: 'Teacher' },
  { value: '3', label: 'Student' },
  { value: '4', label: 'Parent' },
]

const ManageAccountModal = ({ isOpen, setIsOpen, edit }) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const [isStudentRole, setIsStudentRole] = useState(false)

  let watchRole = watch('role')
  console.log(errors.email)

  useEffect(() => {
    if (watchRole?.value === '3') {
      setIsStudentRole(true)
    } else {
      setIsStudentRole(false)
    }
  }, [watchRole])

  const createAccount = (data) => {
    console.log(data)
  }
  return (
    <Modal
      id="AccountManageModal"
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col w-[500px] h-fit gap-5">
        <span className="text-2xl">{edit ? `Edit` : `Create`} class</span>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(createAccount)}
        >
          <div className="flex flex-col gap-2 px-2">
            <span className="px-2">Role</span>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Pick a role"
                />
              )}
            />
          </div>
          {isStudentRole && (
            <div className="flex flex-col gap-2 px-2 w-full">
              <span className="px-2">Parent id</span>
              <input
                {...register('parentId', { required: true })}
                placeholder="Parent id"
                className="outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
              />
            </div>
          )}
          {/* class name */}
          <div className="flex flex-col gap-2 px-2 w-full">
            <span className="px-2 flex flex-row justify-between items-center">
              Email
              {errors.email?.type === 'pattern' && (
                <p
                  role="alert"
                  className="text-red-500 w-full text-right text-sm"
                >
                  Wrong email format
                </p>
              )}
            </span>

            <input
              type="text"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Please enter valid Email',
                },
              })}
              placeholder="Type in email"
              className="outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-2 px-2 w-full">
            <span className="px-2">Password</span>
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Type in password"
              className="outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
            />
          </div>
          {/* role */}

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

export default ManageAccountModal
