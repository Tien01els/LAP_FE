import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import { API_URL } from '../../constant';
import Button from '../Button';
import TokenExpire from './TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();

const ModalAssign = ({
    modalAssignIsOpen,
    setAssignIsOpen,
    assignId,
    assignmentName,
    typeAssignment,
}) => {
    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(false);

    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: formStateCreate,
    } = useForm();

    const handleCloseModalAssign = () => {
        setAssignIsOpen(false);
    };

    const handleCreateAssignment = async (data) => {
        try {
            console.log(data);
            const assignment = {
                assignmentName: data.assignmentName,
                dueTime: data.dueTime,
                doTime: data.doTime,
                passScore: data.passScore,
                totalScore: data.totalScore,
                redo: data.redo,
                typeAssignment,
            };
            const newAssignment = await axiosJWT.post(API_URL + `assignment`, assignment);
            const newSkillAssignment = await axiosJWT.post(API_URL + `skill-assignment`, {
                assignmentId: newAssignment.data?.result?.id,
                skillId: assignId,
            });
            navigate(
                `/skill/${newSkillAssignment.data?.result?.skillId}/assignment/${newSkillAssignment.data?.result?.assignmentId}/`
            );
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    useEffect(() => {
        resetCreate({
            assignmentName: assignmentName,
        });
    }, [resetCreate, assignmentName]);

    useEffect(() => {
        if (formStateCreate.isSubmitSuccessful) {
            resetCreate({
                assignmentName: '',
                dueTime: 0,
                doTime: 0,
                totalScore: 100,
                passScore: 0,
                redo: 0,
            });
            handleCloseModalAssign();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStateCreate, resetCreate]);

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
            overflow: 'visible',
        },
    };

    return (
        <Modal
            isOpen={modalAssignIsOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex flex-row justify-between mb-5'>
                <span className='text-2xl font-medium'>Create Assignment</span>
                <button onClick={handleCloseModalAssign}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <form
                onSubmit={handleSubmitCreate(handleCreateAssignment)}
                className='flex flex-col text-gray-600 gap-4'
            >
                <div className='flex flex-col px-5 w-full gap-4'>
                    <div className='flex flex-col gap-2 w-full'>
                        <span>Exams title</span>
                        <input
                            type='text'
                            {...registerCreate('assignmentName', { required: true })}
                            placeholder='Title'
                            className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                        />
                    </div>
                    <div className='flex flex-row w-full gap-5'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Time to do exams</span>
                            <input
                                type='number'
                                {...registerCreate('doTime', { required: true, min: 0 })}
                                placeholder='min(s)'
                                className='outline-none px-3  py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                        {/* due */}
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Will due on next</span>
                            <input
                                type='number'
                                {...registerCreate('dueTime', { required: true, min: 0 })}
                                placeholder='day(s)'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-5'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Total Score</span>
                            <input
                                type='number'
                                {...registerCreate('totalScore', { required: true, min: 0 })}
                                placeholder='Ex : 100'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Pass Score</span>
                            <input
                                type='number'
                                {...registerCreate('passScore', { required: true, min: 0 })}
                                placeholder='Ex : 10'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <span>Allow redo</span>
                        <input
                            type='number'
                            {...registerCreate('redo', { required: true, min: 1 })}
                            placeholder='Ex : 10'
                            className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                        />
                    </div>
                </div>
                {/* submit */}
                <div className='flex flex-row-reverse gap-5'>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
            <TokenExpire isOpen={isExpired} />
        </Modal>
    );
};

export default ModalAssign;
