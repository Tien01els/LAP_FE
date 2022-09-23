import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import Table from '../../components/Table';
import { API_URL } from '../../constant';

const Topics = () => {
    const navigate = useNavigate();

    const [topic, setTopic] = useState([]);
    const [result, setResult] = useState();
    const [values, setValues] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        axios.get(API_URL + 'class-topic/1/1').then((res) => {
            setResult(res.data);
        });
    }, []);

    useEffect(() => {
        if (result) {
            let arrayResult = [];
            for (let i = 0; i < result.length; ++i) {
                arrayResult = [
                    ...arrayResult,
                    {
                        id: result[i].Topic.id,
                        topicName: result[i].Topic.topicName,
                        numberSkill: result[i].Topic.Skills.numberSkill,
                        prerequisiteTopicName:
                            result[i].Topic.Topic.prerequisiteTopicName,
                    },
                ];
            }
            setValues(arrayResult);
        }
    }, [result]);

    useEffect(() => {
        const endOffset = itemOffset + 5;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setTopic(values.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(values.length / 5));
    }, [itemOffset, values]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        const newOffset = (event.selected * 5) % values.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const thead = ['Topic Name', 'NO. SKILLS', 'PREREQUISITES', ''];
    return (
        <div className='pt-[40px] px-[68px] h-screen'>
            <div className='flex gap-2 items-center'>
                <i className='fas fa-caret-left text-xl font-bold'></i>
                <span
                    className='underline underline-offset-4 font-semibold cursor-pointer'
                    onClick={() => {
                        navigate('/teacher/classes');
                    }}
                >
                    All Classes
                </span>
            </div>
            <div className='w-full h-[75px] bg-primary flex items-center mt-[24px] rounded-xl shadow-lg'>
                <h1 className='text-2xl font-medium ml-[50px] uppercase text-white'>
                    Topics
                </h1>
            </div>

            <div className='flex flex-col justify-between mb-[40px] h-[70%]'>
                <div className='grow'>
                    <Table thead={thead} tbody={topic} />
                </div>
                <div className='mt-[24px] flex justify-between px-5'>
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

export default Topics;
