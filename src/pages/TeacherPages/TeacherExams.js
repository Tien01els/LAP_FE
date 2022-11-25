import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { API_URL } from '../../constant';
import Button from '../../components/Button';
import ExamQuestion from '../../components/Teacher/ExamQuestion';
import AssignExamModal from '../../components/Modals/AssignExamModal';
import CreateExamModal from '../../components/Modals/CreateExamModal';
import TokenExpire from '../../components/Modals/TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const TeacherExams = () => {
    const { classId } = useParams();
    const [isExpired, setIsExpired] = useState(false);
    const [openAssignStudent, setOpenAssignStudent] = useState(false);
    const [openCreateExam, setOpenCreateExam] = useState(false);
    const [assignments, setAssignments] = useState(false);
    const navigate = useNavigate();

    const getAssignmentOfClass = useCallback(async () => {
        try {
            const { data } = await axiosJWT.get(API_URL + `class-assignment/class/${classId}`);
            console.log(data);
            setAssignments(data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [classId]);

    useEffect(() => {
        getAssignmentOfClass();
    }, [getAssignmentOfClass]);

    return (
        <div className='px-10 py-7 flex h-[100vh] flex-row gap-5'>
            <AssignExamModal
                isOpen={openAssignStudent}
                setIsOpen={setOpenAssignStudent}
                classId={classId}
            />
            <CreateExamModal
                isOpen={openCreateExam}
                setIsOpen={setOpenCreateExam}
                assignId={classId}
                typeAssignment='Class'
            />
            {/* left */}
            <div className='flex flex-col gap-5 h-fit w-[60%] bg-white rounded-lg shadow lg px-5 py-4'>
                <div className='flex flex-col gap-5'>
                    <span className='text-4xl text-gray-800'>Exams Title</span>
                    {/* infos */}
                    <span className='font-[500]'>Exams Information</span>
                    <div className='flex flex-row justify-between text-sm items-baseline'>
                        <div className='flex flex-col gap-1'>
                            <span>
                                <i className='fa-regular fa-calendar'></i> 25 April 2022
                            </span>
                            <span>
                                <i className='fa-regular fa-clock'></i> 30 mins
                            </span>
                            <span className='text-primary'>
                                <i className='fa-solid fa-users'></i> 30 students
                            </span>
                        </div>
                        <div className='flex flex-col text-right gap-1'>
                            <span>Total Score : 50pt</span>
                            <span>Pass Score : 25pt</span>
                            <span>
                                <i className='fa-regular fa-circle-question'></i> 30 Questions
                            </span>
                        </div>
                    </div>
                    {/* Question */}
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row items-base justify-between'>
                            <span className='font-[500]'>Questions</span>
                            <Button
                                onClick={() => navigate('/class/1/create-exam')}
                                className='text-sm flex gap-3 items-center'
                            >
                                <i className='fa-solid fa-pen-to-square'></i> Edit questions
                            </Button>
                        </div>
                        <div className='flex flex-col h-[300px] py-3 px-2 gap-4 overflow-y-auto'>
                            {new Array(7).fill(0).map((val, i) => {
                                return <ExamQuestion key={i} />;
                            })}
                        </div>
                        <div className='flex flex-row-reverse'>
                            <Button onClick={() => setOpenAssignStudent(!openAssignStudent)}>
                                Assign
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className='flex flex-col gap-3 h-fit w-[40%] bg-white rounded-lg shadow lg px-5 py-4'>
                <div className='flex flex-row items-center justify-between'>
                    <span className='text-2xl'>Exams</span>
                    <Button onClick={() => setOpenCreateExam(!openCreateExam)} className='text-xs'>
                        Create new exam
                    </Button>
                </div>
                <div className='flex flex-wrap gap-5 py-3'>
                    {assignments &&
                        assignments.map((val, i) => {
                            return (
                                <div
                                    key={i}
                                    className='border h-fit w-full flex flex-row cursor-pointer select-none justify-between items-baseline rounded-lg px-3 py-2'
                                >
                                    <div className='flex flex-col gap-3'>
                                        <span className='w-[250px] truncate'>
                                            {val.assignment?.assignmentName}
                                        </span>
                                        <div className='flex flex-row gap-3 text-xs text-gray-500'>
                                            <span>
                                                <i className='fa-regular fa-calendar'></i>{' '}
                                                {moment(val.dateOpen).format('MMMM Do YY')}
                                            </span>
                                            <span>
                                                <i className='fa-regular fa-clock'></i>{' '}
                                                {`${val.assignment?.doTime}   min${
                                                    val.assignment?.doTime > 1 ? 's' : ''
                                                }`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between gap-3'>
                                        <span className='text-sm text-primary'>View</span>
                                        <span className='text-xs text-gray-500'>Status</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <TokenExpire isOpen={isExpired} />
        </div>
    );
};

export default TeacherExams;
