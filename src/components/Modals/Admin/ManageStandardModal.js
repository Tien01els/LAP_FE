import React from 'react';
import { customStyles } from '../../../constant';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { API_URL } from '../../../constant';
import createAxiosJWT from '../../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const ManageStandardModal = ({ isOpen, setIsOpen, getAllStandards }) => {
    const { register: registerStandard, handleSubmit: createStandard } = useForm();
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const createNewStandard = async (data) => {
        try {
            await axiosJWT.post(API_URL + `standard`, { ...data });
            getAllStandards();
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
            <form
                className='flex flex-col gap-5 w-[500px]'
                onSubmit={createStandard(createNewStandard)}
            >
                <span className='text-2xl font-[500]'>Create standard</span>
                <div className='flex flex-col gap-2 px-2 w-full'>
                    <span className='px-2'>Standard name</span>
                    <input
                        type='text'
                        {...registerStandard('standardName', { required: true })}
                        placeholder='Type in standard name'
                        className='outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary'
                    />
                </div>
                <div className='flex flex-col gap-2 px-2 w-full'>
                    <span className='px-2'>Standard code</span>
                    <input
                        type='text'
                        {...registerStandard('standardCode', { required: true })}
                        placeholder='Type in standard code'
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

export default ManageStandardModal;
