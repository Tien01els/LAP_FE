import React, { useState, useEffect, useCallback } from 'react';
import ClassCard from '../../components/Teacher/ClassCard';
import { API_URL } from '../../constant';
import Button from '../../components/Button';
import ManageClassModal from '../../components/Modals/ManageClassModal';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const TeacherClasses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
    const [classes, setClasses] = useState([]);

    const getClassOfTeacher = useCallback(async () => {
        const res = await axiosJWT.get(API_URL + `class/teacher`);
        setClasses(res.data);
    }, []);

    useEffect(() => {
        getClassOfTeacher();
    }, [getClassOfTeacher]);

    return (
        <div className='flex flex-col mt-10 gap-5 h-[100%]'>
            <div className='flex flex-col px-10 ml-7 pt-2'>
                <div className='flex flex-row justify-between items-center mr-[4.2rem]'>
                    <span className='text-2xl font-[500]'>Active Class</span>
                    <div className='flex flex-row gap-5 items-center'>
                        <Button
                            onClick={() => {
                                setOpenCreateClassModal(true);
                            }}
                            className='shadow-lg'
                        >
                            Create a class
                        </Button>
                        <ManageClassModal
                            isOpen={openCreateClassModal}
                            setIsOpen={setOpenCreateClassModal}
                            getClassOfTeacher={getClassOfTeacher}
                        />
                        <input
                            placeholder='Search...'
                            className='flex justify-center shadow-md focus:shadow-lg items-center pr-10 transition-all px-5 py-2 rounded-md outline-none'
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-row flex-wrap mt-5 gap-10 mb-10'>
                    {classes
                        ?.filter((val) => {
                            if (
                                searchTerm === '' ||
                                val.className.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                                return val;
                            return '';
                        })
                        .map((val, index) => {
                            return <ClassCard layout key={val?.id} classInfo={val} />;
                        })}
                </div>
            </div>
        </div>
    );
};

export default TeacherClasses;
