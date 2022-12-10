import React, { useState } from 'react'
import Select from 'react-select'
import RoadMapItem from '../components/RoadMapItem'

const items = [
  {
    title: 'May 1940',
    cardTitle: 'Dunkirk',
    url: 'http://www.history.com',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText:
      'Men of the British Expeditionary Force (BEF) wade out to..',
  },
]

const RoadMap = ({ isTeacher }) => {
  const options = [
    { value: 1, label: 'Grade 1' },
    { value: 2, label: 'Grade 2' },
    { value: 3, label: 'Grade 3' },
  ]

  const [selectedGrade, setSelectedGrade] = useState({})

  return (
    <>
      <div className="flex flex-col gap-7 items-center py-7 px-10">
        {/* top */}
        <div className="flex flex-col gap-5 items-center">
          <span className="text-4xl font-[500] text-gray-600">Road map</span>
          {isTeacher && (
            <Select
              options={options}
              value={selectedGrade}
              onChange={setSelectedGrade}
              className="w-[400px]"
            />
          )}
        </div>

        <div className="relative w-[850px]">
          <div className="bg-primary absolute w-1 left-[calc(50%-2px)] h-full"></div>
          <div className="flex flex-col gap-5 [&>*:nth-child(odd)]:self-start  [&>*:nth-child(even)]:self-end">
            {new Array(5).fill(0).map((val, i) => {
              return (
                <RoadMapItem
                  key={i}
                  val={val}
                  className="relative"
                  isTeacher={isTeacher}
                ></RoadMapItem>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default RoadMap
