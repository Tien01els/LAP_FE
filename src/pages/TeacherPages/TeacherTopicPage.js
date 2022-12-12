import React, { useState, useCallback, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import nocontent from '../../assets/image/nocontent.png';
import { API_URL } from '../../constant';
// components
import Button from '../../components/Button';
// import GrowingInput from '../../components/GrowingInput'
import TopicCard from '../../components/Student/TopicCard';
import GrowingTextArea from './GrowingTextArea';
import TokenExpire from '../../components/Modals/TokenExpire';
import createAxiosJWT from '../../createAxiosJWT';
import ModalCreateSkill from '../SkillPages/ModalCreateSkill';

import TeacherSkillInTopics from '../../components/Teacher/TeacherSkillInTopics';
import ModalCreateGradeTopic from '../../components/Modals/ModalCreateGradeTopic';

const axiosJWT = createAxiosJWT();

const topicImage =
    'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg';

const TeacherTopicPage = () => {
    const [gradeListOptions, setGradeListOptions] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState({});
    const [topicList, setTopicList] = useState([]);
    const [openCreateTopic, setOpenCreateTopic] = useState(false);

    //Search
    const [searchTerm, setSearchTerm] = useState('');

    //Topics
    //   const [topics, setTopics] = useState([])
    const [skills, setSkills] = useState([]);
    const [currentTopic, setCurrentTopic] = useState({});
    const [currentTopicId, setCurrentTopicId] = useState();
    const [isExpired, setIsExpired] = useState(false);

    const handleChangeImage = async (e) => {
        try {
            const res = await axiosJWT.post(
                API_URL + 'file/image',
                {
                    image: e.target.files[0],
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            currentTopic.topicImg = res.data;
            handleUpdateInfoTopic();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const getTopicOfGrade = useCallback(async () => {
        try {
            if (selectedGrade?.id) {
                const res = await axiosJWT.get(
                    API_URL + `topic/teacher/grade/${selectedGrade?.id}`
                );
                const result = res.data;
                if (result.length > 0 && result[0]?.topicId && !currentTopicId) {
                    setCurrentTopicId(result[0].topicId);
                    setCurrentTopic(result[0]);
                }
                setTopicList(res.data);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [currentTopicId, selectedGrade?.id]);

    useEffect(() => {
        selectedGrade && getTopicOfGrade();
    }, [selectedGrade, getTopicOfGrade]);

    useEffect(() => {
        const getAllGradeOfTeacher = async () => {
            const res = await axiosJWT.get(API_URL + `grade/teacher`);
            setGradeListOptions(res.data);
        };
        getAllGradeOfTeacher();
    }, []);

    //edit Topic Name
    const topicNameRef = useRef(null);
    const [topicName, setTopicName] = useState('');
    const [isEditingTopicName, setIsEditingTopicName] = useState(false);
    const handleEditTopicName = () => {
        topicNameRef.current.focus();
        setIsEditingTopicName(!isEditingTopicName);
        if (isEditingTopicName) handleUpdateInfoTopic();
    };

    const handleDeleteTopic = async (id) => {
        try {
            await axiosJWT.delete(API_URL + `topic/${id}`);
            setCurrentTopicId(null);
            selectedGrade && getTopicOfGrade();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    // topic des
    const topicDesRef = useRef(null);
    const [topicDes, setTopicDes] = useState('');
    const [isEditingDes, setIsEditingDes] = useState(false);
    const handleEditingDes = () => {
        topicDesRef.current.focus();
        setIsEditingDes(!isEditingDes);
        if (isEditingDes) handleUpdateInfoTopic();
    };

    const handleOpenModalCreateSkill = () => {
        setCreateSkillIsOpen(true);
    };

    const handleUpdateInfoTopic = async () => {
        try {
            await axiosJWT.put(API_URL + `topic/${currentTopicId}`, {
                topicName: topicNameRef?.current?.value,
                description: topicDesRef?.current?.value,
                topicImg: currentTopic?.topicImg,
                gradeId: currentTopic?.gradeId,
                prerequisiteTopicId: currentTopic?.prerequisiteTopicId,
            });
            getTopicOfGrade();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    //Skill
    const [modalCreateSkillIsOpen, setCreateSkillIsOpen] = useState(false);

    const getSkillsOfTopic = useCallback(async () => {
        try {
            if (currentTopicId) {
                const res = await axiosJWT.get(API_URL + `skill/topic/${currentTopicId}`);
                setSkills(res.data);
                setCurrentTopic(topicList.find((topic) => topic.id === currentTopicId) || {});
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [currentTopicId, topicList]);

    useEffect(() => {
        getSkillsOfTopic();
    }, [getSkillsOfTopic]);

    useEffect(() => {
        setCurrentTopic(topicList.find((val) => val.id === currentTopicId));
    }, [currentTopicId, topicList]);

    useEffect(() => {
        setTopicName(currentTopic?.topicName);
        setTopicDes(currentTopic?.description);
    }, [currentTopic]);

    return (
        <>
            <ModalCreateGradeTopic
                isOpen={openCreateTopic}
                setIsOpen={setOpenCreateTopic}
                getTopicOfGrade={getTopicOfGrade}
            />
            <ModalCreateSkill
                modalCreateSkillIsOpen={modalCreateSkillIsOpen}
                setCreateSkillIsOpen={setCreateSkillIsOpen}
                topicId={currentTopicId}
                getTopicOfGrade={getTopicOfGrade}
            />
            <div className='flex flex-row h-screen'>
                {/* left */}
                <div className='w-[40%] flex flex-col px-5 py-5 gap-6'>
                    <div className='flex flex-col gap-3 px-4'>
                        <div className='flex flex-row items-center w-full'>
                            <Select
                                options={gradeListOptions}
                                onChange={setSelectedGrade}
                                className='w-full shadow'
                                getOptionLabel={(option) => option.gradeName}
                                getOptionValue={(option) => option.id}
                                placeholder='Select grade'
                            />
                        </div>
                        {/* search */}
                        <div className='flex flex-row justify-between items-center w-full'>
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='outline-none rounded-lg text-base px-4 py-2 w-[65%] drop-shadow-md focus:drop-shadow-lg transition-all'
                                placeholder='Search topics'
                            />
                            <Button
                                className='border-none'
                                onClick={() => {
                                    setOpenCreateTopic(true);
                                }}
                            >
                                Add a Topic
                            </Button>
                        </div>
                    </div>
                    {/* filter */}
                    {/* courses */}
                    <div className='flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth'>
                        {topicList
                            .filter((val) => {
                                if (
                                    searchTerm === '' ||
                                    val.topicName.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                    return val;
                                return '';
                            })
                            .map((item, i) => {
                                return (
                                    <TopicCard
                                        topicInfo={item}
                                        key={i}
                                        onDeleteTopic={handleDeleteTopic}
                                        setCurrentTopicId={setCurrentTopicId}
                                        isTeacher
                                        gradeTopic
                                    />
                                );
                            })}
                    </div>
                </div>
                {/* right */}
                <div className='flex flex-col transition-all gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto'>
                    {currentTopicId ? (
                        <>
                            {/* Topic tile */}
                            <div className='flex flex-row gap-3 justify-center items-center'>
                                {currentTopic?.topicName && (
                                    <input
                                        ref={topicNameRef}
                                        size={topicName?.length || 10}
                                        value={topicName || ''}
                                        onChange={(e) => setTopicName(e.target.value)}
                                        className={`text-2xl text-center font-medium max-w-[600px] text-primary outline-none px-3 transition-all border-b-2 py-2 ${
                                            isEditingTopicName
                                                ? ` border-primary `
                                                : `border-transparent`
                                        } `}
                                        readOnly={!isEditingTopicName}
                                    />
                                )}
                                <i
                                    onClick={() => handleEditTopicName()}
                                    className='fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90'
                                />
                            </div>
                            {/* image */}
                            <div
                                className={`relative rounded-lg min-h-[300px] overflow-hidden flex items-center justify-center bg-center w-full select-none cursor-pointer transition-all`}
                            >
                                <img
                                    src={currentTopic?.topicImg || topicImage}
                                    className='h-[300px] object-cover w-full'
                                    alt=''
                                />
                                <label
                                    className='absolute z-1 w-full text-transparent hover:text-white hover:bg-gray-800 flex justify-center items-center hover:bg-opacity-50 transition-all min-h-[300px] cursor-pointer'
                                    htmlFor='image'
                                >
                                    <input
                                        type='file'
                                        id='image'
                                        name='image'
                                        accept='image/*'
                                        className='w-0 h-0 opacity-0'
                                        onChange={handleChangeImage}
                                    ></input>
                                    <span className='text-2xl'>Click to edit</span>
                                </label>
                            </div>
                            {/*  */}
                            {currentTopic?.prerequisiteTopicName && (
                                <div className='flex flex-col gap-3 items-center'>
                                    <span className='text-2xl font-medium text-gray-700'>
                                        Prerequisite Topic
                                    </span>
                                    <span className=''>{currentTopic.prerequisiteTopicName}</span>
                                </div>
                            )}
                            {/* topic des */}
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row justify-between items-center'>
                                    <span className='text-2xl font-medium text-gray-700'>
                                        Topic descriptions
                                    </span>
                                    <span
                                        onClick={handleEditingDes}
                                        className='mr-5 text-primary cursor-pointer active:scale-90 select-none'
                                    >
                                        Edit
                                    </span>
                                </div>
                                <GrowingTextArea
                                    ref={topicDesRef}
                                    value={topicDes}
                                    onChange={(e) => setTopicDes(e.target.value)}
                                    className='text-justify'
                                    readOnly={!isEditingDes}
                                    isEditing={isEditingDes}
                                />
                            </div>
                            {/* skills */}
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row justify-between items-center'>
                                    <span className='text-2xl font-medium text-gray-700'>
                                        Skills
                                    </span>
                                    <Button onClick={handleOpenModalCreateSkill}>
                                        Add a skill
                                    </Button>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    {skills.map((val, i) => {
                                        return (
                                            <TeacherSkillInTopics
                                                val={val}
                                                key={val.id + i}
                                                // getTopicOfClass={getTopicOfClass}
                                                isTeacher
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
                                <img src={nocontent} alt='' className='h-[300px]' />
                                <span className='text-2xl font-[500] text-primary'>
                                    No content, choose 1 topic to view
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <TokenExpire isOpen={isExpired} />
            </div>
        </>
    );
};

export default TeacherTopicPage;
