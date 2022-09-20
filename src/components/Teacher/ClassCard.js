import React from 'react'

const ClassCard = ({ classInfo }) => {
  return (
    <div className="flex flex-col gap-2 bg-white shadow-lg hover:shadow-xl duration-300 w-[250px] h-[200px] rounded-lg">
      <div className="flex justify-center pt-5">
        <img
          src={classInfo?.image}
          alt=""
          className="rounded-md w-[200px] h-[100px] cursor-pointer"
        ></img>
      </div>
      <div className="flex flex-col ml-6 mr-5 hover:underline underline-offset-4">
        <span className="font-semibold text-lg cursor-pointer truncate">
          {classInfo?.name}
        </span>
      </div>
      <div className="flex flex-row justify-between mx-6">
        <span className="text-sm no-underline cursor-default">
          {classInfo?.year}
        </span>
        <span className="text-sm no-underline cursor-default">
          Grade <span className="font-semibold">{classInfo?.grade}</span>
        </span>
      </div>
    </div>
  )
}

export default ClassCard
