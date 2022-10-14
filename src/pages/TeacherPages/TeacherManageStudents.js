import React, { useState } from 'react'
import Button from '../../components/Button'
import StudentCard from '../../components/Teacher/StudentCard'
import { buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CustomProgressBar from '../../components/CustomProgressBar'
import { Swiper, SwiperSlide } from 'swiper/react'
import achievementImg from '../../assets/image/achievement.png'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'

const TeacherManageStudents = () => {
  const [averageScore, setAverageScore] = useState(56)
  const [filterStudent, setFilterStudent] = useState('All')

  return (
    <div className="flex flex-row h-screen">
      {/* left */}
      <div className="w-[40%] flex flex-col px-10 py-5 gap-6">
        <div className="flex flex-row justify-between items-center px-4">
          {/* search */}
          <span className="text-2xl font-medium">Students</span>
          <input
            className="outline-none rounded-lg text-base px-4 py-2 drop-shadow-md focus:drop-shadow-lg transition-all"
            placeholder="Search"
          />
        </div>
        {/* filter */}
        <div className="flex flex-row justify-between items-center pl-6 pr-4 text-lg">
          <div className="flex flex-row h-[30px] gap-5 items-center">
            <span
              onClick={() => setFilterStudent('All')}
              className={`cursor-pointer transition-all ${
                filterStudent === 'All' ? 'font-medium ' : 'text-base'
              }`}
            >
              All
            </span>
            <span
              onClick={() => setFilterStudent('Good')}
              className={`cursor-pointer transition-all ${
                filterStudent === 'Good' ? 'font-medium ' : 'text-base'
              }`}
            >
              Good
            </span>
            <span
              onClick={() => setFilterStudent('Below Average')}
              className={`cursor-pointer transition-all ${
                filterStudent === 'Below Average' ? 'font-medium ' : 'text-base'
              }`}
            >
              Below Average
            </span>
          </div>
          <div>
            <Button className="text-xs border-none">Add a student</Button>
          </div>
        </div>
        {/* cards */}
        <div className="flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth">
          {new Array(4).fill(0).map((val, i) => {
            return <StudentCard key={i} />
          })}
        </div>
      </div>
      {/* right */}
      <div className="w-[60%] bg-white py-5 px-10 overflow-y-auto">
        <div className="flex flex-col gap-5 justify-center items-center">
          <img
            src="https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000"
            alt=""
            className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5"
          />
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-2xl my-3">Nguyen Minh Nhat</span>
            <span className="text-gray-500 text-sm">
              Date of birth : 25/04/2001
            </span>
          </div>
          {/* swiper */}
          <div className="flex flex-col justify-center items-center select-none w-[750px] select-none">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-[100%] justify-center items-center"
            >
              <SwiperSlide>
                <div className="h-[200px] w-[200px] pt-5 font-opensan">
                  <CustomProgressBar
                    value={averageScore}
                    circleRatio={0.75}
                    initialAnimation={true}
                    styles={buildStyles({
                      pathColor: '#5199ad',
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: '#eee',
                    })}
                  >
                    <div className="flex flex-col items-center justify-center text-primary">
                      <span className="font-semibold text-4xl">
                        {averageScore}
                      </span>
                      <span className="font-semibold text-sm">
                        Average Score
                      </span>
                    </div>
                  </CustomProgressBar>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col">
                  <div
                    className="h-[160px] w-[200px] bg-cover"
                    style={{
                      backgroundImage: "url('" + achievementImg + "')",
                    }}
                  ></div>
                  <div className="flex gap-3 items-center">
                    <span className="text-primary text-2xl">56</span> Topics
                    completed
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/*  */}
          <div className="flex flex-col gap-7">
            {/* Bio*/}
            <div className="flex flex-col gap-3 w-full">
              <div>
                <span className="text-2xl font-medium text-primary select-none">
                  Bio
                </span>
              </div>
              <p className="text-justify text-base text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
            </div>
            {/* Topics */}
            <div className="flex flex-col gap-3 w-full">
              <div>
                <span className="text-2xl font-medium text-primary select-none">
                  Topics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherManageStudents
