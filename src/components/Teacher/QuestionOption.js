import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()
const QuestionOption = ({
  selectedSkills,
  setSelectedSkills,
  setSelectedLevel,

  selectedLevel,
  setSelectedGrade,
  selectedGrade,

  setSelectedTopic,
  selectedTopic,
  handleScore,
  score,
}) => {
  const levelOption = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]

  const [listGrade, setListGrade] = useState([])
  const [listTopic, setListTopic] = useState([])
  const [listSkill, setListSkill] = useState([])

  const selectLevel = useRef()
  const selectGrade = useRef()
  const selectTopic = useRef()
  const selectSkill = useRef()

  const prevSkill = useRef(selectedSkills[0])

  const convertResToOption = (value, label) => {
    return {
      value: value,
      label: label,
    }
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
    axiosJWT
      .get(API_URL + `topic/teacher/grade/${selectedGrade}`)
      .then((res) => {
        const topics = res.data
        const option = []
        for (let i = 0; i < topics.length; i++)
          option.push(convertResToOption(topics[i].id, topics[i].topicName))
        setListTopic(option)
        setSelectedTopic(option[0])
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGrade])

  useEffect(() => {
    axiosJWT.get(API_URL + `skill/topic/${selectedTopic}`).then((res) => {
      const skills = res.data
      const option = []
      for (let i = 0; i < skills.length; i++)
        option.push(convertResToOption(skills[i].id, skills[i].skillName))
      setListSkill(option)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic])

  //   useEffect(() => {
  //     if (selectedGrade)
  //       axiosJWT
  //         .get(API_URL + `topic/teacher/grade/${selectedGrade}`)
  //         .then((res) => {
  //           const topics = res.data
  //           const option = []
  //           for (let i = 0; i < topics.length; i++)
  //             option.push(convertResToOption(topics[i].id, topics[i].topicName))
  //           setListTopic(option)
  //         })
  //   }, [selectedGrade])

  //   useEffect(() => {
  //     if (selectedTopic)
  //       axiosJWT.get(API_URL + `skill/topic/${selectedTopic}`).then((res) => {
  //         const skills = res.data
  //         const option = []
  //         for (let i = 0; i < skills.length; i++)
  //           option.push(convertResToOption(skills[i].id, skills[i].skillName))
  //         setListSkill(option)
  //       })
  //   }, [selectedTopic])

  //   useEffect(() => {
  //     if (selectedLevel)
  //       selectLevel.current.setValue(
  //         convertResToOption(selectedLevel, selectedLevel),
  //       )
  //     else selectLevel.current.setValue('')
  //   }, [selectedLevel])

  //   useEffect(() => {
  //     if (listGrade.length > 0) {
  //       const grade = listGrade.find((grade) => grade.value === selectedGrade)
  //       if (grade)
  //         selectGrade.current.setValue(
  //           convertResToOption(selectedGrade, grade.label),
  //         )
  //     }
  //   }, [selectedGrade, listGrade])

  //   useEffect(() => {
  //     if (listTopic.length > 0) {
  //       const topic = listTopic.find((topic) => topic.value === selectedTopic)
  //       if (topic)
  //         selectTopic.current.setValue(
  //           convertResToOption(selectedTopic, topic.label),
  //         )
  //     }
  //   }, [selectedTopic, listTopic])

  //   useEffect(() => {
  //     if (listSkill.length === 0) {
  //       prevSkill.current = null
  //     }
  //     if (
  //       selectedSkills &&
  //       listSkill.length > 0 &&
  //       selectedSkills.length > 0 &&
  //       prevSkill.current !== selectedSkills[0]
  //     ) {
  //       prevSkill.current = selectedSkills[0]
  //       const skill = listSkill.find((skill) => skill.value === selectedSkills[0])

  //       if (skill)
  //         selectSkill.current.setValue(
  //           convertResToOption(skill.value, skill.label),
  //         )
  //     }
  //   }, [selectedSkills, listSkill])

  return (
    <div>
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="flex flex-start justify-between gap-2 w-full">
          <Select
            defaultValue={listGrade[0]}
            onChange={(e) => setSelectedGrade(e.value)}
            options={listGrade}
            placeholder="Grade"
            className="w-[50%] "
          />

          <Select
            defaultValue={levelOption[0]}
            options={levelOption}
            placeholder="Level"
            onChange={(e) => setSelectedLevel(e.value)}
            setValue={selectedLevel}
            className="w-[50%] max-w-[288px]"
          />

          <div className="flex gap-2 items-center">
            <span>Score</span>
            <input
              className="outline-none border-b-2 px-[10px] py-[3px] justify-center items-center text-right w-[50px] duration-300 transition-all"
              value={score || 10}
              onChange={handleScore}
            />
            <span>pt</span>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Select
            onChange={(e) => setSelectedTopic(e.value)}
            defaultValue={listTopic[0]}
            options={listTopic}
            placeholder="Topic"
            className="min-w-[288px] max-w-[288px]"
          />
          <Select
            defaultValue={listSkill[0]}
            onChange={(e) => setSelectedSkills([e.value])}
            options={listSkill}
            placeholder="Skill"
            className="grow"
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionOption
