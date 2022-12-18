import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import Select from 'react-select';
import moment from 'moment';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from '../constant';
import createAxiosJWT from '../createAxiosJWT';
import TokenExpire from '../components/Modals/TokenExpire';

const axiosJWT = createAxiosJWT();

const avatarImage =
    'https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000';

const genders = [
    { value: false, label: 'Male' },
    { value: true, label: 'Female' },
];

const Profile = () => {
    const notify = (message) => toast(message);

    //name
    const fullNameRef = useRef(null);
    const [isExpired, setIsExpired] = useState(false);
    const [fullName, setFullName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [image, setImage] = useState([]);
    const [avatar, setAvatar] = useState();
    const [role, setRole] = useState('');

    //birthday
    const [selectedDay, setSelectedDay] = useState(null);

    //gender
    const [gender, setGender] = useState(0);

    const getProfile = async () => {
        try {
            const res = await axiosJWT.get(API_URL + 'account/profile');
            setSelectedDay({
                day: moment(res.data?.dateOfBirth).date(),
                month: moment(res.data?.dateOfBirth).month() + 1,
                year: moment(res.data?.dateOfBirth).year(),
            });
            setFullName(res.data?.fullName);
            setGender(genders.find((val) => val.value === res.data?.gender));
            setAvatar(res.data?.account.avatarImg);
            setRole(res.data?.account.role.role);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleEditName = () => {
        fullNameRef.current.focus();
        setIsEditingName(!isEditingName);
    };

    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            value={selectedDay ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` : ``}
            placeholder='Select a date'
            className='text-center outline-none border-b-2 py-1 focus:border-primary  cursor-pointer'
        />
    );

    const handleSave = async () => {
        try {
            const res = (image?.length &&
                image[0]?.file &&
                (await axiosJWT.post(
                    API_URL + 'file/image',
                    {
                        image: image[0].file,
                    },
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                ))) || { data: '' };
            try {
                await axiosJWT.put(API_URL + 'account/profile', {
                    fullName: fullName,
                    dateOfBirth: selectedDay
                        ? `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`
                        : ``,
                    gender: gender?.value,
                    avatarImg: res.data || '',
                });
                getProfile();
                notify('Updated success');
            } catch {
                notify('Update failed');
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        setImage([{ data_url: avatar }]);
    }, [avatar]);

    const onAvatarChange = (imageList) => {
        setImage(imageList);
    };

    return (
        <div className='px-20 py-10 flex flex-col bg-white h-screen gap-7 items-center'>
            {/* image */}
            <ImageUploading value={image} onChange={onAvatarChange} dataURLKey='data_url'>
                {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                    <div
                        className='relative flex flex-col'
                        onClick={!imageList?.length ? onImageUpload : () => onImageUpdate(0)}
                        {...dragProps}
                    >
                        <img
                            src={(imageList?.length && imageList[0]?.data_url) || avatarImage}
                            className='w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5'
                            alt=''
                        />
                        <div className='absolute z-1 w-full select-none flex items-center hover:text-white text-transparent justify-center rounded-full cursor-pointer transition-all hover:bg-gray-500 hover:bg-opacity-90 min-h-[200px]'>
                            <span>Change image</span>
                        </div>
                    </div>
                )}
            </ImageUploading>
            {/* information */}
            <div className='flex flex-row gap-5 items-center'>
                <input
                    ref={fullNameRef}
                    defaultValue={fullName}
                    size={fullName?.length}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`text-2xl text-center active:w-auto min-w-full resize-x font-medium max-w-[600px] text-primary outline-none px-2 transition-all border-b-2 py-2 ${
                        isEditingName ? ` border-primary ` : `border-transparent`
                    } `}
                    readOnly={!isEditingName}
                    maxLength={30}
                />
                <i
                    onClick={() => handleEditName()}
                    className='fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90'
                />
            </div>
            <span className='bg-green-500 rounded-xl text-white px-10 py-2'>{role}</span>
            <div className='w-fit font-[500] text-gray-500 flex flex-col gap-7 ml-5'>
                <div className='flex flex-row gap-5 items-center w-[400px]'>
                    <span className='flex items-center gap-5 w-[50%]'>
                        <i className='fa-solid fa-cake-candles ml-1 mr-1'></i> Date of birth
                    </span>
                    <DatePicker
                        value={selectedDay}
                        onChange={setSelectedDay}
                        renderInput={renderCustomInput}
                        shouldHighlightWeekends
                    />
                </div>
                <div className='flex flex-row items-center w-full'>
                    <span className='flex items-center gap-5 w-[50%]'>
                        <i className='fa-solid fa-venus-mars'></i> Gender
                    </span>
                    <Select
                        className='w-[50%]'
                        value={gender}
                        onChange={setGender}
                        options={genders}
                    />
                </div>
            </div>
            <div className='flex flex-row-reverse w-[40%]'>
                <Button onClick={handleSave} className='shadow-lg'>
                    Save
                </Button>
            </div>
            <TokenExpire isOpen={isExpired} />
        </div>
    );
};

export default Profile;
