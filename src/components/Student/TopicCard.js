import React, { useState, useEffect, useMemo, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import ConfirmModal from '../Modals/ConfirmModal';
import { SocketContext } from '../../App';

const imgsrc =
    'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg';

const TopicCard = ({ topicInfo, onDeleteTopic, isTeacher, setCurrentTopicId }) => {
    const socket = useContext(SocketContext);

    const [openMoreOption, setOpenMoreOption] = useState(false);
    const [isOpenModalRequest, setIsOpenModalRequest] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    const accessToken = localStorage.getItem('access_token');
    const decodedToken = useMemo(() => {
        return accessToken && jwtDecode(accessToken);
    }, [accessToken]);
    const handleRequestOpen = () => {
        !isRequested && setIsOpenModalRequest(!isOpenModalRequest);
    };

    const handleSendRequestUnlock = async () => {
        socket?.emit('send-request-unlock-topic', {
            senderId: decodedToken?.accountId,
            userId: decodedToken?.userId,
            topicId: topicInfo?.topicId,
            tableHandle: 'Student_Topic',
            idTableHandle: topicInfo.id,
        });
        setIsOpenModalRequest(!isOpenModalRequest);
        setIsRequested(true);
    };

    useEffect(() => {
        setIsRequested(topicInfo?.notificationContentId);
    }, [topicInfo]);

    return (
        <div className='w-full relative flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3'>
            <ConfirmModal
                isOpen={isOpenModalRequest}
                noConfirm={handleRequestOpen}
                yesConfirm={handleSendRequestUnlock}
                message='Confirm to send request to open this topic.'
            />
            {!topicInfo?.isUnlock && !isTeacher && (
                <div
                    onClick={() => handleRequestOpen()}
                    className={`w-full absolute flex flex-row gap-4 items-center justify-center bg-gray-700 bg-opacity-70 rounded-[16px] h-[152px] -translate-x-3 z-1 ${
                        isRequested ? '' : 'cursor-pointer'
                    }`}
                >
                    <span className='text-white'>
                        {isRequested ? `Waiting for teacher response...` : `Request to open topic`}
                    </span>
                </div>
            )}
            <img
                src={topicInfo?.topicImg || imgsrc}
                alt={''}
                className='object-fill h-32 w-36 rounded-lg'
            />
            <div className='flex flex-col justify-evenly w-full h-full'>
                <div className='flex flex-row items-center'>
                    <span
                        onClick={() => {
                            setCurrentTopicId(topicInfo?.topicId);
                        }}
                        className='font-medium w-[220px] truncate cursor-pointer'
                    >
                        {topicInfo?.topicName}
                    </span>
                    {isTeacher && (
                        <div className='flex flex-col'>
                            <div
                                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer select-none flex items-center justify-center bg-${
                                    openMoreOption ? `gray-100` : `white`
                                } hover:bg-gray-100`}
                                onClick={() => setOpenMoreOption(!openMoreOption)}
                            >
                                <i className='fas fa-ellipsis-h font-xs'></i>
                                {openMoreOption && (
                                    <div className='absolute z-1 translate-y-12 -translate-x-5 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b'>
                                        <div
                                            className='cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all'
                                            onClick={() => {
                                                onDeleteTopic(topicInfo?.id);
                                            }}
                                        >
                                            <span>Remove</span>
                                        </div>
                                        <div className='cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all'>
                                            <span>Edit</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <span className='text-xs w-[260px] h-[48px] whitespace-normal break-words line-clamp-3'>
                    {topicInfo?.description}
                </span>
                <div className='flex flex-row justify-between items-center pr-4 text-xs'>
                    <span>
                        Skills : <span className='text-primary'>{topicInfo?.numberSkills}</span>
                    </span>
                    <span
                        className='text-primary cursor-pointer'
                        // onClick={() => handleViewStudent()}
                        onClick={() => {
                            setCurrentTopicId(topicInfo?.topicId);
                        }}
                    >
                        View
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
