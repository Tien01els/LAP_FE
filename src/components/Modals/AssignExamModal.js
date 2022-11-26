import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';

import Button from '../Button';
import { API_URL } from '../../constant';
import TokenExpire from '../../components/Modals/TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';

const customStyles = {
    right: 0,
    bottom: 0,
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
const AssignExamModal = ({ isOpen, setIsOpen, classId }) => {
    const [students, setStudents] = useState([]);
    const [assignStudents, setAssignStudents] = useState([]);
    const [isExpired, setIsExpired] = useState(false);

    const getStudentsOfClass = useCallback(async () => {
        try {
            const result = await axiosJWT.get(API_URL + `student/class/${classId}`);
            console.log(result.data);
            setStudents(result.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [classId]);

    const handleClickStudent = (id) => {
        setAssignStudents((prev) => {
            const isChecked = prev.includes(id);
            if (isChecked) return prev.filter((item) => item !== id);
            return [...prev, id];
        });
    };

    const assignForStudents = async () => {
        try {
            const result = await axiosJWT.get(API_URL + `student/class/${classId}`, {
                listStudent: assignStudents,
            });
            console.log(result.data);
            setStudents(result.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    useEffect(() => {
        getStudentsOfClass();
    }, [getStudentsOfClass]);

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
                        type='text'
                        className='bg-[#f4f7f9] rounded-lg shadow px-2 outline-none mr-2'
                        placeholder='Search student'
                    />
                </div>
                <div className='flex flex-col gap-4 px-2 py-2 h-[350px] overflow-y-auto'>
                    {students.map((val, i) => {
                        return (
                            <div
                                key={val.id}
                                onClick={() => handleClickStudent(val.id)}
                                className='w-full flex flex-row justify-between content-center bg-[#f4f7f9] gap-5 h-fit px-4 py-2 rounded-lg cursor-pointer'
                            >
                                <label
                                    htmlFor={`student-${i}`}
                                    className='flex items-center gap-4 cursor-pointer'
                                >
                                    <input
                                        id={`student-${i}`}
                                        type='checkbox'
                                        checked={assignStudents.includes(val.id)}
                                        onChange={() => handleClickStudent(val.id)}
                                        className='cursor-pointer'
                                    ></input>
                                </label>
                                <span className='flex-grow truncate inline'>{val.fullName}</span>
                                <span className='text-gray-500 w-[100px]'>
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
