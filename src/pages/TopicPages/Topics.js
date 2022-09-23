import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Table from '../../components/Table';

const values = [
    { id: '1', name: 'zxc', numberSkill: '1', prerequisite: 'cxz' },
    { id: '2', name: 'zxc', numberSkill: '2', prerequisite: 'cxz' },
    { id: '3', name: 'zxc', numberSkill: '3', prerequisite: 'cxz' },
    { id: '4', name: 'zxc', numberSkill: '4', prerequisite: 'cxz' },
    { id: '5', name: 'zxc', numberSkill: '5', prerequisite: 'cxz' },
    { id: '6', name: 'zxc', numberSkill: '6', prerequisite: 'cxz' },
    { id: '7', name: 'zxc', numberSkill: '7', prerequisite: 'cxz' },
    { id: '8', name: 'zxc', numberSkill: '8', prerequisite: 'cxz' },
    { id: '9', name: 'zxc', numberSkill: '9', prerequisite: 'cxz' },
    { id: '10', name: 'zxc', numberSkill: '10', prerequisite: 'cxz' },
    { id: '11', name: 'zxc', numberSkill: '11', prerequisite: 'cxz' },
];

const Topics = () => {
    const navigate = useNavigate();

    const [topic, setTopic] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + 5;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setTopic(values.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(values.length / 5));
    }, [itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 5) % values.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const thead = ['TOPIC NAME', 'NO. SKILLS', 'PREREQUISITES', ''];
    return (
        <div className='mt-[40px] mx-[68px]'>
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
            <div className='w-full h-[100px] bg-primary flex items-center mt-[24px] rounded-xl'>
                <h1 className='text-3xl font-medium ml-[64px] text-white'>
                    All topics
                </h1>
            </div>

            <div className='flex flex-col justify-between mb-[40px] min-h-fit-[500px]'>
                <Table thead={thead} tbody={topic} />
                <div className='mt-[24px]'>
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='next >'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel='< previous'
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default Topics;
