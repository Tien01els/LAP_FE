import React, { useState } from 'react'

const imgsrc =
  'https://students.flinders.edu.au/_jcr_content/content/section_856874544_co/par_0/image_general.coreimg.png/1621207287287/waving-person.png'

const TopicCard = ({ TopicInfo, isTeacher }) => {
  const [openMoreOption, setOpenMoreOption] = useState(false)

  return (
    <div className="w-full flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3">
      <img
        src={TopicInfo?.img}
        alt=""
        className="object-fill h-32 w-36 rounded-lg"
      />
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex flex-row justify-between items-center">
          <span className="font-medium w-[220px] truncate cursor-pointer">
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
                      onClick={() => {}}
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
        <p className="text-xs line-clamp-3">{TopicInfo?.descriptions}</p>
        <div className="flex flex-row justify-between items-center pr-1 text-xs">
          <span>
            Skills : <span className="text-primary">{TopicInfo?.skill}</span>
          </span>
          <span
            className="text-primary cursor-pointer"
            // onClick={() => handleViewStudent()}
          >
            View
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopicCard
