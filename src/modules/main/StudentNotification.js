import React from 'react'

const StudentNotification = ({ value }) => {
  return (
    <div className="flex flex-row p-3 select-none  hover:bg-gray-100 transition-all gap-4">
      {value.type === 'Accepted' ? (
        <i className="fa-solid fa-square-check text-2xl text-green-400"></i>
      ) : (
        <i className="fa-solid fa-square-xmark text-2xl text-red-400"></i>
      )}
      <div className="flex flex-col gap-2">
        <span className="max-w-[260px] pt-1 text-sm whitespace-normal break-words text-gray-600">
          {value.message}
        </span>
        <span className="text-xs text-gray-400">{value.time}</span>
      </div>
    </div>
  )
}

export default StudentNotification
