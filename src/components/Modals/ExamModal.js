import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';
import TokenExpire from './TokenExpire';
import Button from '../Button';

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

const ExamModal = ({ isOpen, setIsOpen, val }) => {
    const navigate = useNavigate();

    const [isExpired, setIsExpired] = useState(false);

    const handleCancel = () => {
        setIsOpen(false);
    };
    const handleDoAssignment = async (assignmentId) => {
        try {
            await axiosJWT.put(
                API_URL + `student-assignment/student/assignment/${assignmentId}/start`
            );
            navigate(`/assignment/${assignmentId}/question/`);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex flex-col gap-4 w-[500px] text-gray-500'>
                <span className='text-2xl font-medium text-primary'>
                    {val?.assignment.assignmentName}
                </span>
                <div className='flex flex-row '>
                    <div className='flex flex-row gap-3 items-center w-[50%]'>
                        <div className='bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center'>
                            <i className='fa-regular fa-clock text-primary'></i>
                        </div>
                        <span>{val?.assignment.doTime} mins</span>
                    </div>
                    <div className='flex flex-row gap-3 items-center '>
                        <div className='bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center'>
                            <i className='fa-regular fa-calendar text-primary'></i>{' '}
                        </div>
                        <span>{moment(val?.assignment.dateDue).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                </div>
                <div className='flex flex-row '>
                    <div className='flex flex-row gap-3 items-center w-[50%]'>
                        <div className='bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center'>
                            <i className='fa-solid fa-clipboard-question text-primary'></i>
                        </div>
                        <span>30 question</span>
                    </div>
                    <div className='flex flex-row gap-3 items-center'>
                        <div className='bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center'>
                            <i className='fa-regular fa-star text-primary'></i>
                        </div>
                        <span>Pass score : {val?.assignment.passScore}/100 </span>
                    </div>
                </div>

                <div className='flex flex-row gap-3 items-center'>
                    <div className='bg-gray-100 flex items-center h-[30px] w-[30px] rounded-lg justify-center'>
                        <i className='fa-brands fa-cloudsmith text-primary'></i>
                    </div>
                    <span className=' text-gray-500'> status</span>
                </div>
            </div>
            <div className='flex flex-row-reverse mt-5 gap-5'>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={() => handleDoAssignment(val?.assignment.id)}>
                    Do assignment
                </Button>
            </div>
            <TokenExpire isOpen={isExpired} />
        </Modal>
    );
};

export default ExamModal;
