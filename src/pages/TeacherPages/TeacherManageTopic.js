import React, { useRef, useState } from 'react'

// components
import Button from '../../components/Button'
import GrowingInput from '../../components/GrowingInput'
import TopicCard from '../../components/Student/TopicCard'
import GrowingTextArea from './GrowingTextArea'

//test
const topicImage =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'

const TeacherManageTopic = () => {
  //edit Topic Name
  const topicNameRef = useRef(null)
  const [isEditingTopicName, setIsEditingTopicName] = useState(false)
  const handleEditTopicName = () => {
    topicNameRef.current.focus()
    setIsEditingTopicName(!isEditingTopicName)
  }

  // topic des
  const topicDesRef = useRef(null)
  const [isEditingDes, setIsEditingDes] = useState(false)
  const handleEditingDes = () => {
    topicDesRef.current.focus()
    setIsEditingDes(!isEditingDes)
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
              className="outline-none rounded-lg text-base px-4 py-2 w-[65%] drop-shadow-md focus:drop-shadow-lg transition-all"
              placeholder="Search topics"
            />
            <Button className="border-none">Add a Topic</Button>
          </div>
        </div>
        {/* filter */}
        {/* courses */}
        <div className="flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth">
          {new Array(3).fill(0).map((item, i) => {
            return <TopicCard key={i} isTeacher />
          })}
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto">
        {/* Topic tile */}
        <div className="flex flex-row gap-3 justify-center items-center">
          <GrowingInput
            ref={topicNameRef}
            className={`text-2xl text-center font-medium text-primary`}
            defaultValue="Text"
            readOnly={!isEditingTopicName}
            isEditing={isEditingTopicName}
          />
          <i
            onClick={() => handleEditTopicName()}
            className="fa-regular fa-pen-to-square mb-1 cursor-pointer text-primary font-medium text-xl select-none active:scale-90"
          />
        </div>
        {/* image */}
        <img
          src={topicImage}
          className="rounded-lg h-[300px] select-none pointer-events-none"
          width="100%"
          alt=""
        ></img>
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
          <GrowingTextArea
            ref={topicDesRef}
            className="text-justify"
            defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            readOnly={!isEditingDes}
            isEditing={isEditingDes}
          />
        </div>
        {/* skills */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">Skills</span>
            <Button>Add a skill</Button>
          </div>
          <div className="flex flex-col gap-3">
            {new Array(3).fill(0).map((val, i) => {
              return (
                <div key={i} className="flex flex-col gap-3 px-2 py-3 ">
                  <span className="border-b p-y-2">Skill name</span>
                  <div className="flex flex-col gap-2">
                    {new Array(2).fill(0).map((val, i) => {
                      return (
                        <div>
                          <span>Assignment</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeacherManageTopic
