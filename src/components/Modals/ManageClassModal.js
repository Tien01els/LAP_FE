import React, { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import Modal from 'react-modal';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import classroomBackground from './../../assets/image/classroom-background.jpg';
import axios from 'axios';
import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(165, 165, 165, 0.6)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
    },
};

const ManageClassModal = ({ isOpen, setIsOpen, edit, getClassOfTeacher, classInfo }) => {
    const { register, handleSubmit } = useForm();
    const [grades, setGrades] = useState([]);
    const [image, setImage] = React.useState([]);
    const [gradeId, setGradeId] = useState();

    const onSubmit = async (data) => {
        if (edit && classInfo) {
            const res = (image?.length &&
                image[0]?.file &&
                (await axios.post(
                    API_URL + 'file/image',
                    {
                        image: image?.length && image[0]?.file,
                    },
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                ))) || { data: classInfo.classImg };
                const updateClass = {
                    className: data.className,
                    classImg: res.data || '',
                };
            await axiosJWT.put(API_URL + `class/${classInfo.id}`, updateClass);
        } else {
            const res = await axios.post(
                API_URL + 'file/image',
                {
                    image: image?.length && image[0]?.file,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            const createClass = {
                className: data.className,
                classImg: res.data || '',
                year: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                gradeId: gradeId,
            };
            await axiosJWT.post(API_URL + `class`, createClass);
            getClassOfTeacher();
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axiosJWT.get(API_URL + `grade`).then((res) => {
            setGrades(res.data);
        });
    }, []);

    useEffect(() => {
        setImage([{ data_url: classInfo?.classImg }]);
    }, [classInfo]);

    const onChange = (imageList) => {
        setImage(imageList);
    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex flex-col w-[500px] h-fit gap-5'>
                <span className='text-2xl'>{edit ? `Edit` : `Create`} class</span>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    {/* class name */}
                    <div className='flex flex-col gap-2 px-2 w-full'>
                        <span className='px-2'>Class name</span>
                        <input
                            defaultValue={classInfo?.className}
                            type='text'
                            {...register('className', { required: true })}
                            placeholder='Type in class name'
                            className='outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary'
                        />
                    </div>
                    {/* grade */}
                    {edit ? (
                        <></>
                    ) : (
                        <div className='flex flex-col gap-2 px-2'>
                            <span className='px-2'>Grade</span>
                            <Select
                                defaultValue={gradeId}
                                options={grades}
                                type='text'
                                placeholder='Pick a grade'
                                onChange={(e) => setGradeId(e.id)}
                                className='min-w-[332px] bg-gray'
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.gradeName}
                            />
                        </div>
                    )}
                    {/* class image */}
                    <ImageUploading value={image} onChange={onChange} dataURLKey='data_url'>
                        {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                            <div
                                className='flex items-center justify-center w-full'
                                onClick={
                                    !imageList?.length ? onImageUpload : () => onImageUpdate(0)
                                }
                                {...dragProps}
                            >
                                <div
                                    className={`relative rounded-lg min-h-[100px] w-[80%] overflow-hidden flex items-center justify-center bg-center select-none cursor-pointer transition-all`}
                                >
                                    <img
                                        src={
                                            (imageList?.length && imageList[0]?.data_url) ||
                                            classroomBackground
                                        }
                                        className='h-[200px] w-full'
                                        alt=''
                                    />
                                    <label
                                        className='absolute z-1 w-full text-transparent hover:text-white hover:bg-gray-800 flex justify-center items-center hover:bg-opacity-50 transition-all min-h-[300px] cursor-pointer'
                                        htmlFor='image'
                                    >
                                        <span className='text-2xl'>Pick an image</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                    {/*  */}
                    <div className='w-full flex flex-row-reverse gap-5'>
                        <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
                        <Button type='submit'>{edit ? `Save` : `Create`}</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ManageClassModal;
