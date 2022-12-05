import React, { useEffect } from 'react'
import Select from 'react-select'

const QuestionOption = ({
  listSkill,
  selectedSkills,
  setSelectedSkills,

  listGrade,
  setSelectedGrade,
  selectedGrade,

  setSelectedLevel,
  selectedLevel,

  listTopic,
  selectedTopic,
  setSelectedTopic,

  levelOption,

  handleScore,
  score,
}) => {
  useEffect(() => {
    if (listGrade.length > 0) {
      setSelectedGrade(listGrade[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listGrade])

  useEffect(() => {
    if (listTopic.length > 0) {
      setSelectedTopic(listTopic[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTopic])

  useEffect(() => {
    if (listSkill.length > 0) {
      setSelectedSkills([listSkill[0]])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSkill])

  // useEffect(() => {
  //   if (selectedTopic)
  //     axiosJWT.get(API_URL + `skill/topic/${selectedTopic}`).then((res) => {
  //       const skills = res.data
  //       const option = []
  //       for (let i = 0; i < skills.length; i++)
  //         option.push(convertResToOption(skills[i].id, skills[i].skillName))
  //       setListSkill(option)
  //     })
  // }, [selectedTopic])

  //   useEffect(() => {
  //     if (selectedLevel)
  //       selectLevel.current.setValue(
  //         convertResToOption(selectedLevel, selectedLevel),
  //       )
  //     else selectLevel.current.setValue('')
  //   }, [selectedLevel])

  // useEffect(() => {
  //   if (listGrade.length > 0) {
  //     const grade = listGrade.find((grade) => grade.value === selectedGrade)
  //     if (grade)
  //       selectGrade.current.setValue(
  //         convertResToOption(selectedGrade, grade.label),
  //       )
  //   }
  // }, [selectedGrade, listGrade])

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
    <>
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="flex flex-start justify-between gap-2 w-full">
          <Select
            value={selectedGrade}
            onChange={setSelectedGrade}
            options={listGrade}
            placeholder="Grade"
            className="w-[50%]"
          />

          <Select
            value={selectedLevel}
            options={levelOption}
            placeholder="Level"
            onChange={setSelectedLevel}
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
          {listTopic?.length > 0 && (
            <Select
              value={selectedTopic}
              onChange={setSelectedTopic}
              options={listTopic}
              placeholder="Topic"
              className="min-w-[288px] max-w-[288px]"
            />
          )}
          {listSkill?.length > 0 && (
            <Select
              value={selectedSkills}
              onChange={setSelectedSkills}
              options={listSkill}
              placeholder="Skill"
              className="grow"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default QuestionOption
