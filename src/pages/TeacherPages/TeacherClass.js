import React from 'react'
import PageHeader from '../../components/PageHeader'

const TeacherClass = () => {
  const img =
    'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png'
  return (
    <div className="mb-10">
      <PageHeader pageName={`Classes`}></PageHeader>
      <div
        className="bg-auto bg-center w-full h-[300px] flex flex-col-reverse shadow-sm"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="flex flex-col mb-4 ml-10 gap-5">
          <div className="flex pl-3 ">
            <span className="rounded-md pt-1 px-3 justify-center text-2xl font-semibold  text-white bg-[#75b9cc] flex">
              Class Name
            </span>
          </div>
          <div className="flex pl-3">
            <span className="rounded-md pt-1 px-3 bg-[#75b9cc] text-white">
              2022-2023
            </span>
          </div>
        </div>
      </div>

      <div className="mx-10 flex flex-row justify-between mt-10">
        <div className="w-[780px] h-[500px] bg-white shadow-lg rounded-md">
          TOPIC
        </div>
        <div className="w-[400px] h-[200px] bg-white shadow-lg rounded-md">
          <div className="flex flex-col mx-5 my-5 gap-3">
            <div className="flex gap-3">
              <span className="font-semibold">Grade :</span>
              <span>40A</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">Student :</span>
              <span>30</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">Student :</span>
              <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherClass
