import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';
import ModalAssign from '../Modals/ModalAssign';
import TokenExpire from '../Modals/TokenExpire';

const axiosJWT = createAxiosJWT();

const TeacherSkillInTopics = ({ isTeacher, val, getTopicOfClass }) => {
    const navigate = useNavigate();

    const [openMoreOption, setOpenMoreOption] = useState(false);
    const [modalAssignIsOpen, setAssignIsOpen] = useState(false);
    const [assignmentsOfSkill, setAssignmentsOfSkill] = useState([]);
    const [isExpired, setIsExpired] = useState(false);

    const handleOpenModalAssign = () => {
        setAssignIsOpen(true);
    };

    const handleGetAssignmentsOfSkill = useCallback(async () => {
        try {
            const res = await axiosJWT.get(API_URL + `skill-assignment/skill/${val?.id}`);
            setAssignmentsOfSkill(res.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [val]);

    const handleEditAssignment = async (id) => {
        navigate(`/skill/${val.id}/assignment/${id}/`);
    };

    const handleRemoveAssignment = async (id) => {
        try {
            await axiosJWT.delete(API_URL + `skill-assignment/${id}`);
            getTopicOfClass();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    useEffect(() => {
        handleGetAssignmentsOfSkill();
    }, [handleGetAssignmentsOfSkill]);

    const handleDeleteSkill = async (id) => {
        try {
            await axiosJWT.delete(API_URL + `skill/${id}`);
            getTopicOfClass();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    return (
        <div className='flex flex-col gap-3 px-2 py-3 '>
            <div className='flex border-b p-y-2 pb-2 flex-row justify-between items-center'>
                <span className='text-xl w-[80%] truncate'>{val.skillName}</span>
                <div className='flex flex-row gap-5 items-center'>
                    <span className='text-primary text-sm'>{val.standardName}</span>
                    {isTeacher && (
                        <div className='flex flex-col'>
                            <div
                                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
                                    openMoreOption ? `gray-100` : `white`
                                } hover:bg-gray-100`}
                                onClick={() => setOpenMoreOption(!openMoreOption)}
                            >
                                <i className='fas fa-ellipsis-h font-xs'></i>
                                {openMoreOption && (
                                    <div className='absolute z-1 w-[125px] translate-y-14 -translate-x-12 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b'>
                                        <div
                                            className='cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all'
                                            onClick={() => {
                                                handleDeleteSkill(val.id);
                                            }}
                                        >
                                            <span>Remove</span>
                                        </div>
                                        <div
                                            className='cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all'
                                            onClick={handleOpenModalAssign}
                                        >
                                            <span>Create Assignment</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ModalAssign
                modalAssignIsOpen={modalAssignIsOpen}
                setAssignIsOpen={setAssignIsOpen}
                assignId={val.id}
                assignmentName={val.skillName}
                typeAssignment={'Skill'}
            />
            <div className='flex flex-col gap-4'>
                {assignmentsOfSkill?.map((val, i) => {
                    return (
                        <div key={i} className='flex flex-row items-center justify-between'>
                            <span
                                className='cursor-pointer w-[80%] truncate'
                                onClick={() => {
                                    navigate(`/assignment-summary/${val?.assignment.id}/`);
                                }}
                            >
                                {val?.assignment?.assignmentName}
                            </span>
                            <div className='flex flex-row items-center gap-3'>
                                <i
                                    className='fa-solid fa-pen-to-square text-primary cursor-pointer active:scale-90'
                                    onClick={() => handleEditAssignment(val.assignment?.id)}
                                ></i>
                                <i
                                    className='fa-solid fa-trash-can text-red-500 cursor-pointer active:scale-90'
                                    onClick={() => handleRemoveAssignment(val.id)}
                                ></i>
                            </div>
                        </div>
                    );
                })}
            </div>
            <TokenExpire isOpen={isExpired} />
        </div>
    );
};

export default TeacherSkillInTopics;
