import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-modal';

import { API_URL } from '../../constant';
import Button from '../../components/Button';
import createAxiosJWT from '../../createAxiosJWT';
import { toast } from 'react-toastify';
import Select from 'react-select';

const axiosJWT = createAxiosJWT();
const ModalCreateTopic = ({
    modalTopicIsOpen,
    setTopicIsOpen,
    handleCloseModalAddTopic,
    getTopicOfClass,
    classId,
}) => {
    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: formStateCreate,
        watch,
        control,
    } = useForm();

    const [grades, setGrades] = useState([]);
    const [prerequisiteTopicGrades, setPrerequisiteTopicGrades] = useState([]);

    const getAllGrades = async () => {
        const res = await axiosJWT.get(API_URL + `grade/teacher`);
        setGrades(res.data);
    };

    function handleCloseModalCreateTopic() {
        setTopicIsOpen(false);
    }

    useEffect(() => {
        getAllGrades();
        // getPrerequisiteTopicOfGrade()
    }, []);

    useEffect(() => {
        if (formStateCreate.isSubmitSuccessful) {
            resetCreate({
                topicName: '',
                description: '',
                gradeId: -1,
                prerequisiteTopicId: -1,
            });
            handleCloseModalCreateTopic();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStateCreate, resetCreate]);

    const handleCreateTopic = async (data) => {
        try {
            const prerequisiteTopic = data.prerequisiteTopicId?.id
                ? {
                      prerequisiteTopicId: data.prerequisiteTopicId.id,
                  }
                : {};
            const topic = {
                topicName: data.topicName,
                description: data.description,
                gradeId: data.gradeId.id,
                isUnlock: !data.isLock,
                ...prerequisiteTopic,
            };
            const res = await axiosJWT.post(API_URL + `topic`, topic);
            if (res.data) {
                await axiosJWT.post(API_URL + `class-topic`, {
                    topicId: res.data.topic?.id,
                    isUnlock: !data.isLock,
                    classId,
                });
                getTopicOfClass();
            }
        } catch (err) {
            console.log(err);
            toast('Create topic failed');
        }
        handleCloseModalAddTopic();
    };

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
            overflow: 'visible',
        },
    };

    let watchGrade = watch('gradeId');

    const getPrerequisiteTopicOfGrade = async () => {
        // const res = await axiosJWT.get(
        //   API_URL + `topic/teacher/grade/${currentGrade}`,
        // )
        try {
            const res = await axiosJWT.get(API_URL + `topic/teacher/grade/${watchGrade?.id}`);
            setPrerequisiteTopicGrades(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPrerequisiteTopicOfGrade();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchGrade]);

    return (
        <Modal
            isOpen={modalTopicIsOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex justify-end'>
                <button onClick={handleCloseModalCreateTopic}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <form
                className='flex flex-col w-[500px] '
                onSubmit={handleSubmitCreate(handleCreateTopic)}
            >
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-center'>
                        <h2 className='text-2xl font-semibold'>Create new topic</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='topicName'>Topic name</label>
                        <input
                            type='text'
                            name='topicName'
                            placeholder='Enter topic name'
                            className='outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary'
                            {...registerCreate('topicName', { required: true })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='description'>Topic description</label>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Description'
                            className='resize-none outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary'
                            {...registerCreate('description', { required: true })}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <input id='lockTopicCreate' type='checkbox' {...registerCreate('isLock')} />
                        <label htmlFor='lockTopicCreate' className='select-none cursor-pointer'>
                            Lock topic
                        </label>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='gradeId'>Grade</label>
                        <Controller
                            name='gradeId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    onChange={field.onChange}
                                    options={grades}
                                    getOptionValue={(option) => option.id}
                                    getOptionLabel={(option) => option.gradeName}
                                    styles={{
                                        menuList: (base) => ({
                                            ...base,
                                            maxHeight: '100px', // your desired height
                                        }),
                                    }}
                                ></Select>
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='prerequisiteTopicId'>Prerequisite topic</label>
                        {prerequisiteTopicGrades?.length > 0 && (
                            <Controller
                                name='prerequisiteTopicId'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={prerequisiteTopicGrades}
                                        getOptionValue={(option) => option.id}
                                        getOptionLabel={(option) => option.topicName}
                                        styles={{
                                            menuList: (base) => ({
                                                ...base,
                                                maxHeight: '160px', // your desired height
                                            }),
                                        }}
                                        // menuPlacement='top'
                                    ></Select>
                                )}
                            ></Controller>
                        )}
                    </div>
                </div>
                <Button className='border-none bg-primary w-full mt-5'>Create</Button>
            </form>
        </Modal>
    );
};

export default ModalCreateTopic;
