import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button'
import 'react-circular-progressbar/dist/styles.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import TopicCard from '../../components/Student/TopicCard'

const StudentClass = () => {
  return (
    <div className="flex flex-row h-screen">
      {/* left */}
      <div className="w-[40%] flex flex-col px-5 py-5 gap-6">
        <div className="flex flex-col gap-3 px-4">
          {/* search */}
          <span className="text-2xl font-medium">ClassName</span>
          <input
            className="outline-none rounded-lg text-base px-4 py-2 drop-shadow-md focus:drop-shadow-lg transition-all"
            placeholder="Search topics"
          />
        </div>
        {/* filter */}
        {/* courses */}
        <div className="flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth">
          {new Array(10).fill(0).map((item, i) => {
            return <TopicCard />
          })}
        </div>
      </div>
      {/* right */}
      <div className="w-[60%] bg-white py-5 px-10 overflow-y-auto">
        Content here
      </div>
    </div>
  )
}

export default StudentClass
