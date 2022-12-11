import React from 'react';

const RoadMapItem = ({ val, children, className = '', isTeacher }) => {
    return (
        <div
            className={`flex flex-col gap-2 w-[400px] px-5 py-5 bg-white rounded-md shadow-md ${className}`}
        >
            {children}
            <span className='text-xl text-primary font-[500] w-full truncate'>{val.topicName}</span>
            <span className='text-xs text-gray-500 w-full truncate'>
                Prerequisite topic:{' '}
                {val.prerequisiteTopicName
                    ? val.prerequisiteTopicName
                    : 'Not have prerequisite topic'}
            </span>
            <span className='text-justify whitespace-normal break-words'>{val.description}</span>
            <div className='flex justify-between'>
                <span className='text-gray-500 text-sm'>
                    Quantity of skills: {val.numberSkills}
                </span>
                {!isTeacher && (
                    <span className='text-sm text-green-400'>{val.statusTopicOfStudent}</span>
                )}
            </div>
        </div>
    );
};

export default RoadMapItem;
