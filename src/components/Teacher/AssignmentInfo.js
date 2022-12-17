import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';

import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';

const axiosJWT = createAxiosJWT();
const AssignmentInfo = ({
    setSelectedAssignmentName,
    setSelectedDueTime,
    setSelectedDoTime,
    setSelectedPassScore,
    setSelectedTotalScore,
    setSelectedRedo,
}) => {
    const { assignmentId } = useParams();

    const [assignmentName, setAssignmentName] = useState('');
    const [doTime, setDoTime] = useState(0);
    const [passScore, setPassScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [redo, setRedo] = useState(0);
    const [selectedDay, setSelectedDay] = useState(utils().getToday());
    const [dueTime, setDueTime] = useState({
        hour: '',
        minute: '',
    });

    useEffect(() => {
        setSelectedAssignmentName(assignmentName);
    }, [setSelectedAssignmentName, assignmentName]);
    useEffect(() => {
        setSelectedPassScore(passScore);
    }, [setSelectedPassScore, passScore]);
    useEffect(() => {
        setSelectedTotalScore(totalScore);
    }, [setSelectedTotalScore, totalScore]);
    useEffect(() => {
        let newDueTime = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${dueTime.hour}:${dueTime.minute}:00`;
        setSelectedDueTime(newDueTime);
    }, [setSelectedDueTime, dueTime, selectedDay]);
    useEffect(() => {
        setSelectedDoTime(doTime);
    }, [setSelectedDoTime, doTime]);
    useEffect(() => {
        setSelectedRedo(redo);
    }, [setSelectedRedo, redo]);

    useEffect(() => {
        axiosJWT.get(API_URL + `assignment/${assignmentId}`).then((res) => {
            const assignment = res.data;
            if (assignment) {
                setAssignmentName(assignment.assignmentName);
                setDueTime({
                    hour: moment(assignment.dateDue).hour(),
                    minute: moment(assignment.dateDue).minute(),
                });
                setDoTime(assignment.doTime);
                setPassScore(assignment.passScore);
                setTotalScore(assignment.totalScore);
                setRedo(assignment.redo);
            }
        });
    }, [assignmentId]);

    return (
        <div className='h-fit'>
            <div className='flex flex-col justify-between gap-3'>
                <input
                    className='text-xl min-w-[360px] transition-all max-w-[360px] focus:border-primary font-medium outline-none border-b-2 resize-x py-2 px-1'
                    value={assignmentName}
                    maxLength={45}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            assignmentName === 'Assignment Name'
                                ? setAssignmentName('')
                                : setAssignmentName(assignmentName);
                            // setEnableEdit(!enableEdit);
                        }
                    }}
                    onChange={(e) => {
                        setAssignmentName(e.target.value);
                    }}
                    style={{ width: `${assignmentName.length}ch` }}
                />

                <div className='flex flex-row gap-4 items-center justify-between w-full'>
                    <label>Date Due</label>
                    <div className='flex flex-row gap-3 items-center w-[60%]'>
                        <DatePicker
                            value={selectedDay}
                            onChange={setSelectedDay}
                            inputPlaceholder='Select a day'
                            calendarPopperPosition='bottom'
                            calendarClassName='pickday h-[100px] w-full'
                            wrapperClassName='pickday w-full'
                            inputClassName={`w-full border-b-2 outline-none`}
                            minimumDate={utils().getToday()}
                            shouldHighlightWeekends
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center justify-between w-full'>
                    <label>Due Time</label>
                    <div className='flex flex-row gap-3 items-center w-[60%]'>
                        <div className='flex flex-row gap-5'>
                            <input
                                type='number'
                                placeholder='hour'
                                value={dueTime.hour}
                                onChange={(e) => setDueTime({ ...dueTime, hour: e.target.value })}
                                className='outline-none px-3 py-1 w-[50%] text-right border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                            :
                            <input
                                type='number'
                                placeholder='minute'
                                value={dueTime.minute}
                                onChange={(e) => setDueTime({ ...dueTime, minute: e.target.value })}
                                className='outline-none px-3 py-1 w-[50%] text-right border-b-2 border-opacity-0 transition-all focus:border-primary'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center justify-between w-full'>
                    <label>Total score</label>
                    <input
                        type='number'
                        min='0'
                        className='outline-none border-b-2 text-right focus:border-primary px-1 py-[3px] w-[30%] duration-300 transition-all'
                        value={totalScore}
                        onChange={(e) => {
                            setTotalScore(e.target.value);
                        }}
                    />
                </div>
                <div className='flex flex-row gap-4 items-center justify-between w-full'>
                    <label>Pass score</label>
                    <input
                        type='number'
                        min='0'
                        className='outline-none border-b-2 text-right focus:border-primary px-1 py-[3px] w-[30%] duration-300 transition-all'
                        value={passScore}
                        onChange={(e) => {
                            setPassScore(e.target.value);
                        }}
                    />
                </div>
                <div className='flex flex-row gap-10 items-center '>
                    <div className='flex items-center justify-between w-full'>
                        <span>Exam time in</span>
                        <div className='w-[30%] flex flex-row gap-2 items-center'>
                            <input
                                type='number'
                                min='0'
                                className='outline-none border-b-2 focus:border-primary px-2 py-[3px] justify-center items-center w-[50px] text-right duration-300 transition-all'
                                value={doTime}
                                onChange={(e) => {
                                    setDoTime(e.target.value);
                                }}
                            />
                            <span>m</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-10 items-center'>
                    <div className='flex gap-2 items-center w-full justify-between'>
                        <span>Redo</span>
                        <div className='w-[30%] flex flex-row gap-2 items-center'>
                            <input
                                type='number'
                                min='0'
                                className='outline-none border-b-2 px-[10px] focus:border-primary py-[3px] justify-center items-center text-right w-[50px] duration-300 transition-all'
                                value={redo}
                                onChange={(e) => {
                                    setRedo(e.target.value);
                                }}
                            />
                            <span>time{redo > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentInfo;
