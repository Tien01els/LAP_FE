import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { utils } from 'react-modern-calendar-datepicker';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

import { API_URL } from '../constant';
import Button from '../components/Button';
import TokenExpire from '../components/Modals/TokenExpire';
import createAxiosJWT from '../createAxiosJWT';

const axiosJWT = createAxiosJWT();

const ModalAssign = ({ modalAssignIsOpen, setAssignIsOpen, assignId, assignmentName }) => {
    const currentDate = moment();
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState({
        day: currentDate.date(),
        month: currentDate.month() + 1,
        year: currentDate.year(),
    });
    const [time, setTime] = useState(() => {
        const hours = currentDate.hours();
        const minutes = currentDate.minutes();
        return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    });
    const [isExpired, setIsExpired] = useState(false);

    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: formStateCreate,
    } = useForm();

    const formatInputValue = () => {
        if (!selectedDay) return '';
        return `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`;
    };

    const handleCloseModalAssign = () => {
        setAssignIsOpen(false);
    };

    const handleCreateAssignment = async (data) => {
        try {
            const due = new Date(
                `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`
            );
            const assignment = {
                assignmentName: data.assignmentName,
                time: data.time,
                totalScore: data.totalScore,
                redo: data.redo,
                dateDue: moment(due).format('YYYY-MM-DD HH:mm:ss'),
                teacherId: 1,
            };
            const newAssignment = await axiosJWT.post(API_URL + `assignment`, assignment);
            const newSkillAssignment = await axiosJWT.post(API_URL + `skill-assignment`, {
                assignmentId: newAssignment.data?.id,
                skillId: assignId,
            });
            console.log(newSkillAssignment);
            navigate(
                `/skill/${newSkillAssignment.data?.skillId}/assignment/${newSkillAssignment.data?.assignmentId}/`
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
                time: 0,
                totalScore: 100,
                redo: 0,
            });
            setSelectedDay({
                day: currentDate.date(),
                month: currentDate.month() + 1,
                year: currentDate.year(),
            });
            setTime(() => {
                const hours = currentDate.hours();
                const minutes = currentDate.minutes();
                return `${hours > 9 ? hours : '0' + hours}:${
                    minutes > 9 ? minutes : '0' + minutes
                }`;
            });

            handleCloseModalAssign();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStateCreate, resetCreate]);

    return (
        <Modal
            isOpen={modalAssignIsOpen}
            style={{
                top: '0',
                left: '0',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            }}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex justify-end'>
                <button onClick={handleCloseModalAssign}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <div className='flex justify-center'>
                <form
                    className='flex flex-col w-[500px]'
                    onSubmit={handleSubmitCreate(handleCreateAssignment)}
                >
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-center'>
                            <h2 className='text-2xl font-semibold'>Create assignment</h2>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='assignmentName'>Assignment name</label>
                            <input
                                type='text'
                                name='assignmentName'
                                placeholder='Enter assignment name'
                                className='outline-none border border-gray-500 px-2 py-1 rounded'
                                {...registerCreate('assignmentName')}
                            />
                        </div>
                        <div className='flex flex-row gap-5 items-center'>
                            <label htmlFor='time'>Date due</label>
                            <input
                                type='time'
                                name='time'
                                value={time}
                                onChange={(e) => {
                                    setTime(e.target.value);
                                }}
                                className='outline-none border transition-all border-gray-500 px-2 py-1 rounded-md cursor-pointer'
                            />
                            <DatePicker
                                colorPrimary='#75b9cc'
                                value={selectedDay}
                                onChange={setSelectedDay}
                                inputPlaceholder='Select a day'
                                formatInputText={formatInputValue}
                                minimumDate={utils().getToday()}
                                inputClassName='daypicker'
                                style={{
                                    fontSize: '1.5rem',
                                    lineHeight: '2rem',
                                }}
                                className='text-2xl'
                            />
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor='totalScore'>
                                Total Score (Please enter from 0 to 100)
                            </label>
                            <input
                                type='number'
                                name='totalScore'
                                className='border form-control'
                                {...registerCreate('totalScore', {
                                    min: 0,
                                    max: 100,
                                    value: 100,
                                    valueAsNumber: true,
                                    validate: (value) =>
                                        (value >= 0 && value <= 100) ||
                                        'Please enter from 0 to 100',
                                })}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor='time'>Time (Please enter minutes)</label>
                            <input
                                type='number'
                                name='time'
                                className='border'
                                {...registerCreate('time', {
                                    min: 0,
                                    max: 100,
                                    value: 0,
                                })}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor='redo'>Redo (Please enter {'>='} 0)</label>
                            <input
                                type='number'
                                name='redo'
                                className='border form-control'
                                {...registerCreate('redo', {
                                    min: 0,
                                    max: 100,
                                    value: 0,
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </div>

                    <Button className='border-none bg-primary w-full mt-5'>Assign</Button>
                </form>
            </div>
            <TokenExpire isOpen={isExpired} />
        </Modal>
    );
};

export default ModalAssign;
