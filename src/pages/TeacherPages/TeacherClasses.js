import React, { useState, useEffect } from 'react'
import ClassCard from '../../components/Teacher/ClassCard'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import Button from '../../components/Button'
import CreateClassModal from '../../components/Modals/CreateClassModal'

const axiosJWT = createAxiosJWT()
const TeacherClasses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openCreateClassModal, setOpenCreateClassModal] = useState(false)
  // const classInfo = [
  //   {
  //     name: 'Sinh',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
  //     year: '2022-2023',
  //     grade: '40A',
  //   },
  //   {
  //     name: 'Ly',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
  //     year: '2022-2023',
  //     grade: '40A',
  //   },
  //   {
  //     name: 'Hoa',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
  //     year: '2022-2023',
  //     grade: '40A',
  //   },
  // ]
  const [Classes, setClasses] = useState([])

  const teacherId = 1

  useEffect(() => {
    axiosJWT.get(API_URL + `class/teacher`).then((res) => {
      setClasses(res.data)
    })
  }, [teacherId])

  return (
    <div className="flex flex-col mt-10 gap-5 h-[100vh]">
      <div className="flex flex-col px-10 ml-7 pt-2">
        <div className="flex flex-row justify-between items-center mr-[4.2rem]">
          <span className="text-2xl font-[500]">Active Class</span>
          <div className="flex flex-row gap-5 items-center">
            <Button
              onClick={() => {
                setOpenCreateClassModal(true)
              }}
              className="shadow-lg"
            >
              Create a class
            </Button>
            <CreateClassModal
              isOpen={openCreateClassModal}
              setIsOpen={setOpenCreateClassModal}
            />
            <input
              placeholder="Search..."
              className="flex justify-center shadow-md focus:shadow-lg items-center pr-10 transition-all px-5 py-2 rounded-md outline-none"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-5 gap-10 mb-10">
          {Classes.filter((val) => {
            if (
              searchTerm === '' ||
              val.className.toLowerCase().includes(searchTerm.toLowerCase())
            )
              return val
            return ''
          }).map((val, index) => {
            return <ClassCard layout key={val?.id} classInfo={val} />
          })}
        </div>
      </div>
    </div>
  )
}

export default TeacherClasses
