import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useCallback } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import Button from '../../components/Button'
import TokenExpire from '../../components/Modals/TokenExpire'
import TopicCard from '../../components/Student/TopicCard'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import { SocketContext } from '../../App'

import nocontent from '../../assets/image/nocontent.png'
import SkillInTopics from '../../components/Student/SkillInTopics'

const axiosJWT = createAxiosJWT()

const topicImage =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'
const StudentClass = () => {
  const socket = useContext(SocketContext)
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = useMemo(() => {
    return accessToken && jwtDecode(accessToken)
  }, [accessToken])

  const { classId } = useParams()
  const [topicsOfClass, setTopicsOfClass] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTopic, setCurrentTopic] = useState()
  const [skills, setSkills] = useState([])
  const [currentTopicId, setCurrentTopicId] = useState('')
  const [topics, setTopics] = useState()
  const [isExpired, setIsExpired] = useState(false)

  const getTopicIdUnlocked = (topics) => {
    for (let i = 0; i < topics.length; i++)
      if (topics[i].isUnlock === 1) return topics[i].topicId
  }
  const getTopicOfClass = useCallback(async () => {
    try {
      const topicsOfStudent = await axiosJWT.put(
        API_URL + `student-topic/class/${classId}`,
      )
      const result = topicsOfStudent.data
      if (!currentTopicId) setCurrentTopicId(getTopicIdUnlocked(result))
      let valueTopics = []
      for (let i = 0; i < result.length; ++i) {
        valueTopics = [
          ...valueTopics,
          {
            id: result[i].topicId,
            topicName: result[i].topicName,
            description: result[i].description,
            topicImg: result[i].topicImg,
            prerequisiteTopicName: result[i].prerequisiteTopicName,
            classTopicId: result[i].id,
          },
        ]
      }
      setTopics(valueTopics)
      setTopicsOfClass(result)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [classId, currentTopicId])

  const getSkillsOfTopic = useCallback(async () => {
    try {
      if (currentTopicId) {
        const res = await axiosJWT.get(
          API_URL + `student-skill/student/topic/${currentTopicId}`,
        )
        setSkills(res.data)
        setCurrentTopic(
          topics.find((topic) => topic.id === currentTopicId) || {},
        )
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [currentTopicId, topics])

  useEffect(() => {
    getSkillsOfTopic()
  }, [getSkillsOfTopic])

  useEffect(() => {
    getTopicOfClass()
  }, [getTopicOfClass])

  useEffect(() => {
    socket?.on('get-handle-request-notification', (data) => {
      if (
        data?.senderId !== decodedToken?.accountId &&
        data?.tableHandle === 'Student_Topic'
      ) {
        getTopicOfClass()
      }
    })
    return () => {
      socket?.off('get-handle-request-notification')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, decodedToken])

  return (
    <div className="flex flex-row h-screen">
      {/* left */}
      <div className="w-[40%] flex flex-col px-5 py-5 gap-6">
        <div className="flex flex-col gap-3 px-4">
          <span className="text-2xl font-medium truncate">ClassName</span>
          {/* search */}
          <div className="flex flex-row justify-between items-center w-full">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none rounded-lg text-base px-4 py-2 w-[65%] drop-shadow-md focus:drop-shadow-lg transition-all"
              placeholder="Search topics"
            />
          </div>
        </div>
        {/* filter */}
        {/* courses */}
        <div className="flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth">
          {topicsOfClass
            .filter((val) => {
              if (
                searchTerm === '' ||
                val.topicName.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return val
              return ''
            })
            .map((item, i) => {
              return (
                <TopicCard
                  topicInfo={item}
                  key={i}
                  setCurrentTopicId={setCurrentTopicId}
                />
              )
            })}
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto">
        {/* Topic tile */}
        {currentTopic ? (
          <>
            <div className="flex flex-row gap-3 justify-center items-center">
              <span className="text-2xl text-primary">
                {currentTopic?.topicName}
              </span>
            </div>
            {/* image */}
            <div
              className={`relative w-full min-h-[400px] overflow-hidden flex items-center justify-center bg-center select-none transition-all`}
            >
              <img
                src={currentTopic?.topicImg || topicImage}
                className="w-[500px] rounded-lg h-fit object-contain"
                alt=""
              />
            </div>
            {/* topic des */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center">
                <span className="text-2xl font-medium text-gray-700">
                  Topic descriptions
                </span>
              </div>
              {currentTopic?.description && (
                <span className="px-2 text-justify">
                  {currentTopic?.description}
                </span>
              )}
            </div>
            {/* skills */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center">
                <span className="text-2xl font-medium text-gray-700">
                  Skills
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {skills.map((val, i) => {
                  return (
                    <SkillInTopics
                      val={val}
                      key={val.id + i}
                      getTopicOfClass={getTopicOfClass}
                    />
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
            <img src={nocontent} alt="" className="h-[300px]" />
            <span className="text-2xl font-[500] text-primary">
              No content, choose 1 topic to view
            </span>
          </div>
        )}
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default StudentClass
