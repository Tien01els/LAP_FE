import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()

const testImg =
  'https://thumbs.dreamstime.com/b/student-school-boy-studying-computer-online-lesson-education-vector-concept-student-school-boy-studying-computer-114522764.jpg'

const AssignmentView = () => {
  //search
  const { assignmentId } = useParams()

  const [assignment, setAssignment] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState([])

  const returnView = (score, passScore) => {
    if (score >= passScore) {
      return (
        <span className="bg-green-400 text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full">
          Passed
        </span>
      )
    }
    if (score < passScore) {
      return (
        <span className="bg-red-400 text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full">
          Failed
        </span>
      )
    }
    // return (
    //     <span className='bg-primary text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full'>
    //         Good
    //     </span>
    // );
  }

  useEffect(() => {
    try {
      const getAssignmentSummary = async () => {
        const res = await axiosJWT.get(
          API_URL + `assignment/${assignmentId}/summary`,
        )
        if (res.data) {
          console.log(res.data)
          setAssignment(res.data)
          setStudents(res.data.students)
        }
    }, [assignmentId]);

    return (
        <div className='px-10 py-10 flex flex-col gap-5'>
            <div className='flex flex-col gap-4 w-full h-fit px-10 pb-10 pt-7 bg-white rounded-lg shadow'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col gap-3 text-gray-500'>
                        <span className='text-2xl text-gray-700'>{assignment?.assignmentName}</span>
                        {/* <span className=''>Course : topic name</span> */}
                        <span>{assignment?.numberQuestionOfAssignment} Questions</span>
                    </div>
                    <div className='flex flex-col gap-3 text-gray-500'>
                        <div className='flex flex-row-reverse gap-3'>
                            {assignment?.skills?.map((val, i) => {
                                return (
                                    <div
                                        key={i}
                                        className='px-2 py-1 h-fit flex items-center justify-center text-primary rounded-full border-2 border-primary'
                                    >
                                        <span className='text-sm'>{val?.skillName}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <span>
                            Date due: {moment(assignment?.dateDue).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                        <span className='text-left'>
                            <i className='fa-regular fa-clock'></i> {assignment?.doTime} min
                            {assignment?.doTime > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-7'>
                    {/* Total student */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-primary  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-user'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Assigned Students</span>
                            <span className='text-2xl'>{students?.length || 0}</span>
                        </div>
                    </div>
                    {/* Average Score */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-yellow-400  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-star'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Average Score</span>
                            <span className='text-2xl'>{assignment?.avgScoreOfStudent || 0}</span>
                        </div>
                    </div>
                    {/* Passed Students */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-green-400  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-check font-bold'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Passed students</span>
                            <span className='text-2xl'>{assignment?.studentPassed || 0}</span>
                        </div>
                    </div>
                    {/* Passed Students */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-red-400  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-xmark'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Failed Students</span>
                            <span className='text-2xl'>{assignment?.studentFailed || 0}</span>
                        </div>
                    </div>
                    {/* Passed Students */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-yellow-500  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-circle-info'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Late submit</span>
                            <span className='text-2xl'>{assignment?.studentLateSubmit || 0}</span>
                        </div>
                    </div>
                    {/* Passed Students */}
                    <div className='flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md'>
                        <div className='flex items-center justify-center text-white bg-pink-400  rounded-full w-[40px] h-[40px]'>
                            <i className='fa-solid fa-question'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span>Not submitted</span>
                            <span className='text-2xl'>{assignment?.studentNotSubmit || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <span className='text-xl'>Submitted students</span>
                <div className='flex flex-row items-center gap-10'>
                    <input
                        type='text'
                        placeholder='Search student..'
                        className='px-3 py-2 rounded-lg shadow outline-none focus:shadow-lg transition-all'
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <div className='flex flex-row gap-3 text-gray-500 items-center'>
                        <div className='flex flex-col text-xs select-none'>
                            <i
                                onClick={() => {
                                    setStudents([
                                        ...students?.sort(
                                            (a, b) =>
                                                b.studentAssignment[0].score -
                                                a.studentAssignment[0].score
                                        ),
                                    ]);
                                }}
                                className='fa-solid fa-caret-up cursor-pointer rounded active:scale-90'
                            ></i>
                            <i
                                onClick={() => {
                                    setStudents([
                                        ...students?.sort(
                                            (a, b) =>
                                                a.studentAssignment[0].score -
                                                b.studentAssignment[0].score
                                        ),
                                    ]);
                                }}
                                className='fa-solid fa-caret-down cursor-pointer rounded active:scale-90 '
                            ></i>
                        </div>
                        <span className='font-medium '>Score Sort</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    {students
                        ?.filter((val) => {
                            if (
                                searchTerm === '' ||
                                val.name.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return val;
                            }
                            return '';
                        })
                        .map((val, i) => {
                            return (
                                <div
                                    key={i}
                                    className='flex flex-row gap-28 items-center rounded-md shadow-md bg-white px-5 py-4 w-full h-fit'
                                >
                                    <div className='flex flex-row gap-4 items-center w-[170px]'>
                                        <img
                                            src={val?.account.avatarImg || testImg}
                                            className='w-[40px] h-[40px] rounded-full'
                                            alt=''
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = testImg;
                                            }}
                                        />
                                        <span className='truncate w-[125px]'>{val?.fullName}</span>
                                    </div>
                                    <span>{val?.studentAssignment[0].score}</span>
                                    {returnView(
                                        val?.studentAssignment[0].score,
                                        assignment?.passScore
                                    )}
                                    <span className='text-gray-500'>
                                        {moment(val?.studentAssignment[0]?.dateComplete).format(
                                            'YYYY-MM-DD HH:mm:ss'
                                        )}
                                    </span>
                                    <span className='text-gray-500'>Late</span>
                                    <span className='text-primary cursor-pointer select-none'>
                                        View Answers
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentView
