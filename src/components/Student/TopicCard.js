import React, { useState, useEffect, useMemo, useContext } from 'react'
import jwtDecode from 'jwt-decode'

import ConfirmModal from '../Modals/ConfirmModal'
import { SocketContext } from '../../App'

const imgsrc =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'

const TopicCard = ({
  topicInfo,
  onDeleteTopic,
  isTeacher,
  setCurrentTopicId,
  isParent,
}) => {
  const socket = useContext(SocketContext)

  const [isOpenModalRequest, setIsOpenModalRequest] = useState(false)
  const [isRequested, setIsRequested] = useState(false)
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)

  const accessToken = localStorage.getItem('access_token')
  const decodedToken = useMemo(() => {
    return accessToken && jwtDecode(accessToken)
  }, [accessToken])
  const handleRequestOpen = () => {
    !isParent && !isRequested && setIsOpenModalRequest(!isOpenModalRequest)
  }

  const toggleDeleteConfirm = () => {
    setIsOpenConfirmDelete(false)
  }

  const deleteTopic = () => {
    onDeleteTopic(topicInfo?.id)
  }

  const handleLockedOnClick = () => {
    if (topicInfo?.isUnlock) {
      setCurrentTopicId(topicInfo?.topicId)
    }
    if (isTeacher) {
      setCurrentTopicId(topicInfo?.topicId)
    }
  }

  const handleSendRequestUnlock = async () => {
    socket?.emit('send-request-unlock-topic', {
      senderId: decodedToken?.accountId,
      userId: decodedToken?.userId,
      topicId: topicInfo?.topicId,
      tableHandle: 'Student_Topic',
      idTableHandle: topicInfo.id,
    })
    setIsOpenModalRequest(!isOpenModalRequest)
    setIsRequested(true)
  }

  useEffect(() => {
    setIsRequested(topicInfo?.notificationContentId)
  }, [topicInfo])

  return (
    <>
      <ConfirmModal
        isOpen={isOpenModalRequest}
        noConfirm={handleRequestOpen}
        yesConfirm={handleSendRequestUnlock}
        message="Confirm to send request to open this topic."
      />
      <ConfirmModal
        isOpen={isOpenConfirmDelete}
        noConfirm={toggleDeleteConfirm}
        yesConfirm={() => {
          deleteTopic()
          setIsOpenConfirmDelete(false)
        }}
        message="Are you sure to remove this from class topic?"
      />
      <div
        onClick={() => {
          handleLockedOnClick()
        }}
        className="w-full relative cursor-pointer flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3"
      >
        {!topicInfo?.isUnlock && !isTeacher && (
          <div
            onClick={() => handleRequestOpen()}
            className={`w-full absolute flex flex-row gap-4 items-center justify-center bg-gray-700 bg-opacity-70 rounded-[16px] h-[152px] -translate-x-3 z-1 ${
              isRequested ? '' : 'cursor-pointer'
            }`}
          >
            <span className="text-white">
              {isRequested
                ? `Waiting for teacher response...`
                : isParent
                ? `Locked`
                : `Request to open topic`}
            </span>
          </div>
        )}
        <img
          src={topicInfo?.topicImg || imgsrc}
          alt={''}
          className=" object-cover h-32 w-32 rounded-lg "
        />
        <div className="flex flex-col justify-evenly w-full h-full">
          <div className="flex flex-row items-center justify-between">
            <span className="font-medium w-[225px] truncate cursor-pointer">
              {topicInfo?.topicName}
            </span>
            {isTeacher && (
              <div
                className={`rounded-full relative h-[30px] w-[30px] cursor-pointer select-none flex items-center justify-center bg-white hover:bg-gray-100`}
                onClick={() => {
                  setIsOpenConfirmDelete(true)
                }}
              >
                <i className="fa-regular fa-trash-can text-sm text-red-400"></i>
              </div>
            )}
          </div>
          <span className="text-xs w-[260px] h-[48px] whitespace-normal break-words line-clamp-3">
            {topicInfo?.description}
          </span>
          <div className="flex flex-row justify-between items-center mr-2 text-xs">
            <span>
              Skills :{' '}
              <span className="text-primary">{topicInfo?.numberSkills}</span>
            </span>
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setCurrentTopicId(topicInfo?.topicId)
              }}
            >
              View
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopicCard
