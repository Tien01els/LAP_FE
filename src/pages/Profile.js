import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker, {
  utils,
} from '@hassanmojab/react-modern-calendar-datepicker'
import Select from 'react-select'

const test =
  'https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000'

const genders = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
]

const mock = {
  fullName: 'Nhat nguyen',
  dateOfBirth: '25/04/2001',
  gender: 'Male',
}

const Profile = () => {
  //name
  const fullNameRef = useRef(null)
  const [fullName, setFullName] = useState(mock.fullName)
  const [isEditingName, setIsEditingName] = useState(false)

  //birthday
  const [selectedDay, setSelectedDay] = useState(null)

  //gender
  const [gender, setGender] = useState(null)

  const handleEditName = () => {
    fullNameRef.current.focus()
    setIsEditingName(!isEditingName)
  }

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      value={
        selectedDay
          ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
          : ``
      }
      placeholder="Select a date"
      className="text-center outline-none border-b-2 py-1 focus:border-primary  cursor-pointer"
    />
  )

  const handleSave = () => {}

  return (
    <div className="px-20 py-10 flex flex-col bg-white h-screen gap-7 items-center">
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
      <div className="flex flex-row gap-5 items-center">
        <input
          ref={fullNameRef}
          defaultValue={mock.fullName}
          size={fullName?.length}
          onChange={(e) => setFullName(e.target.value)}
          className={`text-2xl text-center active:w-auto min-w-full resize-x font-medium max-w-[600px] text-primary outline-none px-2 transition-all border-b-2 py-2 ${
            isEditingName ? ` border-primary ` : `border-transparent`
          } `}
          readOnly={!isEditingName}
          maxLength={30}
        />
        <i
          onClick={() => handleEditName()}
          className="fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90"
        />
      </div>
      <span className="bg-green-500 rounded-xl text-white px-10 py-2">
        Role
      </span>
      <div className="w-fit font-[500] text-gray-500 flex flex-col gap-7 ml-5">
        <div className="flex flex-row gap-5 items-center w-[400px]">
          <span className="flex items-center gap-5 w-[50%]">
            <i className="fa-solid fa-cake-candles ml-1 mr-1"></i> Date of birth
          </span>
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            renderInput={renderCustomInput}
            shouldHighlightWeekends
          />
        </div>
        <div className="flex flex-row items-center w-full">
          <span className="flex items-center gap-5 w-[50%]">
            <i className="fa-solid fa-venus-mars"></i> Gender
          </span>
          <Select className="w-[50%]" onChange={setGender} options={genders} />
        </div>
      </div>
      <div className="flex flex-row-reverse w-[40%]">
        <Button onClick={handleSave} className="shadow-lg">
          Save
        </Button>
      </div>
    </div>
  )
}

export default Profile
