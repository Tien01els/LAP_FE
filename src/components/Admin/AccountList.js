import React from 'react';
import ConfirmModal from '../Modals/ConfirmModal';
import createAxiosJWT from '../../createAxiosJWT';
import { API_URL } from '../../constant';
import { useState } from 'react';
const axiosJWT = createAxiosJWT();

const AccountList = ({ val, getAllAccounts, setIsExpired }) => {
    const [banModal, setBanModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

    const handleBan = async () => {
        try {
            await axiosJWT.put(API_URL + `account/${val?.id}/change-active`);
            setBanModal(false);
            getAllAccounts();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleRemove = async () => {
        try {
            await axiosJWT.delete(API_URL + `account/${val?.id}`);
            setRemoveModal(false);
            getAllAccounts();
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={banModal}
                message='Are you sure to ban this account ?'
                noConfirm={() => setBanModal(false)}
                yesConfirm={() => handleBan()}
            />
            <ConfirmModal
                isOpen={removeModal}
                message='Are you sure to remove this account ?'
                noConfirm={() => setRemoveModal(false)}
                yesConfirm={() => handleRemove()}
            />
            <tr
                key={val?.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
                <th scope='row' className='py-4 px-6'>
                    {val?.id}
                </th>
                <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {val?.email}
                </th>
                {/* <td className='py-4 px-6'>{val?.fullName}</td> */}
                <td className={`py-4 px-6 ${val?.isActive ? `text-green-500` : `text-red-500`}`}>
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
        </>
    );
};

export default AccountList;
