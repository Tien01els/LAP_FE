import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ManageAccountModal from '../../components/Modals/ManageAccountModal';
import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';
import TokenExpire from '../../components/Modals/TokenExpire';
import ReactPaginate from 'react-paginate';
import ConfirmModal from '../../components/Modals/ConfirmModal';

// const items = [
//     {
//         email: 'jhuriche0@indiegogo.com',
//         fullName: 'Jarrett Huriche',
//         active: false,
//         role: 'Parent',
//     },
//     {
//         email: 'cturle1@independent.co.uk',
//         fullName: 'Chick Turle',
//         active: false,
//         role: 'Admin',
//     },
//     {
//         email: 'apeniman2@miitbeian.gov.cn',
//         fullName: 'Abba Peniman',
//         active: true,
//         role: 'Student',
//     },
//     {
//         email: 'mwitherup3@latimes.com',
//         fullName: 'Mirabella Witherup',
//         active: true,
//         role: 'Admin',
//     },
//     {
//         email: 'imacvicar4@toplist.cz',
//         fullName: 'Iormina MacVicar',
//         active: true,
//         role: 'Parent',
//     },
//     {
//         email: 'blere5@google.ca',
//         fullName: 'Brittaney Lere',
//         active: false,
//         role: 'Student',
//     },
//     {
//         email: 'lsmeal6@1688.com',
//         fullName: 'Liva Smeal',
//         active: false,
//         role: 'Parent',
//     },
//     {
//         email: 'nbrambley7@arstechnica.com',
//         fullName: 'Neal Brambley',
//         active: true,
//         role: 'Teacher',
//     },
//     {
//         email: 'lhemms8@usda.gov',
//         fullName: 'Liva Hemms',
//         active: true,
//         role: 'Student',
//     },
//     {
//         email: 'mketch9@columbia.edu',
//         fullName: 'Matt Ketch',
//         active: false,
//         role: 'Student',
//     },
//     {
//         email: 'drysdalea@surveymonkey.com',
//         fullName: 'Dianne Rysdale',
//         active: true,
//         role: 'Teacher',
//     },
//     {
//         email: 'leskellb@nsw.gov.au',
//         fullName: 'Lilias Eskell',
//         active: false,
//         role: 'Student',
//     },
// ];

const axiosJWT = createAxiosJWT();
const ManageAccount = () => {
    const [openManageAccount, setOpenManageAccount] = useState(false);
    const [banModal, setBanModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    //
    const [accounts, setAccounts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 9;
    const currentItems = accounts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(accounts.length / 9);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 9) % accounts.length;
        setItemOffset(newOffset);
    };

    const handleBan = async (id) => {
        try {
            await axiosJWT.put(API_URL + `account/${id}/change-active`);
            getAllAccounts();
            setBanModal(false);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleRemove = async (id) => {
        try {
            await axiosJWT.delete(API_URL + `account/${id}`);
            setRemoveModal(false);
            getAllAccounts();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const getAllAccounts = async () => {
        try {
            const res = await axiosJWT.get(API_URL + `account`);
            setAccounts(res.data?.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };
    useEffect(() => {
        getAllAccounts();
    }, []);

    return (
        <>
            <div className='px-10 py-7 flex flex-col gap-5'>
                <div className='flex flex-row items-center justify-between'>
                    <span className='text-2xl font-[500] text-gray-600'>Manage Account</span>
                    <Button
                        onClick={() => {
                            setOpenManageAccount(true);
                        }}
                    >
                        Add an account
                    </Button>
                    <ManageAccountModal
                        isOpen={openManageAccount}
                        setIsOpen={setOpenManageAccount}
                        getAllAccounts={getAllAccounts}
                    />
                </div>
                <div className='overflow-x-auto h-[521px] relative shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className=' text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Id
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Email
                                </th>
                                {/* <th scope='col' className='py-3 px-6'>
                                    Name
                                </th> */}
                                <th scope='col' className='py-3 px-6'>
                                    Active
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Role
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    <span className='sr-only'>Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((val, i) => {
                                return (
                                    <tr
                                        key={val?.id}
                                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    >
                                        <ConfirmModal
                                            isOpen={banModal}
                                            message='Are you sure to ban this account ?'
                                            noConfirm={() => setBanModal(false)}
                                            yesConfirm={() => handleBan(val?.id)}
                                        />
                                        <ConfirmModal
                                            isOpen={removeModal}
                                            message='Are you sure to remove this account ?'
                                            noConfirm={() => setRemoveModal(false)}
                                            yesConfirm={() => handleRemove(val?.id)}
                                        />
                                        <th scope='row' className='py-4 px-6'>
                                            {val?.id}
                                        </th>
                                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {val?.email}
                                        </th>
                                        {/* <td className='py-4 px-6'>{val?.fullName}</td> */}
                                        <td
                                            className={`py-4 px-6 ${
                                                val?.isActive ? `text-green-500` : `text-red-500`
                                            }`}
                                        >
                                            {val?.isActive ? `Active` : `Banned`}
                                        </td>
                                        <td className='py-4 px-6'>{val?.role.role}</td>
                                        <td className='py-4 px-6 text-right flex flex-row justify-between select-none'>
                                            <span
                                                onClick={() => {
                                                    setBanModal(true);
                                                }}
                                                className='font-medium text-orange-500 dark:text-blue-500 hover:cursor-pointer'
                                            >
                                                {val?.isActive ? `Ban` : `Unban`}
                                            </span>

                                            <span
                                                onClick={() => {
                                                    setRemoveModal(true);
                                                }}
                                                className='font-medium text-red-500 dark:text-blue-500 hover:cursor-pointer'
                                            >
                                                Remove
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <ReactPaginate
                    breakLabel='...'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    nextLabel={
                        <button className='flex flex-row items-center gap-3'>
                            Next <i className='fas fa-angle-right text-xs'></i>
                        </button>
                    }
                    previousLabel={
                        <button className='flex flex-row items-center gap-3'>
                            <i className='fas fa-angle-left text-xs'></i> Previous
                        </button>
                    }
                    className='flex flex-row gap-5 items-center justify-center select-none'
                    activeClassName='bg-primary text-white flex justify-center items-center w-[40px] h-[40px] rounded-full shadow-lg'
                />
                <TokenExpire isOpen={isExpired} />
            </div>
        </>
    );
};

export default ManageAccount;
