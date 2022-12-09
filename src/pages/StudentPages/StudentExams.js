import React, { useState, useEffect, useMemo } from 'react'
import jwtDecode from 'jwt-decode'

import ExamCard from '../../components/Student/ExamCard'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import TokenExpire from '../../components/Modals/TokenExpire'

const axiosJWT = createAxiosJWT()
// const mock = [
//     {
//         assignmentName: 'Kiem tra',
//         dateDue: '25/10/2022',
//         doTime: '1000',
//         totalScore: 100,
//     },
// ];

const StudentExams = ({ isParent }) => {
  const accessToken = localStorage.getItem('access_token')
  const [isExpired, setIsExpired] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [exams, setExams] = useState([])
  const [studentInfo, setStudentInfo] = useState(null)

  const decodedToken = useMemo(() => {
    return accessToken && jwtDecode(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (isParent) {
      const getStudentInfo = async () => {
        try {
          const res = await axiosJWT.get(API_URL + 'parent/student')
          setStudentInfo(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      getStudentInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getAllExamsOfStudent = async (classId) => {
      try {
        let res
        if (isParent) {
          if (studentInfo) {
            res = await axiosJWT.get(
              API_URL +
                `parent/student/${studentInfo?.id}/class/${studentInfo?.classId}`,
            )
          }
        }
        if (!isParent) {
          res = await axiosJWT.get(
            API_URL + `student-assignment/student/class/${classId}`,
          )
        }
        setExams(res.data)
      } catch (error) {
        console.log(error)
        if (error.response.status === 401) setIsExpired(true)
      }
    }
    getAllExamsOfStudent(decodedToken?.classId)
  }, [decodedToken?.classId, isParent, studentInfo])

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
        {!!exams?.length &&
          exams
            .filter((val) => {
              if (
                searchTerm === '' ||
                val?.assignment.assignmentName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
                return val
              return ''
            })
            .map((val, i) => {
              return <ExamCard val={val} key={i} isParent={isParent} />
            })}
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default StudentExams
