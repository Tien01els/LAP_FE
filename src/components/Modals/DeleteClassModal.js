import React, { useRef } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import { API_URL } from '../../constant'

import createAxiosJWT from '../../createAxiosJWT'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const axiosJWT = createAxiosJWT()
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
}

const DeleteClassModal = ({ isOpen, setIsOpen, classId }) => {
  const [wrongText, setWrongText] = useState(false)
  const navigate = useNavigate()
  const notify = (message) => toast(message)
  const handleDeleteClass = async () => {
    if (confirmRef.current.value === 'delete this class') {
      try {
        await axiosJWT.delete(API_URL + `class/${classId}`)
      } catch (err) {
        notify('Delete failed please try again')
      }
      setIsOpen(false)
      navigate(`/class`)
      notify('Deleted success')
    } else {
      confirmRef.current.focus()
      setWrongText(true)
    }
  }

  const confirmRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-4 w-[500px]">
        <span className="text-2xl font-medium">Confirm delete class</span>
        <span className="px-2">
          Type in <span className="text-red-500">"delete this class"</span> to
          confirm
        </span>
        <input
          ref={confirmRef}
          className={`px-3 py-2 ${
            wrongText ? `outline-red-400` : `outline-primary`
          } border border-gray-500 rounded-lg transition-all`}
          type="text"
          placeholder="Confirm"
        />
        <div className="flex flex-row-reverse mt-5 gap-5">
          <Button
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteClass}>Confirm</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteClassModal
