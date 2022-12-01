import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from '../../constant'
// components
import Button from '../../components/Button'
// import GrowingInput from '../../components/GrowingInput'
import TopicCard from '../../components/Student/TopicCard'
import GrowingTextArea from './GrowingTextArea'
import ModalAddTopic from '../TopicPages/ModalAddTopic'
import ModalCreateSkill from '../SkillPages/ModalCreateSkill'
import ModalAssign from '../../components/Modals/ModalAssign'
import TokenExpire from '../../components/Modals/TokenExpire'
import createAxiosJWT from '../../createAxiosJWT'
import TeacherSkillInTopics from '../../components/Teacher/TeacherSkillInTopics'

const axiosJWT = createAxiosJWT()
//test
const topicImage =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'

const TeacherManageTopic = () => {
  const { classId, topicId } = useParams()

  //Search
  const [searchTerm, setSearchTerm] = useState('')
  //Topics
  const [topicsOfClass, setTopicsOfClass] = useState([])
  const [topics, setTopics] = useState([])
  const [skills, setSkills] = useState([])
  const [currentTopic, setCurrentTopic] = useState({})
  const [currentTopicId, setCurrentTopicId] = useState()
  const [openAddTopic, setOpenAddTopic] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  const handleChangeImage = async (e) => {
    const res = await axios.post(
      API_URL + 'file/image',
      {
        image: e.target.files[0],
      },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
    currentTopic.topicImg = res.data
    handleUpdateInfoTopic()
  }

  const handleDeleteClassTopic = async (id) => {
    try {
      await axiosJWT.delete(API_URL + `class-topic/${id}`)
      getTopicOfClass()
    } catch (error) {
      console.log(error)
    }
  }

  const getTopicOfClass = useCallback(async () => {
    try {
      const res = await axiosJWT.get(
        API_URL + `class-topic/teacher/class/${classId}`,
      )
      console.log(res)
      const result = res.data
      if (result.length > 0 && result[0]?.topicId && !currentTopicId)
        setCurrentTopicId(result[0].topicId)
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

  useEffect(() => {
    getTopicOfClass()
  }, [getTopicOfClass])

  useEffect(() => {
    setTopicName(currentTopic.topicName)
    setTopicDes(currentTopic.description)
  }, [currentTopic])
  //edit Topic Name
  const topicNameRef = useRef(null)
  const [topicName, setTopicName] = useState('')
  const [isEditingTopicName, setIsEditingTopicName] = useState(false)
  const handleEditTopicName = () => {
    topicNameRef.current.focus()
    setIsEditingTopicName(!isEditingTopicName)
    if (isEditingTopicName) handleUpdateInfoTopic()
  }

  // topic des
  const topicDesRef = useRef(null)
  const [topicDes, setTopicDes] = useState('')
  const [isEditingDes, setIsEditingDes] = useState(false)
  const handleEditingDes = () => {
    topicDesRef.current.focus()
    setIsEditingDes(!isEditingDes)
    if (isEditingDes) handleUpdateInfoTopic()
  }

  const handleUpdateInfoTopic = async () => {
    try {
      await axiosJWT.put(API_URL + `topic/${currentTopicId}`, {
        topicName: topicNameRef?.current?.value,
        description: topicDesRef?.current?.value,
        topicImg: currentTopic?.topicImg,
        gradeId: currentTopic?.gradeId,
        prerequisiteTopicId: currentTopic?.prerequisiteTopicId,
      })
      getTopicOfClass()
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }

  //Skill
  const [modalCreateSkillIsOpen, setCreateSkillIsOpen] = useState(false)

  const getSkillsOfTopic = useCallback(async () => {
    try {
      if (currentTopicId) {
        const res = await axiosJWT.get(
          API_URL + `skill/topic/${currentTopicId}`,
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

  const handleOpenModalCreateSkill = () => {
    setCreateSkillIsOpen(true)
  }

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
            <Button
              className="border-none"
              onClick={() => {
                setOpenAddTopic(!openAddTopic)
              }}
            >
              Add a Topic
            </Button>
            <ModalAddTopic
              classId={classId}
              modalIsOpen={openAddTopic}
              setIsOpen={setOpenAddTopic}
              getTopicOfClass={getTopicOfClass}
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
                  onDeleteTopic={handleDeleteClassTopic}
                  setCurrentTopicId={setCurrentTopicId}
                  isTeacher
                />
              )
            })}
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto">
        {/* Topic tile */}
        <div className="flex flex-row gap-3 justify-center items-center">
          {currentTopic?.topicName && (
            <input
              ref={topicNameRef}
              size={topicName?.length || 10}
              value={topicName || ''}
              onChange={(e) => setTopicName(e.target.value)}
              className={`text-2xl text-center font-medium max-w-[600px] text-primary outline-none px-3 transition-all border-b-2 py-2 ${
                isEditingTopicName ? ` border-primary ` : `border-transparent`
              } `}
              readOnly={!isEditingTopicName}
            />
          )}
          <i
            onClick={() => handleEditTopicName()}
            className="fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90"
          />
        </div>
        {/* image */}
        <div
          className={`relative rounded-lg min-h-[300px] overflow-hidden flex items-center justify-center bg-center w-full select-none cursor-pointer transition-all`}
        >
          <img
            src={currentTopic?.topicImg || topicImage}
            className="h-[300px] w-full"
            alt=""
          />
          <label
            className="absolute z-1 w-full text-transparent hover:text-white hover:bg-gray-800 flex justify-center items-center hover:bg-opacity-50 transition-all min-h-[300px] cursor-pointer"
            htmlFor="image"
          >
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-0 h-0 opacity-0"
              onChange={handleChangeImage}
            ></input>
            <span className="text-2xl">Click to edit</span>
          </label>
        </div>
        {/* topic des */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">
              Topic descriptions
            </span>
            <span
              onClick={handleEditingDes}
              className="mr-5 text-primary cursor-pointer active:scale-90 select-none"
            >
              Edit
            </span>
          </div>
          {currentTopic?.description && (
            <GrowingTextArea
              ref={topicDesRef}
              value={topicDes}
              onChange={(e) => setTopicDes(e.target.value)}
              className="text-justify"
              readOnly={!isEditingDes}
              isEditing={isEditingDes}
            />
          )}
        </div>
        {/* skills */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">Skills</span>
            <Button onClick={handleOpenModalCreateSkill}>Add a skill</Button>
            <ModalCreateSkill
              modalCreateSkillIsOpen={modalCreateSkillIsOpen}
              setCreateSkillIsOpen={setCreateSkillIsOpen}
              topicId={currentTopicId}
              getTopicOfClass={getTopicOfClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            {skills.map((val, i) => {
              return (
                <TeacherSkillInTopics
                  val={val}
                  key={val.id + i}
                  getTopicOfClass={getTopicOfClass}
                  isTeacher
                />
              )
            })}
          </div>
        </div>
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default TeacherManageTopic
