import React, { useEffect, useState, useMemo } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import jwtDecode from 'jwt-decode';

import studentImage from '../../assets/image/students.webp';

import CustomProgressBar from '../../components/CustomProgressBar';
import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import achievementImg from '../../assets/image/achievement.png';
import { API_URL } from '../../constant';
import moment from 'moment';
import createAxiosJWT from '../../createAxiosJWT';
import { useNavigate } from 'react-router-dom';
import DeadlineItem from '../../components/Student/DeadlineItem';

const axiosJWT = createAxiosJWT();

const StudentDashboard = ({ isParent }) => {
    const accessToken = localStorage.getItem('access_token');
    const decodedToken = useMemo(() => {
        return accessToken && jwtDecode(accessToken);
    }, [accessToken]);

    const [selectedDay, setSelectedDay] = useState(utils().getToday());
    const [assignments, setAssignments] = useState([]);
    const [assignmentDays, setAssignmentsDays] = useState([]);
    const [topicsOfStudent, setTopicsOfStudent] = useState([]);
    const [classInfo, setClassInfo] = useState();
    const [achievement, setAchievement] = useState();
    const [studentInfo, setStudentInfo] = useState(null);
    const navigate = useNavigate();

    const handleDays = async (assignments) => {
        const days = [];
        // [
        //   {
        //     year: 2022,
        //     month: 9,
        //     day: 26,
        //     className: 'deadline',
        //   },
        // ]

        for (let i = 0; i < assignments.length; i++) {
            days.push({
                year: parseInt(moment(assignments[i]?.dateDue).format('YYYY')),
                month: parseInt(moment(assignments[i]?.dateDue).format('MM')),
                day: parseInt(moment(assignments[i]?.dateDue).format('DD')),
                className: 'deadline',
            });
        }
        setAssignmentsDays(days);
    };

    useEffect(() => {
        if (isParent) {
            const getStudentInfo = async () => {
                try {
                    const res = await axiosJWT.get(API_URL + `parent/student`);
                    setStudentInfo(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getStudentInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDeadline = async (studentId) => {
        let res;
        try {
            if (isParent) {
                res =
                    studentId &&
                    (await axiosJWT.get(API_URL + `parent/student/${studentId}/deadline`));
            } else {
                res = await axiosJWT.get(API_URL + `student-assignment/student/deadline`);
            }
            if (res?.data) {
                setAssignments(res.data);
                res.data?.length && handleDays(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getPercentSkill = async (studentId) => {
        try {
            let res;
            if (isParent) {
                res =
                    studentId &&
                    (await axiosJWT.get(API_URL + `parent/student/${studentId}/percent-skill`));
            } else {
                res = await axiosJWT.get(API_URL + `student-topic/percent-skill`);
            }
            res && setTopicsOfStudent(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getClassOfStudent = async (studentId) => {
        let res;
        try {
            if (isParent) {
                res =
                    studentId &&
                    (await axiosJWT.get(API_URL + `parent/student/${studentId}/class`));
            } else {
                res = await axiosJWT.get(API_URL + `student/class`);
            }
            res && setClassInfo(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAchievementOfStudent = async (studentId) => {
        try {
            let res;
            if (isParent) {
                res =
                    studentId &&
                    (await axiosJWT.get(API_URL + `parent/student/${studentId}/achievement`));
            } else {
                res = await axiosJWT.get(API_URL + `student/achievement`);
            }
            res && setAchievement(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAchievementOfStudent(studentInfo?.id);
        getDeadline(studentInfo?.id);
        getPercentSkill(studentInfo?.id);
        getClassOfStudent(studentInfo?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentInfo?.id]);

    return (
        <>
            <div className='px-10 py-7 flex flex-row gap-5 h-[full] text-gray-800'>
                <div className='flex flex-col w-[70%] gap-7'>
                    <span className='text-xl font-semibold font-inter'>Dashboard</span>
                    {/* welcome back */}
                    <div className='flex flex-row h-[150px] -z-50 bg-primary relative rounded-lg shadow-lg px-4 py-3'>
                        <div className='text-xl text-white w-[40%] flex flex-col pl-10 gap-5 self-center'>
                            <span className='text-2xl'>Welcome back {decodedToken?.fullName}!</span>{' '}
                            <span className='text-base'>Some quotes</span>
                        </div>
                        {/* image */}
                        <div className=''>
                            <img
                                src={studentImage}
                                alt=''
                                className='w-72 h-48 absolute 2xl:translate-x-[200px] xl:translate-x-[75px] -translate-y-[70px]'
                            ></img>
                        </div>
                    </div>
                    <div className='flex flex-row gap-7'>
                        {/* topics */}
                        <div className=' px-4 py-3 flex flex-col w-[60%] bg-white shadow-lg rounded-lg'>
                            <div className='flex flex-row items-center px-2 justify-between'>
                                <h2 className='font-semibold font-inter text-gray-600'>
                                    Class Topics
                                </h2>
                                <span
                                    onClick={() =>
                                        navigate(
                                            `/class/${
                                                decodedToken?.classId || studentInfo?.classId
                                            }`
                                        )
                                    }
                                    className='text-xs text-primary cursor-pointer select-none'
                                >
                                    View all
                                </span>
                            </div>
                            <div className='flex flex-col h-[297px] text-gray-800 gap-3 py-3 px-2 divide-y overflow-auto'>
                                {topicsOfStudent.map((val, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className='flex pt-5 px-3 flex-row justify-between items-center'
                                        >
                                            <span className='truncate w-[50%]'>
                                                {val.topicName}
                                            </span>
                                            <div className='flex w-[40%] flex-row items-center gap-3'>
                                                <div className='w-full bg-gray-200 gap-4 rounded-full h-1.5'>
                                                    <div
                                                        className='bg-primary h-1.5 rounded-full'
                                                        style={{
                                                            width: `${
                                                                (val.numberPassSkillOfTopic /
                                                                    val.numberTotalSkillOfTopic) *
                                                                    100 || 0
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className='text-sm text-right w-[50px] text-primary'>
                                                    {Math.floor(
                                                        (val.numberPassSkillOfTopic /
                                                            val.numberTotalSkillOfTopic) *
                                                            100
                                                    ) || 0}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Achievements */}
                        <div className='bg-white rounded-lg select-none px-4 py-3 w-[40%] shadow-lg gap-7 flex flex-col'>
                            <span className='font-semibold font-inter text-gray-600'>
                                Achievements
                            </span>
                            <Swiper
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className='achievementSwiper w-[100%] justify-center items-center py-10'
                            >
                                <SwiperSlide>
                                    <div className='w-[200px] h-[200px]'>
                                        <CustomProgressBar
                                            value={achievement?.avgScoreOfStudent || 0}
                                            circleRatio={0.75}
                                            initialAnimation={true}
                                            styles={buildStyles({
                                                pathColor: '#5199ad',
                                                rotation: 1 / 2 + 1 / 8,
                                                trailColor: '#eee',
                                            })}
                                        >
                                            <div className='flex flex-col items-center justify-center text-primary'>
                                                <span className='font-semibold text-4xl'>
                                                    {Math.round(achievement?.avgScoreOfStudent) ||
                                                        0}
                                                </span>
                                                <span className='font-semibold text-sm'>
                                                    Average Score
                                                </span>
                                            </div>
                                        </CustomProgressBar>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='flex flex-col h-full'>
                                        <div
                                            className='bg-cover self-center w-[150px] h-[150px] bg-center'
                                            style={{
                                                backgroundImage: "url('" + achievementImg + "')",
                                            }}
                                        ></div>
                                        <div className='flex gap-3 items-center'>
                                            <span className='text-primary text-2xl'>
                                                {achievement?.topicsCompletedOfStudent || 0}
                                            </span>{' '}
                                            Topics completed
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    {/* foot */}
                    <div className='flex items-center gap-3 justify-center px-7 w-full h-[50px] bg-white rounded-lg shadow-lg'>
                        <span className='text-gray-500'>Class : </span>
                        <span className='text-primary'>{classInfo?.className}</span>
                    </div>
                </div>
                {/* calendar */}
                <div className='flex flex-col h-[500px] gap-4'>
                    <Calendar
                        colorPrimary='#75b9cc'
                        value={selectedDay}
                        onChange={setSelectedDay}
                        calendarTodayClassName='custom-today-day'
                        customDaysClassName={assignmentDays}
                        calendarClassName='custom-calendar'
                    />
                    <div className='w-full  py-4 flex flex-col gap-2 bg-primary rounded-lg shadow-lg'>
                        <span className='text-white px-5 text-base font-semibold font-inter'>
                            Deadlines
                        </span>
                        <div className='flex flex-col mx-5 pr-2 gap-3 h-[210px] overflow-y-auto'>
                            {assignments
                                .filter(
                                    (item) =>
                                        parseInt(moment(item.dateDue).format('DD')) ===
                                        selectedDay?.day
                                )
                                .map((item, i) => {
                                    return (
                                        <DeadlineItem
                                            item={item}
                                            key={i}
                                            selectedDay={selectedDay}
                                            isParent={isParent}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
