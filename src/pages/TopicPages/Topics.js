import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topics = () => {
    const navigate = useNavigate();
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
                <h1 className='text-3xl font-medium ml-[32px]'>All topics</h1>
            </div>

            <div className='overflow-x-auto relative shadow-md sm:rounded-lg mt-[32px]'>
                <table className='w-full text-xl text-center text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>
                                Product name
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Color
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Category
                            </th>
                            <th scope='col' className='py-3 px-6'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className='py-4 px-6'>Sliver</td>
                            <td className='py-4 px-6'>Laptop</td>
                            <td className='py-4 px-6'>
                                <a
                                    href='#'
                                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className='bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700'>
                            <th
                                scope='row'
                                className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                            >
                                Microsoft Surface Pro
                            </th>
                            <td className='py-4 px-6'>White</td>
                            <td className='py-4 px-6'>Laptop PC</td>
                            <td className='py-4 px-6'>
                                <a
                                    href='#'
                                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Topics;
