import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import Table from '../../components/Table';
import { API_URL } from '../../constant';
import ModalCreateSkill from './ModalCreateSkill';
import ModalAssign from './ModalAssign';

const Skills = () => {
    const thead = [
        {
            width: '50%',
            title: 'SKILL',
        },
        {
            width: '25%',
            title: 'STANDARD',
        },
        {
            width: '25%',
            title: '',
        },
    ];
    const navigate = useNavigate();
    const { topicId } = useParams();

    const [topic, setTopic] = useState([]);
    const [skills, setSkills] = useState([]);
    const [valueSkills, setValueSkills] = useState([]);

    const [values, setValues] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [modalCreateSkillIsOpen, setCreateSkillIsOpen] = useState(false);
    const [modalAssignIsOpen, setAssignIsOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState();

    const [assignmentName, setAssignmentName] = useState('');

    const handleDeleteSkill = (id) => {
        axios.delete(API_URL + `skill/${id}`).then((res) => {
            getSkillsOfTopic();
        });
    };

    const getSkillsOfTopic = useCallback(() => {
        axios.get(API_URL + `skill/topic/${topicId}`).then((res) => {
            let result = res.data;
            let arrayResult = [];
            for (let i = 0; i < result.length; ++i) {
                arrayResult = [
                    ...arrayResult,
                    {
                        id: result[i].id,
                        topicName: result[i].skillName,
                        standardName: result[i].standardName,
                    },
                ];
            }
            setValueSkills(result);
            setValues(arrayResult);
            setCurrentPage(arrayResult.length > 0 ? 1 : 0);
        });
    }, [topicId]);

    const handleOpenModalCreateSkill = () => {
        setCreateSkillIsOpen(true);
    };

    const handleOpenModalAssign = (skillId) => {
        setAssignIsOpen(true);
        setCurrentSkill(skillId);
        const skill = valueSkills.find((value) => value.id === skillId);
        setAssignmentName(skill.skillName);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        const newOffset = (event.selected * 5) % values.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        axios.get(API_URL + `topic/${topicId}`).then((res) => {
            setTopic(res.data);
        });
    }, [topicId]);

    useEffect(() => {
        getSkillsOfTopic();
    }, [getSkillsOfTopic]);

    useEffect(() => {
        const endOffset = itemOffset + 5;
        setSkills(values.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(values.length / 5));
    }, [itemOffset, values]);

    return (
        <div className='pt-[40px] px-[68px] h-screen'>
            <div className='flex gap-2 items-center'>
                <i className='fas fa-caret-left text-xl font-bold'></i>
                <span
                    className='underline underline-offset-4 font-semibold cursor-pointer'
                    onClick={() => {
                        navigate('/teacher/class/:classId/topic/');
                    }}
                >
                    All Topics
                </span>
            </div>
            <div className='w-full h-[68px] bg-primary flex items-center justify-between mt-[20px] rounded-xl shadow-lg px-12'>
                <h1 className='text-2xl font-medium uppercase text-white'>
                    {topic.topicName}
                </h1>
                <button
                    className='h-7 w-24 px-2 flex items-center justify-center text-white rounded-xl border-[1px]'
                    onClick={handleOpenModalCreateSkill}
                >
                    {/* material-icons */}
                    <span className=' flex items-center justify-center mr-1'>
                        Add
                    </span>
                    <span>skill</span>
                </button>
                <ModalCreateSkill
                    modalCreateSkillIsOpen={modalCreateSkillIsOpen}
                    setCreateSkillIsOpen={setCreateSkillIsOpen}
                    getSkillsOfTopic={getSkillsOfTopic}
                    topicId={topicId}
                />
            </div>

            <div className='flex flex-col justify-between mb-[40px] h-[77%]'>
                <div className='grow'>
                    <Table
                        thead={thead}
                        tbody={skills}
                        actions={[
                            {
                                name: 'Assign',
                                eventAction: handleOpenModalAssign,
                            },
                            {
                                name: 'Delete',
                                eventAction: handleDeleteSkill,
                            },
                        ]}
                    />
                    <ModalAssign
                        modalAssignIsOpen={modalAssignIsOpen}
                        setAssignIsOpen={setAssignIsOpen}
                        assignId={currentSkill}
                        assignmentName={assignmentName}
                    />
                </div>
                <div className='mt-[16px] flex justify-between px-5'>
                    <span className='font-sm text-gray-500'>
                        Page {currentPage} / {pageCount}
                    </span>
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel={
                            <button>
                                Next <i className='fas fa-angle-right'></i>
                            </button>
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel={
                            <button>
                                <i className='fas fa-angle-left'></i> Previous
                            </button>
                        }
                        renderOnZeroPageCount={null}
                        className='flex flex-row text-gray-500 gap-7 justify-center font-semibold items-center'
                        activeClassName='bg-primary text-white flex justify-center items-center w-8 h-8 rounded-full shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
};

export default Skills;