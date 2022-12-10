import React, { useState, useEffect } from 'react';
import Button from '../Button';
import ManageRoleModal from '../Modals/Admin/ManageRoleModal';
import ReactPaginate from 'react-paginate';
import ConfirmModal from '../Modals/ConfirmModal';
import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();

const ManageRole = () => {
    const [createModal, setCreateModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [roles, setRoles] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 4;
    const currentItems = roles.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(roles.length / 4);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 4) % roles.length;
        setItemOffset(newOffset);
    };

    const getAllRoles = async () => {
        try {
            const res = await axiosJWT.get(API_URL + `role`);
            setRoles(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(id);
            await axiosJWT.delete(API_URL + `role/${id}`);
            getAllRoles();
            setConfirmDelete(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllRoles();
    }, []);

    return (
        <>
            <ManageRoleModal isOpen={createModal} setIsOpen={setCreateModal} />
            <div className='flex flex-col gap-4 w-fit h-fit bg-white shadow px-3 py-3 rounded-lg'>
                <div className='flex flex-row items-center justify-between'>
                    <span className='font-[500] text-gray-600'>Manage Role</span>
                    <Button onClick={() => setCreateModal(true)} className='text-xs'>
                        Add new role
                    </Button>
                </div>
                <div className='overflow-x-auto h-[256px] relative shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className=' text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Id
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Role
                                </th>
                                <th scope='col' className='py-3 px-6'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((val, index) => {
                                return (
                                    <tr
                                        key={val?.id + index}
                                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    >
                                        <th scope='row' className='py-4 px-6'>
                                            {index}
                                        </th>
                                        <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {val?.role}
                                        </th>
                                        <td className='py-4 px-6 text-right'>
                                            <span
                                                onClick={() => {
                                                    setConfirmDelete(true);
                                                }}
                                                className='font-medium text-red-500 hover:cursor-pointer hover:underline'
                                            >
                                                Remove
                                            </span>
                                            <ConfirmModal
                                                isOpen={confirmDelete}
                                                message='Are you sure to delete this role ?'
                                                yesConfirm={() => {
                                                    handleDelete(val?.id);
                                                }}
                                                noConfirm={() => setConfirmDelete(false)}
                                            />
                                            ;
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
            </div>
        </>
    );
};

export default ManageRole;
