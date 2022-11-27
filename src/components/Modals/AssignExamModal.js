import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';

import Button from '../Button';
import { API_URL } from '../../constant';
import TokenExpire from '../../components/Modals/TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(165, 165, 165, 0.6)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
    },
};

const axiosJWT = createAxiosJWT();
const AssignExamModal = ({
    isOpen,
    setIsOpen,
    classId,
    assignmentId,
    studentsOfAssignment,
    getAssignmentOfClass,
}) => {
    const [students, setStudents] = useState([]);
    const [assignStudents, setAssignStudents] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [assignAll, setAssignAll] = useState(false);

    const getStudentsOfClass = useCallback(async () => {
        try {
            const result = await axiosJWT.get(API_URL + `student/class/${classId}`);
            setStudents(result.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [classId]);

    const handleClickStudent = (id) => {
        setAssignStudents((prev) => {
            const isChecked = prev.includes(id);
            if (prev?.length + 1 === students?.length) setAssignAll(true);
            else setAssignAll(false);
            if (isChecked) return prev.filter((item) => item !== id);
            return [...prev, id];
        });
    };
    const handleAssignAll = () => {
        setAssignAll((prev) => {
            !prev
                ? setAssignStudents(students.map((student) => student.id))
                : setAssignStudents([]);
            return !prev;
        });
    };

    const assignForStudents = async () => {
        try {
            await axiosJWT.put(
                API_URL + `student-assignment/assignment/${assignmentId}/assign-list-student`,
                {
                    listStudentId: assignStudents,
                }
            );
            getAssignmentOfClass(assignmentId);
            setIsOpen(!isOpen);
            notify('Assign success');
        } catch (error) {
            console.log(error);
            setIsOpen(!isOpen);
            notify('Assign failed please try again!');
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    useEffect(() => {
        getStudentsOfClass();
    }, [getStudentsOfClass]);

    const notify = (message) => toast(message);

    useEffect(() => {
        if (studentsOfAssignment && students) {
            const listAssignedStudent = [];
            for (let i = 0; i < studentsOfAssignment.length; ++i) {
                if (students.find((student) => student.id === studentsOfAssignment[i].studentId))
                    listAssignedStudent.push(studentsOfAssignment[i].studentId);
            }
            setAssignStudents(listAssignedStudent);
        }
    }, [students, studentsOfAssignment]);

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={() => setIsOpen()}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex flex-col gap-4 w-[500px]'>
                <div className='flex flex-row justify-between'>
                    <span className='text-2xl font-medium'>Assign Students</span>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='bg-[#f4f7f9] rounded-lg shadow px-2 outline-none mr-2'
                        placeholder='Search student'
                    />
                </div>
                <div className='flex flex-row-reverse gap-2 mx-3' onClick={handleAssignAll}>
                    <label
                        htmlFor='assign-all'
                        className={`border-primary border px-2 rounded-lg cursor-pointer select-none transition-all 
            ${assignAll ? `bg-primary text-white` : `text-primary`}`}
                    >
                        Assign to all class
                    </label>
                    <input
                        type='checkbox'
                        id='assign-all'
                        checked={assignAll}
                        onChange={handleAssignAll}
                        className='hidden'
                    />
                </div>
                <div className='flex flex-col gap-4 px-2 py-2 h-[350px] overflow-y-auto'>
                    {students
                        .filter((val) => {
                            if (
                                searchTerm === '' ||
                                val.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                                return val;
                            return '';
                        })
                        .map((val, i) => {
                            return (
                                <div
                                    onClick={() => handleClickStudent(val.id)}
                                    key={val.id}
                                    className={`w-full flex flex-row justify-between content-center transition-all gap-5 h-fit px-4 py-2 rounded-lg cursor-pointer
                  ${assignStudents.includes(val.id) ? `bg-primary text-white` : `bg-[#f4f7f9]`}`}
                                >
                                    <label
                                        htmlFor={`student-${i}`}
                                        className='flex items-center gap-4 cursor-pointer'
                                        onClick={() => handleClickStudent(val.id)}
                                    >
                                        <input
                                            id={`student-${i}`}
                                            type='checkbox'
                                            checked={assignStudents.includes(val.id)}
                                            className='cursor-pointer hidden'
                                            onChange={() => handleClickStudent(val.id)}
                                        ></input>
                                    </label>
                                    <span className='flex-grow truncate inline'>
                                        {val.fullName}
                                    </span>
                                    <span
                                        className={`${
                                            assignStudents.includes(val.id)
                                                ? `text-white`
                                                : `text-gray-500`
                                        } w-[100px]`}
                                    >
                                        avS: {val.averageScore || 0}
                                    </span>
                                </div>
                            );
                        })}
                </div>
                <div className='flex flex-row-reverse gap-5'>
                    <Button
                        onClick={() => setIsOpen()}
                        className='bg-white text-primary shadow-primary shadow'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            assignForStudents();
                        }}
                    >
                        Assign
                    </Button>
                </div>
            </div>
            <TokenExpire isOpen={isExpired} />
        </Modal>
    );
};

export default AssignExamModal;
