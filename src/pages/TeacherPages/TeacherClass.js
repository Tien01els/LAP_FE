import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import DetailsCard from '../../components/Teacher/DetailsCard'
import DeleteClassModal from '../../components/Modals/DeleteClassModal'
import ManageClassModal from '../../components/Modals/ManageClassModal'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()
const image =
  'https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000'
const TeacherClass = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const [classInfo, setClassInfo] = useState({})

  const [openModalDeleteClass, setOpenModalDeleteClass] = useState(false)
  const [openModalEditClass, setOpenEditDeleteClass] = useState(false)

  useEffect(() => {
    const getClassInfo = async (classId) => {
      try {
        const res = await axiosJWT.get(API_URL + `class/${classId}}`)
        setClassInfo(res.data)
      } catch (err) {
        navigate(-1)
      }
    }
    getClassInfo(classId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId])

  return (
    <div className="mt-8 mx-20 mb-5">
      {/* <PageHeader pageName={`Classes`}></PageHeader> */}
      <div className="flex flex-col gap-7">
        {/* top */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2 items-center">
            <i className="fas fa-caret-left text-xl font-bold"></i>
            <span
              className="underline underline-offset-4 font-semibold cursor-pointer"
              onClick={() => {
                navigate('/class')
              }}
            >
              All Classes
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <Button
              onClick={() => setOpenModalDeleteClass(true)}
              className="bg-red-500 text-white border-none shadow-lg relative flex flex-row justify-center items-center gap-3"
            >
              Delete Class
            </Button>
            <Button
              onClick={() => {
                setOpenEditDeleteClass(true)
              }}
              className="bg-white text-primary border-none shadow-lg relative flex flex-row justify-center items-center gap-3"
            >
              Edit Class
            </Button>
          </div>
          <DeleteClassModal
            isOpen={openModalDeleteClass}
            setIsOpen={setOpenModalDeleteClass}
            classId={classId}
          />
          <ManageClassModal
            isOpen={openModalEditClass}
            setIsOpen={setOpenEditDeleteClass}
            classInfo={classInfo}
            setClassInfo={setClassInfo}
            edit
          />
        </div>
        {/* class infos */}
        <div className="flex flex-col justify-center items-center">
          <img
            src={classInfo?.classImg || image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = image
            }}
            alt=""
            className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5 object-cover"
          />
          <span className="font-bold text-3xl my-3">
            {classInfo?.className}
          </span>
          <span className="">
            Date created:{' '}
            {`${moment(classInfo?.createdAt).format('MM/DD/YYYY')}`}
          </span>
        </div>

        {/* detail cards */}
        <div className="px-16 flex flex-row gap-32 justify-center items-center">
          <DetailsCard
            value={classInfo?.numberAssignments || 0}
            title="Exams"
            shadow="teacherdetails__AScore"
            color={'text-[#00d4ff]'}
            nav={`/class/${classId}/exams`}
          />
          <DetailsCard
            value={classInfo?.numberTopics || 0}
            title="Topics"
            shadow="teacherdetails__Topics"
            color="text-[#9fff24]"
            nav={`/class/${classId}/topic`}
          />
          <DetailsCard
            value={classInfo?.numberStudents || 0}
            title="Students"
            shadow="teacherdetails__Students"
            color="text-[#ff24cf78]"
            nav={`/class/${classId}/manage-student`}
          />
        </div>
      </div>
    </div>
  )
}

export default TeacherClass
