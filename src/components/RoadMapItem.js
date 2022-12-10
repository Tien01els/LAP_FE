import React from 'react'

const RoadMapItem = ({ val, children, className = '', isTeacher }) => {
  return (
    <div
      className={`flex flex-col gap-2 w-[400px] px-5 py-5 bg-white rounded-md shadow-md ${className}`}
    >
      {children}
      <span className="text-xl text-primary font-[500] w-full truncate">
        Topic name
      </span>
      <span className="text-xs text-gray-500 w-full truncate">
        Prerequisite topic namePrerequisite topic namePrerequisite topic
        namePrerequisite topic name
      </span>
      <span className="text-justify whitespace-normal break-words">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
      </span>
      <div className="flex justify-between">
        <span className="text-gray-500 text-sm">Pass score</span>
        {!isTeacher && <span className="text-sm text-green-400">Passed</span>}
      </div>
    </div>
  )
}

export default RoadMapItem
