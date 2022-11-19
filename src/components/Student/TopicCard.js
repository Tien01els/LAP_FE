import React, { useState, useMemo, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import ConfirmModal from '../Modals/ConfirmModal';
import { SocketContext } from '../../App';

const imgsrc =
    'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg';

const TopicCard = ({ topicInfo, onDeleteTopic, isTeacher, setCurrentTopicId, isLocked }) => {
    const socket = useContext(SocketContext);

    const [openMoreOption, setOpenMoreOption] = useState(false);
    const [isOpenModalRequest, setIsOpenModalRequest] = useState(false);

    const accessToken = localStorage.getItem('access_token');
    const decodedToken = useMemo(() => {
        return accessToken && jwtDecode(accessToken);
    }, [accessToken]);

    const handleRequestOpen = () => {
        setIsOpenModalRequest(!isOpenModalRequest);
    };
    
    const handleSendRequestUnlock = async () => {
        socket?.emit('send-request-unlock-topic', {
            senderId: decodedToken?.accountId,
            userId: decodedToken?.userId,
            topicId: topicInfo?.topicId,
            typeHandle: 'Student_Topic',
        });
        setIsOpenModalRequest(!isOpenModalRequest);
    };

    return (
        <div className='w-full relative flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3'>
            <ConfirmModal
                isOpen={isOpenModalRequest}
                noConfirm={handleRequestOpen}
                yesConfirm={handleSendRequestUnlock}
                message='Confirm to send request to open this topic.'
            />
            {isLocked && (
                <div
                    onClick={() => handleRequestOpen()}
                    className='w-full absolute flex flex-row gap-4 items-center justify-center bg-gray-700 bg-opacity-70 rounded-[16px] h-[152px] -translate-x-3 cursor-pointer z-1'
                >
                    <span className='text-white'>Request to Open topic</span>
                </div>
            )}
            <img
                src={topicInfo?.topicImg || imgsrc}
                alt={''}
                className='object-fill h-32 w-36 rounded-lg'
            />
            <div className='flex flex-col justify-evenly w-full h-full'>
                <div className='flex flex-row justify-between items-center'>
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
                                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
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
                <div className='flex flex-row justify-between items-center pr-1 text-xs'>
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
