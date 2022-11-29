import Reactm, { useRef } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Button from '../Button'

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

  const handleDeleteClass = () => {
    if (confirmRef.current.value === 'delete this class') {
      console.log(classId)
      setIsOpen(false)
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
