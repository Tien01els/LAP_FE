import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import Button from '../Button'

const axiosJWT = createAxiosJWT()
const GenerateQuestionForAssignenment = ({
  selectedGrade,
  selectedTopic,
  selectedSkills,
  listCurrentQuestion,
  onCloseModalGenerate,
  onUpdateGenerateQuestion,
}) => {
  const { assignmentId } = useParams()

  const [isHint, setIsHint] = useState(true)
  const [levels, setLevels] = useState([])
  const [questionTypes, setQuestionTypes] = useState([])
  const [gradeId, setGradeId] = useState()
  const [topicId, setTopicId] = useState()
  const [skillIds, setSkillIds] = useState()
  const [numberQuestion, setNumberQuestion] = useState(0)

  const [listGrade, setListGrade] = useState([])
  const [listTopic, setListTopic] = useState([])
  const [listSkill, setListSkill] = useState([])

  const selectGrade = useRef()
  const selectTopic = useRef()
  const selectSkill = useRef()
  const prevSkill = useRef(selectedSkills[0])

  const levelOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]
  const selectOptions = [
    { value: 1, label: 'Multi Choice' },
    { value: 2, label: 'True False' },
    { value: 3, label: 'Input' },
    { value: 4, label: 'Multi Select' },
  ]
  const hintOption = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ]

  const convertResToOption = (value, label) => {
    return {
      value: value,
      label: label,
    }
  }
  const handleSelectLevels = (e) => {
    setLevels(() => {
      const values = []
      for (let i = 0; i < e.length; ++i) values.push(e[i].value)
      return values
    })
  }
  const handleSelectQuestionTypes = (e) => {
    setQuestionTypes(() => {
      const values = []
      for (let i = 0; i < e.length; ++i) values.push(e[i].value)
      return values
    })
  }
  const handleSelectSkills = (e) => {
    setSkillIds(() => {
      const values = []
      for (let i = 0; i < e.length; ++i) values.push(e[i].value)
      return values
    })
  }

  const handleGenerateQuestionForAssignment = () => {
    const currentQuestions = listCurrentQuestion.map((question) => question.id)
    const conditions = {
      assignmentId: assignmentId,
      numberQuestion: numberQuestion,
      levels: levels || [],
      isHint: isHint,
      questionTypes: questionTypes || [],
      skillIds: skillIds || [],
      topicId: topicId,
      gradeId: gradeId,
      currentQuestions: currentQuestions || [],
    }
    axiosJWT
      .post(API_URL + `assignment-question/generate`, conditions)
      .then((res) => {
        onUpdateGenerateQuestion(res.data)
        onCloseModalGenerate()
      })
  }

  useEffect(() => {
    axiosJWT.get(API_URL + `grade/teacher`).then((res) => {
      const grades = res.data
      const option = []
      for (let i = 0; i < grades.length; i++)
        option.push(convertResToOption(grades[i].id, grades[i].gradeName))
      setListGrade(option)
    })
  }, [])

  useEffect(() => {
    axiosJWT.get(API_URL + `topic/teacher/grade/${gradeId}`).then((res) => {
      const topics = res.data
      const option = []
      for (let i = 0; i < topics.length; i++)
        option.push(convertResToOption(topics[i].id, topics[i].topicName))
      setListTopic(option)
    })
  }, [gradeId])

  useEffect(() => {
    axiosJWT.get(API_URL + `skill/topic/${topicId}`).then((res) => {
      const skills = res.data
      const option = []
      for (let i = 0; i < skills.length; i++)
        option.push(convertResToOption(skills[i].id, skills[i].skillName))
      setListSkill(option)
    })
  }, [topicId])

  useEffect(() => {
    if (listGrade.length > 0) {
      const grade = listGrade.find((grade) => grade?.value === selectedGrade)
      selectGrade.current.setValue(
        convertResToOption(grade?.value, grade?.label),
      )
    }
  }, [selectedGrade, listGrade])

  useEffect(() => {
    if (listTopic.length > 0) {
      const topic = listTopic.find((topic) => topic?.value === selectedTopic)
      selectTopic.current.setValue(
        convertResToOption(topic?.value, topic?.label),
      )
    }
  }, [selectedTopic, listTopic])

  useEffect(() => {
    if (listSkill?.length === 0) {
      prevSkill.current = null
    }
    if (
      selectedSkills &&
      listSkill.length > 0 &&
      selectedSkills.length > 0 &&
      prevSkill.current !== selectedSkills[0]
    ) {
      prevSkill.current = selectedSkills[0]
      const skill = listSkill.find(
        (skill) => skill?.value === selectedSkills[0],
      )

      if (skill)
        selectSkill.current.setValue(
          convertResToOption(skill?.value, skill?.label),
        )
    }
  }, [selectedSkills, listSkill])

  return (
    <div className="px-8 h-full relative">
      <i
        className="fas fa-times text-2xl right-[8px] absolute cursor-pointer"
        onClick={onCloseModalGenerate}
      ></i>
      <div className="flex justify-center">
        <div className=" flex flex-col justify-between w-[720px] gap-4">
          <div className="flex">
            <h2 className="text-3xl font-[500]">
              Generate questions for assignment
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <span>Level </span>
            <Select
              placeholder="Select levels..."
              closeMenuOnSelect={false}
              isMulti
              options={levelOptions}
              onChange={handleSelectLevels}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Question type</span>
            <Select
              placeholder="Select question types..."
              closeMenuOnSelect={false}
              isMulti
              options={selectOptions}
              onChange={handleSelectQuestionTypes}
              className="w-full"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>Number of question</span>
            <input
              className="outline-none border-b-2 py-1 px-2 justify-center items-center text-right w-[60px] duration-300 transition-all"
              value={numberQuestion}
              onChange={(e) => {
                setNumberQuestion(() => {
                  if (Number(e.target.value)) return Number(e.target.value)
                  return 0
                })
              }}
            />
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center gap-2 w-[50%]">
              <span className="mr-1">Grade</span>
              <Select
                ref={selectGrade}
                options={listGrade}
                placeholder="Select grade..."
                styles={{
                  menuList: (base) => ({
                    ...base,
                    maxHeight: '180px', // your desired height
                  }),
                }}
                onChange={(e) => setGradeId(e.value)}
                className="w-[180px]"
              />
            </div>
            <div className="flex flex-row items-center gap-2 w-[50%]">
              <span>Topic</span>
              <Select
                ref={selectTopic}
                options={listTopic}
                styles={{
                  menuList: (base) => ({
                    ...base,
                    maxHeight: '180px', // your desired height
                  }),
                }}
                placeholder="Select topic..."
                onChange={(e) => setTopicId(e.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <span className="flex items-center">Skills</span>
            <div>
              <Select
                ref={selectSkill}
                placeholder="Select question types..."
                closeMenuOnSelect={false}
                isMulti
                options={listSkill}
                onChange={handleSelectSkills}
                className="min-w-[452px] max-w-[452px]"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center mb-5">
            <span>Would you like a hint?</span>
            <Select
              options={hintOption}
              defaultValue={hintOption[1]}
              onChange={(e) => setIsHint(e.value)}
              className="w-[180px]"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <Button
              className="btn btn-primary w-[50%]"
              onClick={handleGenerateQuestionForAssignment}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateQuestionForAssignenment
