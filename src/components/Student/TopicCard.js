import React, { useState } from 'react'

import ConfirmModal from '../Modals/ConfirmModal'

const imgsrc =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'

const TopicCard = ({
  TopicInfo,
  onDeleteTopic,
  isTeacher,
  setCurrentTopicId,
  isLocked,
}) => {
  const [openMoreOption, setOpenMoreOption] = useState(false)
  const [isOpenModalRequest, setIsOpenModalRequest] = useState(false)

  const [isRequested, setIsRequested] = useState(false)

  const handleRequestOpen = () => {
    if (isRequested) return
    setIsOpenModalRequest(!isOpenModalRequest)
  }

  const handleAcceptToRequest = () => {
    setIsRequested(true)
    setIsOpenModalRequest(!isOpenModalRequest)
  }

  return (
    <div className="w-full relative flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3">
      <ConfirmModal
        isOpen={isOpenModalRequest}
        noConfirm={handleRequestOpen}
        yesConfirm={handleAcceptToRequest}
        message="Confirm to send request to open this topic."
      />
      {isLocked && (
        <div
          onClick={() => handleRequestOpen()}
          className="w-full absolute flex flex-row gap-4 items-center justify-center bg-gray-700 bg-opacity-70 rounded-[16px] h-[152px] -translate-x-3 cursor-pointer z-1"
        >
          <span className="text-white">
            {isRequested
              ? `Waiting for teacher response...`
              : `Request to Open topic`}
          </span>
        </div>
      )}
      <img
        src={TopicInfo?.topicImg || imgsrc}
        alt={''}
        className="object-fill h-32 w-36 rounded-lg"
      />
      <div className="flex flex-col justify-evenly w-full h-full">
        <div className="flex flex-row justify-between items-center">
          <span
            onClick={() => {
              setCurrentTopicId(TopicInfo?.topicId)
            }}
            className="font-medium w-[220px] truncate cursor-pointer"
          >
            {TopicInfo?.topicName}
          </span>
          {isTeacher && (
            <div className="flex flex-col">
              <div
                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
                  openMoreOption ? `gray-100` : `white`
                } hover:bg-gray-100`}
                onClick={() => setOpenMoreOption(!openMoreOption)}
              >
                <i className="fas fa-ellipsis-h font-xs"></i>
                {openMoreOption && (
                  <div className="absolute z-1 translate-y-12 -translate-x-5 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b">
                    <div
                      className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all"
                      onClick={() => {
                        onDeleteTopic(TopicInfo?.id)
                      }}
                    >
                      <span>Remove</span>
                    </div>
                    <div className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all">
                      <span>Edit</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <span className="text-xs w-[260px] h-[48px] whitespace-normal break-words line-clamp-3">
          {TopicInfo?.description}
        </span>
        <div className="flex flex-row justify-between items-center pr-1 text-xs">
          <span>
            Skills :{' '}
            <span className="text-primary">{TopicInfo?.numberSkills}</span>
          </span>
          <span
            className="text-primary cursor-pointer"
            // onClick={() => handleViewStudent()}
            onClick={() => {
              setCurrentTopicId(TopicInfo?.topicId)
            }}
          >
            View
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopicCard
