import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../Button';
import { API_URL } from '../../constant';
import TokenExpire from '../../components/Modals/TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
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
        overflow: 'unset !important',
    },
};

const CreateExamModal = ({ isOpen, setIsOpen, assignId, typeAssignment }) => {
    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(false);
    const [selectedDay, setSelectedDay] = useState(utils().getToday());

    const { register, handleSubmit } = useForm();

    const notify = (message) => toast(message);

    const onSubmit = async (data) => {
        try {
            let dateDue = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${data.hour}:${data.minute}:00`;
            const assignment = {
                assignmentName: data.assignmentName,
                dateDue: dateDue,
                doTime: data.doTime,
                passScore: data.passScore,
                totalScore: data.totalScore,
                redo: data.redo,
                typeAssignment,
            };
            const newAssignment = await axiosJWT.post(API_URL + `assignment`, assignment);
            if (typeAssignment === 'Class') {
                // (selectedDay &&
                //   moment(
                //     `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
                //   ).format('YYYY-MM-DD')) ||
                const dateOpen = new Date();
                const dateDue =
                    (selectedDay &&
                        moment(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`)
                            .add(parseInt(data.dueTime), 'days')
                            .format('YYYY-MM-DD')) ||
                    new Date().setDate(new Date().getDate() + parseInt(data.dueTime));
                const newClassAssignment = await axiosJWT.post(API_URL + `class-assignment`, {
                    assignmentId: newAssignment.data?.result?.id,
                    classId: assignId,
                    dateOpen,
                    dateDue,
                });
                navigate(
                    `/class/${newClassAssignment.data?.result?.classId}/assignment/${newClassAssignment.data?.result?.assignmentId}/`
                );
            }
        } catch (error) {
            console.log(error);
            notify('Create failed please try again');
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={() => setIsOpen(!isOpen)}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex flex-col gap-4 h-fit w-[700px]'>
                <div className='flex flex-row justify-between'>
                    <span className='text-2xl font-medium text-gray-600'>Create Exam</span>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col text-gray-600 gap-4'
                >
                    <div className='flex flex-col gap-2 w-full'>
                        <span>Exams title</span>
                        <input
                            type='text'
                            {...register('assignmentName', { required: true })}
                            placeholder='Title'
                            className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                        />
                    </div>
                    <div className='flex flex-row w-full gap-5'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Time to do exams</span>
                            <input
                                type='number'
                                {...register('doTime', { required: true, min: 0 })}
                                placeholder='min(s)'
                                className='outline-none px-3  py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                        {/* redo */}
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Allow redo</span>
                            <input
                                type='number'
                                {...register('redo', { required: true, min: 1 })}
                                placeholder='Ex : 10'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-5'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Total Score</span>
                            <input
                                type='number'
                                {...register('totalScore', { required: true, min: 0 })}
                                placeholder='Ex : 100'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Pass Score</span>
                            <input
                                type='number'
                                {...register('passScore', { required: true, min: 0 })}
                                placeholder='Ex : 10'
                                className='outline-none px-3 py-1 border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-5'>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Date due</span>
                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                inputPlaceholder='Select a day'
                                calendarPopperPosition='top'
                                calendarClassName='pickday h-[100px] full'
                                wrapperClassName='pickday full'
                                inputClassName={`w-full border-b-2 outline-none`}
                                minimumDate={utils().getToday()}
                                shouldHighlightWeekends
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <span>Due time</span>
                            <div className='flex flex-row gap-5'>
                                <input
                                    type='number'
                                    placeholder='End hour'
                                    {...register('hour', {
                                        required: true,
                                        min: 0,
                                        max: 24,
                                    })}
                                    className='outline-none px-3 py-1 w-[50%] border-b-2 border-opacity-0 transition-all focus:border-primary'
                                />
                                :
                                <input
                                    type='number'
                                    placeholder='End minute'
                                    {...register('minute', {
                                        required: true,
                                        min: 1,
                                        max: 60,
                                    })}
                                    className='outline-none px-3 py-1 w-[50%] border-b-2 border-opacity-0 transition-all focus:border-primary'
                                />
                            </div>
                        </div>
                    </div>
                    {/* submit */}
                    <div className='flex flex-row-reverse gap-5'>
                        <Button onClick={() => setIsOpen()}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </div>
            <TokenExpire isOpen={isExpired} />
        </Modal>
    );
};

export default CreateExamModal;
