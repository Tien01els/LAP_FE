import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import RoadMapItem from '../components/RoadMapItem';
import { API_URL } from '../constant';
import createAxiosJWT from '../createAxiosJWT';
import TokenExpire from '../components/Modals/TokenExpire';

const axiosJWT = createAxiosJWT();

const RoadMap = ({ isTeacher, isParent }) => {
    const [isExpired, setIsExpired] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState();
    const [topicRoadMap, setTopicRoadMap] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const getRoadMap = async (isParent, isTeacher) => {
            try {
                let classId = null;
                let gradeId = null;
                let studentTopics = null;
                if (isTeacher) {
                    gradeId = selectedGrade?.id;
                } else {
                    if (isParent) {
                        const studentInfo = await axiosJWT.get(API_URL + `parent/student`);
                        classId = studentInfo.data?.classId;
                        studentTopics =
                            studentInfo.data?.id &&
                            (await axiosJWT.get(
                                API_URL +
                                    `parent/student/${studentInfo.data?.id}/class/${classId}/topic`
                            ));
                    } else {
                        const classInfo = await axiosJWT.get(API_URL + `student/class`);
                        classId = classInfo.data?.id;
                        studentTopics =
                            classInfo &&
                            (await axiosJWT.get(
                                API_URL + `student-topic/student/class/${classId}`
                            ));
                    }
                    const grade =
                        classId && (await axiosJWT.get(API_URL + `grade/class/${classId}`));
                    gradeId = grade?.data?.id;
                }

                const res = gradeId && (await axiosJWT.get(API_URL + `grade/${gradeId}/road-map`));
                if (res?.data?.length) {
                    if (studentTopics?.data?.length) {
                        for (let i = 0; i < res.data.length; ++i) {
                            if (
                                studentTopics.data.find(
                                    (topic) => topic.isPass && topic.topicId === res.data[i].topicId
                                )
                            )
                                res.data[i].statusTopicOfStudent = 'Passed';
                            else res.data[i].statusTopicOfStudent = '';
                        }
                    }
                    setTopicRoadMap(res.data);
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) setIsExpired(true);
            }
        };
        getRoadMap(isParent, isTeacher);
    }, [isParent, isTeacher, selectedGrade?.id]);

    useEffect(() => {
        if (isTeacher) {
            const getAllGradeOfTeacher = async () => {
                const res = await axiosJWT.get(API_URL + `grade/teacher`);
                setGrades(res.data);
            };
            getAllGradeOfTeacher();
        }
    }, [isTeacher]);

    return (
        <>
            <div className='flex flex-col gap-7 items-center py-7 px-10'>
                {/* top */}
                <div className='flex flex-col gap-5 items-center'>
                    <span className='text-4xl font-[500] text-gray-600'>Road map</span>
                    {isTeacher && (
                        <Select
                            options={grades}
                            value={selectedGrade}
                            onChange={setSelectedGrade}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.gradeName}
                            placeholder='Please select a grade'
                            className='w-[400px]'
                        />
                    )}
                </div>

                <div className='relative w-[850px]'>
                    <div className='bg-primary absolute w-1 left-[calc(50%-2px)] h-full'></div>
                    <div className='flex flex-col gap-5 [&>*:nth-child(odd)]:self-start  [&>*:nth-child(even)]:self-end'>
                        {topicRoadMap.map((val, i) => {
                            return (
                                val && (
                                    <RoadMapItem
                                        key={i}
                                        val={val}
                                        className='relative'
                                        isTeacher={isTeacher}
                                    ></RoadMapItem>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
            <TokenExpire isOpen={isExpired} />
        </>
    );
};

export default RoadMap;
