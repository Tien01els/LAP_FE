import React from 'react';
import { customStyles } from '../../../constant';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { API_URL } from '../../../constant';
import createAxiosJWT from '../../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const ManageRoleModal = ({ isOpen, setIsOpen, getAllRoles }) => {
    const { register: registerRole, handleSubmit: createRole } = useForm();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const createNewRole = async (data) => {
        try {
            await axiosJWT.post(API_URL + `role`, { ...data });
            getAllRoles();
            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            style={customStyles}
            isOpen={isOpen}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
        >
            <form className='flex flex-col gap-5 w-[500px]' onSubmit={createRole(createNewRole)}>
                <span className='text-2xl font-[500]'>Create new role</span>
                <div className='flex flex-col gap-2 px-2 w-full'>
                    <span className='px-2'>Role</span>
                    <input
                        type='text'
                        {...registerRole('role', { required: true })}
                        placeholder='Type in role name'
                        className='outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary'
                    />
                </div>
                <div className='flex flex-row items-center justify-end gap-5'>
                    <Button type='submit'>Create</Button>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ManageRoleModal;
