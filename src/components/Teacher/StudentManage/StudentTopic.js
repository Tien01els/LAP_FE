import React from 'react';
import useCollapse from 'react-collapsed';
import StudentSkill from './StudentSkill';

const StudentTopic = ({ topicInfo }) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className='flex flex-col gap-4'>
            <div
                className='flex flex-row border-b bg-primary text-white rounded-lg py-3 px-4 justify-between w-full items-center'
                {...getToggleProps()}
            >
                <span className='w-[50%] truncate'>{topicInfo?.topic?.topicName}</span>
                <div className='flex flex-row gap-5 items-center'>
                    {topicInfo?.averageScore && (
                        <span className='text-sm'>Average Score : {topicInfo.averageScore}.pt</span>
                    )}
                    {topicInfo?.isPassed && (
                        <span className='text-sm bg-green-400 px-3 rounded-lg py-1 text-white'>
                            Passed
                        </span>
                    )}
                    <i
                        className={`fa-solid fa-chevron-up pt-1 text-xs duration-500 transition-all ${
                            isExpanded ? ` rotate-180 ` : ``
                        } `}
                    ></i>
                </div>
            </div>
            <div {...getCollapseProps()} className='flex flex-col gap-4'>
                {topicInfo?.topic?.skill.map((skill, i) => {
                    return <StudentSkill key={i} skill={skill} />;
                })}
            </div>
        </div>
    );
};

export default StudentTopic;
