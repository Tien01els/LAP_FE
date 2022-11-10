import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { API_URL } from '../../constant';
// components
import Button from '../../components/Button';
import GrowingInput from '../../components/GrowingInput';
import TopicCard from '../../components/Student/TopicCard';
import GrowingTextArea from './GrowingTextArea';
import ModalAddTopic from '../TopicPages/ModalAddTopic';
import ModalCreateSkill from '../SkillPages/ModalCreateSkill';
import ModalAssign from '../ModalAssign';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
//test
const topicImage =
    'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg';

const TeacherManageTopic = () => {
    const { classId } = useParams();

    //Search
    const [searchTerm, setSearchTerm] = useState('');
    //Topics
    const [topicsOfClasss, setTopicsOfClasss] = useState([]);
    const [topics, setTopics] = useState([]);
    const [skills, setSkills] = useState([]);
    const [currentTopic, setCurrentTopic] = useState({});
    const [currentTopicId, setCurrentTopicId] = useState();
    const [openAddTopic, setOpenAddTopic] = useState(false);
    const [modalAssignIsOpen, setAssignIsOpen] = useState(false);

    const handleOpenModalAssign = () => {
        setAssignIsOpen(true);
    };

    const handleDeleteClassTopic = async (id) => {
        try {
            await axiosJWT.delete(API_URL + `class-topic/${id}`);
            getTopicOfClass();
        } catch (error) {
            console.log(error);
        }
    };

    const getTopicOfClass = useCallback(async () => {
        try {
            const res = await axiosJWT.get(API_URL + `class-topic/teacher/class/${classId}`);
            const result = res.data;
            if (result.length > 0) setCurrentTopicId(result[0].topicId);
            let valueTopics = [];
            for (let i = 0; i < result.length; ++i) {
                valueTopics = [
                    ...valueTopics,
                    {
                        id: result[i].topicId,
                        topicName: result[i].topicName,
                        description: result[i].description,
                        classTopicId: result[i].id,
                    },
                ];
            }
            setTopics(valueTopics);
            setTopicsOfClasss(result);
        } catch (error) {
            console.log(error);
        }
    }, [classId]);

    useEffect(() => {
        getTopicOfClass();
    }, [getTopicOfClass]);

    //edit Topic Name
    const topicNameRef = useRef(null);
    const [isEditingTopicName, setIsEditingTopicName] = useState(false);
    const handleEditTopicName = () => {
        topicNameRef.current.focus();
        setIsEditingTopicName(!isEditingTopicName);
        if (isEditingTopicName) handleUpdateInfoTopic();
    };

    // topic des
    const topicDesRef = useRef(null);
    const [isEditingDes, setIsEditingDes] = useState(false);
    const handleEditingDes = () => {
        topicDesRef.current.focus();
        setIsEditingDes(!isEditingDes);
        if (isEditingDes) handleUpdateInfoTopic();
    };

    const handleUpdateInfoTopic = async () => {
        try {
            await axiosJWT.put(API_URL + `topic/${currentTopicId}`, {
                topicName: topicNameRef?.current?.value,
                description: topicDesRef?.current?.value,
                gradeId: currentTopic.gradeId,
                prerequisiteTopicId: currentTopic.prerequisiteTopicId,
            });
            console.log(currentTopicId);
            getTopicOfClass();
        } catch (error) {
            console.log(error);
        }
    };

    //Skill
    const [modalCreateSkillIsOpen, setCreateSkillIsOpen] = useState(false);
    // const handleDeleteSkill = (id) => {
    //     axiosJWT.delete(API_URL + `skill/${id}`).then((res) => {
    //         getSkillsOfTopic();
    //         getTopicOfClass();
    //     });
    // };

    const getSkillsOfTopic = useCallback(() => {
        if (currentTopicId) {
            axiosJWT.get(API_URL + `skill/topic/${currentTopicId}`).then((res) => {
                setSkills(res.data);
            });
            setCurrentTopic(topics.find((topic) => topic.id === currentTopicId) || {});
        }
    }, [currentTopicId, topics]);

    useEffect(() => {
        getSkillsOfTopic();
    }, [getSkillsOfTopic]);

    const handleOpenModalCreateSkill = () => {
        setCreateSkillIsOpen(true);
    };

    return (
        <div className='flex flex-row h-screen'>
            {/* left */}
            <div className='w-[40%] flex flex-col px-5 py-5 gap-6'>
                <div className='flex flex-col gap-3 px-4'>
                    <span className='text-2xl font-medium truncate'>ClassName</span>
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
                                setOpenAddTopic(!openAddTopic);
                            }}
                        >
                            Add a Topic
                        </Button>
                        <ModalAddTopic
                            classId={classId}
                            modalIsOpen={openAddTopic}
                            setIsOpen={setOpenAddTopic}
                            getTopicOfClass={getTopicOfClass}
                        />
                    </div>
                </div>
                {/* filter */}
                {/* courses */}
                <div className='flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth'>
                    {topicsOfClasss
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
                                    TopicInfo={item}
                                    key={i}
                                    onDeleteTopic={handleDeleteClassTopic}
                                    setCurrentTopicId={setCurrentTopicId}
                                    isTeacher
                                />
                            );
                        })}
                </div>
            </div>
            {/* right */}
            <div className='flex flex-col gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto'>
                {/* Topic tile */}
                <div className='flex flex-row gap-3 justify-center items-center'>
                    {currentTopic?.topicName && (
                        <GrowingInput
                            ref={topicNameRef}
                            className={`text-2xl text-center font-medium text-primary`}
                            defaultValue={currentTopic.topicName}
                            readOnly={!isEditingTopicName}
                            isEditing={isEditingTopicName}
                        />
                    )}
                    <i
                        onClick={() => handleEditTopicName()}
                        className='fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90'
                    />
                </div>
                {/* image */}
                <div
                    className={`relative rounded-lg min-h-[300px] overflow-hidden flex items-center justify-center bg-center w-full select-none  cursor-pointer transition-all`}
                >
                    <img src={topicImage} className='h-[300px] w-full' alt='' />
                    <div className='absolute z-1 w-full text-transparent hover:text-white hover:bg-gray-800 flex justify-center items-center hover:bg-opacity-50 transition-all min-h-[300px]'>
                        <span className='text-2xl'>Click to edit</span>
                    </div>
                </div>
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
                    {currentTopic?.description && (
                        <GrowingTextArea
                            ref={topicDesRef}
                            className='text-justify'
                            // defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            defaultValue={currentTopic.description}
                            readOnly={!isEditingDes}
                            isEditing={isEditingDes}
                        />
                    )}
                </div>
                {/* skills */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-2xl font-medium text-gray-700'>Skills</span>
                        <Button onClick={handleOpenModalCreateSkill}>Add a skill</Button>
                        <ModalCreateSkill
                            modalCreateSkillIsOpen={modalCreateSkillIsOpen}
                            setCreateSkillIsOpen={setCreateSkillIsOpen}
                            topicId={currentTopicId}
                            getSkillsOfTopic={getSkillsOfTopic}
                            getTopicOfClass={getTopicOfClass}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        {skills.map((val, i) => {
                            return (
                                <div key={i} className='flex flex-col gap-3 px-2 py-3 '>
                                    <div className='flex border-b p-y-2 pb-2 flex-row justify-between items-center'>
                                        <span className='text-xl'>{val.skillName}</span>
                                        <span
                                            className='text-sm text-primary select-none cursor-pointer'
                                            onClick={handleOpenModalAssign}
                                        >
                                            Create Assignment
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {new Array(2).fill(0).map((val, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className='flex flex-row items-center justify-between'
                                                >
                                                    <span>Assignment Name</span>
                                                    <div className='flex flex-row items-center gap-3'>
                                                        <i className='fa-solid fa-pen-to-square text-primary cursor-pointer'></i>
                                                        <i className='fa-solid fa-trash-can text-red-500 cursor-pointer'></i>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeacherManageTopic;
