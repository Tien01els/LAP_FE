import React from 'react';
import { customStyles } from '../../../constant';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { API_URL } from '../../../constant';
import createAxiosJWT from '../../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const ManageGradeModal = ({ isOpen, setIsOpen, getAllGrades }) => {
    const { register: registerGrade, handleSubmit: createGrade } = useForm();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const createNewGrade = async (data) => {
        try {
            await axiosJWT.post(API_URL + `grade`, { ...data });
            getAllGrades();
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
            <form className='flex flex-col gap-5 w-[500px]' onSubmit={createGrade(createNewGrade)}>
                <span className='text-2xl font-[500]'>Create new grade</span>
                <div className='flex flex-col gap-2 px-2 w-full'>
                    <span className='px-2'>Grade</span>
                    <input
                        type='text'
                        {...registerGrade('gradeName', { required: true })}
                        placeholder='Type in grade name'
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

export default ManageGradeModal;
