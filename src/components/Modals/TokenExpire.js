import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../constant';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const TokenExpire = ({ isOpen }) => {
    const navigate = useNavigate();

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
    const handleLogOut = async () => {
        try {
            await axiosJWT.delete(API_URL + 'account/logout');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.log(err);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
            window.location.reload();
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex justify-end'>
                <button onClick={handleLogOut}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <div className='flex flex-col gap-3 w-[500px]'>
                <span className='text-2xl'>Session Expired</span>
                <span>Your session has expired pleas login again</span>
            </div>
        </Modal>
    );
};

export default TokenExpire;
