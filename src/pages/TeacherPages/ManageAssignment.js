import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import moment from 'moment';

import Table from '../../components/Table';
import { API_URL } from '../../constant';

const ManageAssignment = () => {
    const navigate = useNavigate();
    const { topicId } = useParams();

    return (
        <>
            <div className='pt-[40px] px-[68px] h-screen'>
                <div className='flex gap-2 items-center'>
                    <i className='fas fa-caret-left text-xl font-bold'></i>
                    <span
                        className='underline underline-offset-4 font-semibold cursor-pointer'
                        onClick={() => {
                            navigate('/teacher/dashboard');
                        }}
                    >
                        Dashboard
                    </span>
                </div>
                <div className='w-full h-[68px] bg-primary flex items-center justify-between mt-[20px] rounded-xl shadow-lg px-12'>
                    <h1 className='text-2xl font-medium uppercase text-white'>Manage Assignment</h1>
                    <button className='h-7 w-24 px-2 flex items-center justify-center text-white rounded-xl border-[1px]'>
                        {/* material-icons */}
                        <span className=' flex items-center justify-center mr-1'>Add</span>
                        <span>skill</span>
                    </button>
                </div>

                <div className='flex flex-col justify-between mb-[40px] h-[77%]'>
                    <div className='grow'>
                        {/* <Table
                            thead={thead}
                            tbody={skills}
                            actions={[
                                {
                                    name: 'Assign',
                                    eventAction: handleAssignSkill,
                                },
                                {
                                    name: 'Delete',
                                    eventAction: handleDeleteSkill,
                                },
                            ]}
                        /> */}
                    </div>
                    {/* <div className='mt-[16px] flex justify-between px-5'>
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
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default ManageAssignment;
