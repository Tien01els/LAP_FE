import React, { useState, useEffect, useCallback, useMemo, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';
import { SocketContext } from '../../App';
import TeacherNotification from './TeacherNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosJWT = createAxiosJWT();

function useOutsideAlerter(ref, setIsOpenNoti) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpenNoti(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
}

const TeacherMenu = () => {
    const accessToken = localStorage.getItem('access_token');
    const decodedToken = useMemo(() => {
        return accessToken && jwtDecode(accessToken);
    }, [accessToken]);
    const socket = useContext(SocketContext);

    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [newNoti, setNewNoti] = useState(false);

    useEffect(() => {
        socket?.on('get-request-unlock-topic', async (data) => {
            if (data.senderId !== decodedToken?.accountId) {
                setNotifications((prev) => [data, ...prev]);
                toast.info(data?.content, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setNewNoti(true);
            }
        });
        return () => {
            socket?.off('get-request-unlock-topic');
        };
    }, [socket, decodedToken]);

    const getNotificationsOfUser = useCallback(async () => {
        try {
            if (decodedToken) {
                const res = await axiosJWT.get(
                    API_URL + `notification-content/receiver/${decodedToken.accountId}`
                );
                setNotifications(res.data);
                console.log(res.data[0]);
                if (res.data?.some((e) => e.isSeen === 0)) setNewNoti(true);
                else setNewNoti(false);
            }
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decodedToken]);

    useEffect(() => {
        getNotificationsOfUser();
    }, [getNotificationsOfUser]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setIsOpenNoti);

    const seenNoti = async (notiId) => {
        try {
            await axiosJWT.put(API_URL + `notification-content/${notiId}/seen-notification`);
            getNotificationsOfUser();
        } catch (err) {
            console.log(err);
        }
    };

    const seenAll = async () => {
        try {
            await axiosJWT.put(
                API_URL +
                    `notification-content/receiver/${decodedToken.accountId}/seen-all-notification`
            );
            setNewNoti(false);
            getNotificationsOfUser();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex flex-col gap-3'>
            <NavLink
                to={'/dashboard'}
                className={({ isActive }) =>
                    isActive
                        ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
                        : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
                }
            >
                <i className='fa-solid fa-chart-line text-xl pb-1'></i>
                <span className='font-semibold text-sm'>Dashboard</span>
            </NavLink>
            <NavLink
                to={'/class'}
                className={({ isActive }) =>
                    isActive
                        ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
                        : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100  text-gray-600'
                }
            >
                <i className='far fa-bookmark text-xl mb-1 ml-1'></i>
                <span className='font-semibold ml-[3px] text-sm'>Classes</span>
            </NavLink>

            <div className='relative' ref={wrapperRef}>
                <ToastContainer />
                <div
                    onClick={() => setIsOpenNoti(!isOpenNoti)}
                    className={
                        isOpenNoti
                            ? 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none  text-gray-600 bg-[#e5ebee]'
                            : 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none hover:bg-gray-100  text-gray-600'
                    }
                >
                    <i className='fa-regular fa-bell text-xl'></i>
                    <span className='font-semibold ml-1 text-sm'>Notification</span>
                    {newNoti && (
                        <div className='absolute bg-red-500 w-[8px] h-[8px] translate-x-3 -translate-y-3 rounded-full'></div>
                    )}
                </div>
                <div
                    className={`${
                        isOpenNoti ? `` : `hidden`
                    }  absolute bg-white rounded-r-lg pr-1 pb-2 shadow flex flex-col w-[350px] h-screen wibu:h-screen translate-x-[210px] wibu:-translate-y-[365px] -translate-y-[365px] z-[1000px]`}
                >
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xl text-gray-600 font-[500] px-5 py-3'>
                            Notifications
                        </span>
                        <span
                            onClick={seenAll}
                            className='text-sm text-primary pr-3 pt-1 select-none cursor-pointer'
                        >
                            Mark as read all
                        </span>
                    </div>
                    <div className='flex flex-col overflow-y-auto'>
                        {notifications?.map((val, i) => {
                            return (
                                <TeacherNotification seenNoti={seenNoti} key={val.id} value={val} />
                            );
                        })}
                    </div>
                </div>
            </div>

            <NavLink
                to={'/profile'}
                className={({ isActive }) =>
                    isActive
                        ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#f9fbfc]'
                        : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
                }
            >
                <i className='fa-regular fa-user text-xl pb-1 pr-1'></i>
                <span className='font-semibold text-sm'>Profile</span>
            </NavLink>
        </div>
    );
};

export default TeacherMenu;
