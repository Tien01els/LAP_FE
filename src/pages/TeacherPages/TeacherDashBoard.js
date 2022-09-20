import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClassCard from '../../components/Teacher/ClassCard'

// import 'react-modern-calendar-datepicker/lib/DatePicker.css'
// import { Calendar } from 'react-modern-calendar-datepicker'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TeacherDashBoard = () => {
  const classInfo = {
    name: 'MATH_11ASLDJ3ASDASDSAD',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU',
    year: '2022-2023',
    grade: '40A',
  }

  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(null)

  const options = {
    responsive: 'true',
    plugins: {
      legend: {
        position: `'top' as const`,
      },
      title: {
        display: 'true',
        text: 'Average Score',
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 0,
              stepValue: 0,
              max: 100,
            },
          },
        ],
      },
    },
  }

  const labels = ['MATH_333', 'MATH_33323', 'MATH_113', 'MATH_44', 'MATH_AB32']

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(117,185,204)',
        backgroundColor: 'rgb(117,185,204, 0.5)',
      },
    ],
  }

  return (
    <div className="flex flex-col gap-5 h-[100%]">
      {/* <PageHeader pageName={`Dashboard`}></PageHeader> */}
      <div className="flex flex-row mt-8 w-full divide-solid h-[80%]">
        <div className="w-[70%] overflow-hidden gap-2">
          <div className="flex justify-center ml-[68px] bg-white  py-5 px-10 rounded-md shadow-lg w-[710px]">
            <Bar className="" options={options} data={data} />
          </div>
          {/*  */}
          <div className="flex flex-row px-10 pt-12 gap-10 mb-5">
            <div className="ml-7 flex flex-col gap-5 w-[100%]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">Recently accessed</span>
                <span
                  className="mr-3 text-sm duration-300 hover:cursor-pointer hover:underline underline-offset-4"
                  onClick={() => {
                    navigate('/teacher/class')
                  }}
                >
                  View all
                </span>
              </div>
              <div className="flex flex-row gap-7">
                <ClassCard classInfo={classInfo} />
                <ClassCard classInfo={classInfo} />
                <ClassCard classInfo={classInfo} />
              </div>
            </div>
          </div>
        </div>
        {/* calendar */}
        <div className="w-[30%]">
          <div className="flex items-center justify-center">
            <Calendar
              colorPrimary="#75b9cc"
              value={selectedDay}
              onChange={setSelectedDay}
              calendarClassName="custom-calendar"
              calendarTodayClassName="custom-today-day"
              renderFooter={() => (
                <div
                  style={{
                    paddingBottom: '2rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                  className="flex flex-col justify-center gap-3"
                >
                  <span className="text-base font-semibold">
                    Upcoming Assignments
                  </span>
                  {new Array(3).fill(0).map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="shadow-md rounded-md flex items-center justify-between">
                          <div
                            style={{
                              padding: '10px 1rem',
                            }}
                            className="flex flex-col"
                          >
                            <span className="text-sm">Assignment name</span>
                            <span>Class</span>
                          </div>
                          <div
                            style={{
                              paddingRight: '1rem',
                            }}
                            className="flex flex-col justify-center items-center"
                          >
                            <span className="text-sm">19-Sep</span>
                            <span className="text-sm">4pm</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashBoard
