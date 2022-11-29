import React from 'react'
import { useState } from 'react'
import Button from '../components/Button'
import EditProfileModal from '../components/Modals/EditProfileModal'

const test =
  'https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000'

const Profile = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="px-20 py-10 flex flex-col bg-white h-screen gap-7 items-center">
      <div className="flex flex-row-reverse w-full">
        <Button
          onClick={() => {
            setOpenModal(true)
          }}
          className="shadow-lg"
        >
          Edit profile
        </Button>
        <EditProfileModal isOpen={openModal} setIsOpen={setOpenModal} />
      </div>
      {/* image */}
      <div className="relative flex flex-col">
        <img
          src={test}
          alt=""
          className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5"
        />
        <div className="absolute z-1 w-full select-none flex items-center hover:text-white text-transparent justify-center rounded-full cursor-pointer transition-all hover:bg-gray-500 hover:bg-opacity-90 min-h-[200px]">
          <span>Change image</span>
        </div>
      </div>
      {/* information */}
      <span className="text-3xl font-bold">Full Name</span>
      <span className="bg-green-500 rounded-xl text-white px-10 py-2">
        Role
      </span>
      <div className="w-fit font-[500] text-gray-500 flex flex-col gap-7">
        <div className="flex flex-row gap-5 items-center w-[350px]">
          <span className="flex items-center gap-5 w-[50%]">
            <i className="fa-solid fa-cake-candles ml-1 mr-1"></i> Date of birth
          </span>
          <span>25/04/2001</span>
        </div>
        <div className="flex flex-row gap-5 items-center w-[350px]">
          <span className="flex items-center gap-5 w-[50%]">
            <i className="fa-solid fa-venus-mars"></i> Gender
          </span>
          <span>Male</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
