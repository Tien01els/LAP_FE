import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../App';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import Button from '../../components/Button';

const TeacherNotification = ({ value, seenNoti }) => {
    const accessToken = localStorage.getItem('access_token');
    const decodedToken = accessToken && jwtDecode(accessToken);
    const socket = useContext(SocketContext);

    const [isSeen, setIsSeen] = useState(false);
    const [isOpenButtonHandle, setIsOpenButtonHandle] = useState(false);

    const handleAcceptRefuse = (value, answer) => {
        socket?.emit('send-handle-request-notification', {
            senderId: decodedToken?.accountId,
            receiverId: value?.senderAccountId,
            notificationContentId: value?.id,
            tableHandle: value?.tableHandle,
            idTableHandle: value?.idTableHandle,
            answer: answer,
        });
        setIsOpenButtonHandle(true);
        setIsSeen(true);
        seenNoti(value?.id);
    };

    useEffect(() => {
        setIsOpenButtonHandle(!!value?.isAnswered);
    }, [value?.isAnswered]);

    useEffect(() => {
        setIsSeen(!!value?.isSeen);
    }, [value?.isSeen]);

    return (
        value && (
            <div
                className={`flex flex-row p-3 select-none hover:bg-gray-100 transition-all gap-4 
        ${!isSeen ? `bg-blue-100 bg-opacity-50` : ``}`}
            >
                <i className='fa-solid fa-square-check text-2xl text-green-400'></i>
                <div className='flex flex-col gap-2'>
                    <span className='max-w-[260px] pt-1 text-sm whitespace-normal break-words text-gray-600'>
                        {value.content}
                    </span>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xs text-gray-400'>
                            {moment(value.dateRequest).format('DD MMM, YYYY')}
                            <br />
                            {moment(value.dateRequest).format('hh:mm A')}
                        </span>
                        {!isOpenButtonHandle && (
                            <div className='flex flex-row gap-2'>
                                <Button
                                    className='text-xs'
                                    onClick={() => {
                                        handleAcceptRefuse(value, true);
                                    }}
                                >
                                    Accept
                                </Button>
                                <Button
                                    className='text-xs bg-white text-primary shadow border border-primary'
                                    onClick={() => {
                                        handleAcceptRefuse(value, false);
                                    }}
                                >
                                    Deny
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default TeacherNotification;
