import React from 'react'
import { useNavigate } from 'react-router-dom'

const DetailsCard = ({ title, isScore, shadow, color }) => {
  const { push } = useNavigate()
  return (
    <div
      className={`min-w-[200px] h-[225px] bg-white rounded-md flex flex-col justify-between relative`}
    >
      <div
        className={`absolute min-w-[200px] h-[225px] -z-10 rounded-md -translate-x-3 -translate-y-2 ${shadow}`}
      ></div>
      <div className="flex flex-col justify-center items-center gap-2 mt-16">
        <span
          className="font-semibold text-2xl cursor-pointer"
          onClick={() => {
            push('/class-details/score')
          }}
        >
          {title}
        </span>
        <span className={`text-4xl relative ${color}`}>
          100
          {isScore === true ? (
            <span className="absolute text-xl text-gray-400 translate-y-4">
              /100
            </span>
          ) : (
            ''
          )}
        </span>
      </div>
      <div className="flex flex-row-reverse mx-4 mb-3">
        <span
          className="cursor-pointer"
          onClick={() => {
            push('/class-details/score')
          }}
        >
          View Details
        </span>
      </div>
    </div>
  )
}

export default DetailsCard
