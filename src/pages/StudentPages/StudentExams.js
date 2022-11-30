import React, { useState } from 'react'
import ExamCard from '../../components/Student/ExamCard'

const mock = [
  {
    assignmentName: 'Bai 1',
    dateDue: '25/10/2022',
    doTime: '1000',
    totalScore: 100,
  },
  {
    assignmentName: 'Kiem tra',
    dateDue: '25/10/2022',
    doTime: '1000',
    totalScore: 100,
  },
  {
    assignmentName: 'kakakak',
    dateDue: '25/10/2022',
    doTime: '1000',
    totalScore: 100,
  },
]

const StudentExams = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-5 px-10 py-5">
      <div className="flex flex-row items-center pr-20 justify-between">
        <span className="text-2xl font-[500] text-gray-600">Exams</span>
        <input
          type="text"
          className="outline-none shadow focus:shadow-md px-3 py-2 rounded-lg transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ..."
        />
      </div>
      <div className="flex flex-wrap gap-10">
        {mock
          .filter((val) => {
            if (
              searchTerm === '' ||
              val.assignmentName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
              return val
            return ''
          })
          .map((val, i) => {
            return <ExamCard val={val} key={i} />
          })}
      </div>
    </div>
  )
}

export default StudentExams
