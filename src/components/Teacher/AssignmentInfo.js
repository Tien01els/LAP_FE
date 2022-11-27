import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';

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
    const [dueTime, setDueTime] = useState(0);
    const [doTime, setDoTime] = useState(0);
    const [passScore, setPassScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [redo, setRedo] = useState(0);

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
        setSelectedDueTime(dueTime);
    }, [setSelectedDueTime, dueTime]);
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
                setDueTime(assignment.dueTime);
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
                    className='text-xl min-w-[360px] transition-all max-w-[360px] font-medium outline-none border-b-2 resize-x py-2 px-1'
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
                    <label>Will due on next</label>
                    <div className='flex flex-row gap-3 items-center w-[30%]'>
                        <input
                            type='number'
                            min='0'
                            className='outline-none border-b-2 px-1 py-[3px] w-[60%] duration-300 transition-all'
                            value={dueTime}
                            onChange={(e) => {
                                setDueTime(e.target.value);
                            }}
                        />
                        <span>day{dueTime > 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center justify-between w-full'>
                    <label>Total score</label>
                    <input
                        type='number'
                        min='0'
                        className='outline-none border-b-2 px-1 py-[3px] w-[30%] duration-300 transition-all'
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
                        className='outline-none border-b-2 px-1 py-[3px] w-[30%] duration-300 transition-all'
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
                                className='outline-none border-b-2 px-2 py-[3px] justify-center items-center w-[50px] text-right duration-300 transition-all'
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
                                className='outline-none border-b-2 px-[10px] py-[3px] justify-center items-center text-right w-[50px] duration-300 transition-all'
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
