import React, { useEffect, useReducer, useState } from 'react'
import 'mathlive'
import Select from 'react-select'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
// import { utils } from 'react-modern-calendar-datepicker';
// import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import Modal from 'react-modal'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import AssignmentInfo from '../../components/Teacher/AssignmentInfo'
import QuestionItem from '../../components/Teacher/QuestionItem'
import MultiChoice from '../../components/Teacher/AnswerType/MultiChoice'
import TrueFalse from '../../components/Teacher/AnswerType/TrueFalse'
import InputAnswer from '../../components/Teacher/AnswerType/InputAnswer'
import MultiSelect from '../../components/Teacher/AnswerType/MultiSelect'
import QuestionBank from '../../components/Teacher/QuestionBank'
import GenerateQuestionForAssignenment from '../../components/Teacher/GenerateQuestionForAssignenment'
import QuestionOption from '../../components/Teacher/QuestionOption'
import createAxiosJWT from '../../createAxiosJWT'
import ConfirmModal from '../../components/Modals/ConfirmModal'
import { insertTextAtCurrentCursor } from '../../utils/utils'
import { useRef } from 'react'

const axiosJWT = createAxiosJWT()
const TeacherAssignment = () => {
  const teacherId = 1
  const Selectoptions = [
    { value: 1, label: 'Multi Choice' },
    { value: 2, label: 'True False' },
    { value: 3, label: 'Input' },
    { value: 4, label: 'Multi Select' },
  ]
  const { skillId, classId, assignmentId } = useParams()

  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [questionList, setQuestionList] = useState([])
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(Selectoptions[0])

  //save
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false)

  const [enableHint, setEnableHint] = useState(false)
  const [hint, setHint] = useState('')
  const [answers, setAnswers] = useState({
    multiChoice: [
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
    ],
    multiSelect: [],
    input: [],
    trueFalse: [],
  })
  const levelOption = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]
  const [currentQid, setCurrentQid] = useState('')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [selectedGrade, setSelectedGrade] = useState({})
  const [selectedTopic, setSelectedTopic] = useState({})
  const [selectedSkills, setSelectedSkills] = useState(() =>
    skillId ? [skillId] : [],
  )
  const [selectedLevel, setSelectedLevel] = useState(levelOption[0])

  const [selectedAssignmentName, setSelectedAssignmentName] = useState('')
  const [selectedTotalScore, setSelectedTotalScore] = useState(0)
  const [selectedPassScore, setSelectedPassScore] = useState(0)
  const [selectedDueTime, setSelectedDueTime] = useState(0)
  const [selectedDoTime, setSelectedDoTime] = useState(0)
  const [selectedRedo, setSelectedRedo] = useState(0)

  const [modalBankIsOpen, setBankIsOpen] = useState(false)
  const [modalGenerateIsOpen, setGenerateIsOpen] = useState(false)

  const handleOpenModalBank = () => {
    setBankIsOpen(true)
  }

  const handleCloseModalBank = () => {
    setBankIsOpen(false)
  }

  const handleOpenModalGenerate = () => {
    setGenerateIsOpen(true)
  }

  const handleCloseModalGenerate = () => {
    setGenerateIsOpen(false)
  }

  const handleUpdateQuestionBank = (questionBank) => {
    setQuestionList([...questionBank])
  }
  const handleUpdateGenerateQuestion = (questionGenerate) => {
    setQuestionList([...questionList, ...questionGenerate])
  }
  const handleScore = (e) => {
    const score = Math.max(0, Math.min(100, Number(e.target.value)))
    setScore(score)
  }

  const handleEnableHint = () => {
    setEnableHint(!enableHint)
  }
  const resetValue = () => {
    setCurrentQid('')
    setScore(0)
    setQuestion('')
    setHint('')
    setEnableHint(false)
    setSelectedOption(Selectoptions[0])
    setAnswers({
      multiChoice: [
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
      ],
      multiSelect: [],
      input: [],
      trueFalse: [],
    })
    setSelectedLevel('Easy')
    forceUpdate()
  }

  const handleReviewQuestion = (data) => {
    setCurrentQid(data?.id)
    setQuestion(data?.content)
    if (data?.hint !== '') {
      setEnableHint(true)
      setHint(data?.hint)
    } else {
      setEnableHint(false)
      setHint('')
    }
    setAnswers(data?.option)
    setScore(data?.score)
    setSelectedLevel(data?.level)
    setSelectedOption(Selectoptions[data?.questionTypeId - 1])
    setSelectedGrade(data?.gradeId)
    setSelectedTopic(data?.topicId)
    setSelectedSkills(data?.skillIds)
  }

  console.log(selectedSkills)

  const addQuestionItem = () => {
    if (questionList.find((item) => item.id === currentQid)) {
      let index = questionList.findIndex((item) => item.id === currentQid)
      const questionUpdate = {
        content: question,
        option: answers,
        hint: hint,
        score: score,
        level: selectedLevel?.label,
        skillIds: selectedSkills?.length && [selectedSkills[0]?.value],
        questionTypeId: selectedOption?.value,
        teacherId,
      }
      axiosJWT
        .put(API_URL + `question/${currentQid}`, questionUpdate)
        .then((res) => {
          questionList[index] = {
            id: res.data?.id,
            content: res.data?.content,
            hint: res.data?.hint,
            score: res.data?.score,
            option: res.data?.option,
            level: res.data?.level,
            questionTypeId: res.data?.questionTypeId,
            teacherId: res.data?.teacherId,
            gradeId: res.data?.gradeId,
            topicId: res.data?.topicId,
            skillIds: res.data?.skillIds,
          }
          setQuestionList([...questionList])
          resetValue()
        })
        .catch((err) => console.log(err))
      return
    }
    let questionCreate = {
      content: question,
      option: answers,
      hint: hint,
      score: score,
      level: selectedLevel?.label,
      skillIds: selectedSkills?.length && [selectedSkills[0]?.value],
      questionTypeId: selectedOption?.value,
      teacherId,
    }
    axiosJWT
      .post(API_URL + `question`, questionCreate)
      .then((res) => {
        const questionNewCreate = {
          id: res.data?.id,
          content: res.data?.content,
          hint: res.data?.hint,
          score: res.data?.score,
          option: res.data?.option,
          level: res.data?.level,
          questionTypeId: res.data?.questionTypeId,
          teacherId: res.data?.teacherId,
          gradeId: res.data?.gradeId,
          topicId: res.data?.topicId,
          skillIds: res.data?.skillIds,
        }
        setQuestionList([...questionList, questionNewCreate])
        resetValue()
      })
      .catch((err) => console.log(err))
  }
  const removeQuestionItem = (id) => {
    const newList = questionList.filter((item) => item.id !== id)
    setQuestionList(newList)
    resetValue()
  }

  const handleSaveAssignment = async ({ isTrial }) => {
    const assignment = {
      assignmentName: selectedAssignmentName,
      doTime: selectedDoTime,
      dueTime: selectedDueTime,
      passScore: selectedPassScore,
      totalScore: selectedTotalScore,
      redo: selectedRedo,
    }
    await axiosJWT.put(API_URL + `assignment/${assignmentId}`, assignment)

    const questionIds = questionList.map((question) => question.id)
    await axiosJWT.put(
      API_URL + `assignment-question/assignment/${assignmentId}`,
      {
        questionIds,
      },
    )

    if (classId) {
      await axiosJWT.put(
        API_URL +
          `class-assignment/class/${classId}/assignment/${assignmentId}`,
        {
          dueDay: selectedDueTime,
        },
      )
      await axiosJWT.put(
        API_URL +
          `student-assignment/assignment/${assignmentId}/class/${classId}/date-due`,
        {
          dueDay: selectedDueTime,
        },
      )
    }
    if (isTrial) {
      await axiosJWT.put(
        API_URL + `teacher-assignment/teacher/assignment/${assignmentId}/trial`,
      )
      return navigate(`/assignment/${assignmentId}/question`)
    }
    return navigate(-1)
  }

  const convertResToOption = (value, label) => {
    return {
      value: value,
      label: label,
    }
  }

  const [listGrade, setListGrade] = useState([])
  const [listTopic, setListTopic] = useState([])
  const [listSkill, setListSkill] = useState([])

  useEffect(() => {
    axiosJWT.get(API_URL + `grade/teacher`).then((res) => {
      const grades = res.data
      const option = []
      for (let i = 0; i < grades.length; i++)
        option.push(convertResToOption(grades[i].id, grades[i].gradeName))
      setListGrade(option)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedGrade)
      axiosJWT
        .get(API_URL + `topic/teacher/grade/${selectedGrade?.value}`)
        .then((res) => {
          const topics = res.data
          const option = []
          for (let i = 0; i < topics.length; i++)
            option.push(convertResToOption(topics[i].id, topics[i].topicName))
          setListTopic(option)
        })
  }, [selectedGrade])

  useEffect(() => {
    if (selectedTopic)
      axiosJWT
        .get(API_URL + `skill/topic/${selectedTopic?.value}`)
        .then((res) => {
          const skills = res.data
          const option = []
          for (let i = 0; i < skills.length; i++)
            option.push(convertResToOption(skills[i].id, skills[i].skillName))
          setListSkill(option)
        })
  }, [selectedTopic])

  useEffect(() => {
    skillId &&
      axiosJWT.get(API_URL + `skill/${skillId}`).then((res) => {
        setSelectedGrade(res.data.gradeId)
        setSelectedTopic(res.data.topicId)
        setSelectedSkills([res.data.id])
      })
  }, [skillId])

  useEffect(() => {
    axiosJWT
      .get(API_URL + `assignment-question/assignment/${assignmentId}`)
      .then((res) => {
        const assignmentQuestion = res.data
        setQuestionList(
          assignmentQuestion.map((question) => ({
            id: question?.questionId,
            content: question?.content,
            hint: question?.hint,
            score: question?.score,
            option: question?.option,
            level: question?.level,
            questionTypeId: question?.questionTypeId,
            teacherId: question?.teacherId,
            gradeId: question?.gradeId,
            topicId: question?.topicId,
            skillIds: question?.skillIds,
          })),
        )
      })
  }, [assignmentId])

  // useEffect(() => {
  //   if (selectedLevel) {
  //     if (selectedLevel.toLowerCase() === 'easy') setScore(5)
  //     if (selectedLevel.toLowerCase() === 'medium') setScore(10)
  //     if (selectedLevel.toLowerCase() === 'hard') setScore(20)
  //   }
  // }, [selectedLevel, score])
  const mathLiveRef = useRef(null)

  useEffect(() => {
    const mf = document.querySelector('#formula')
    mf.setValue(
      String.raw`\begin{multline}
    ` +
        question +
        String.raw`
    \end{multline}`,
    )
  }, [question])

  const handleMathLiveChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleAddMath = (math) => {
    let mathString = ``
    if (math === 'fraction') {
      mathString = String.raw`\frac{x1}{x2}`
    }
    if (math === 'squareRoot') {
      mathString = String.raw`\sqrt{x}`
    }
    if (math === 'sin') {
      mathString = String.raw`\sin{x}`
    }
    if (math === 'cos') {
      mathString = String.raw`\cos{x}`
    }
    if (math === 'tan') {
      mathString = String.raw`\tan{x}`
    }
    if (math === 'text') {
      mathString = String.raw`\text{Example}`
    }
    if (math === 'pow') {
      mathString = `x^1`
    }
    if (math === 'degree') {
      mathString = String.raw`\degree`
    }
    setQuestion(
      insertTextAtCurrentCursor(
        mathLiveRef.current.selectionStart,
        question,
        mathString,
      ),
    )
  }

  // String.raw`\\`
  const handleNextLine = () => {
    setQuestion(
      insertTextAtCurrentCursor(
        mathLiveRef.current.selectionStart,
        question,
        String.raw`\\`,
      ),
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNextLine()
    }
  }

  return (
    <div className="flex flex-col items-center gap-7 justify-center h-full">
      <div className="flex flex-row gap-7 justify-center w-full h-fit">
        <div className="w-[800px] bg-white rounded-lg shadow-lg flex flex-col justify-between my-4 px-10 py-5">
          <div className="flex flex-col gap-4">
            <div className="h-[88px]">
              <QuestionOption
                levelOption={levelOption}
                listGrade={listGrade}
                setListGrade={setListGrade}
                listTopic={listTopic}
                setListTopic={setListTopic}
                listSkill={listSkill}
                setListSkill={setListSkill}
                setSelectedSkills={setSelectedSkills}
                selectedSkills={selectedSkills}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                setSelectedGrade={setSelectedGrade}
                selectedGrade={selectedGrade}
                setSelectedTopic={setSelectedTopic}
                selectedTopic={selectedTopic}
                handleScore={handleScore}
                score={score}
              />
            </div>

            <math-field
              id="formula"
              style={{
                whiteSpace: 'initial',
                fontSize: '20px',
                outline: 'none',
                padding: '0.5rem 1.5rem',
                userSelect: 'none',
                width: '100%',
                maxHeight: '150px',
                overflowWrap: 'break-word',
                fontFamily: 'Poppins',
              }}
              readonly
            ></math-field>
            {enableHint && (
              <div className="px-6 py-3 text-white flex flex-row gap-4 h-fit items-baseline bg-primary rounded-md w-full">
                <i className="far fa-lightbulb"></i>
                <span className="whitespace-normal break-words w-[90%]">
                  {hint ? hint : 'Hint'}
                </span>
              </div>
            )}
            <span className="text-primary text-sm px-2">
              * \\ is for next line
            </span>
            <div className="flex flex-row gap-5">
              <Button onClick={() => handleAddMath('fraction')}>
                <i className="fa-solid fa-percent"></i>
              </Button>
              <Button onClick={() => handleAddMath('squareRoot')}>
                <i className="fa-solid fa-square-root-variable"></i>
              </Button>
              <Button onClick={() => handleAddMath('pow')}>
                <i className="fa-solid fa-superscript"></i>
              </Button>
              <Button onClick={() => handleAddMath('degree')}>°</Button>
              <Button onClick={() => handleAddMath('sin')}>Sin</Button>
              <Button onClick={() => handleAddMath('cos')}>Cos</Button>
              <Button onClick={() => handleAddMath('tan')}>Tan</Button>
              <Button onClick={() => handleAddMath('text')} className="text-sm">
                Write normal text
              </Button>
            </div>

            <textarea
              id="latex"
              ref={mathLiveRef}
              className="outline-none focus:shadow-md duration-300 shadow-sm bg-gray-100 rounded-lg resize-none px-4 py-[0.5rem] h-36"
              onChange={(e) => handleMathLiveChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={question || ''}
              placeholder="Type your question"
            />
            <div className="flex flex-row gap-5 items-baseline duration-500">
              <div className="flex flex-row items-baseline gap-5 h-[72px]">
                <input
                  type="checkbox"
                  checked={enableHint}
                  onClick={() => setHint('')}
                  onChange={handleEnableHint}
                  className="hidden"
                  id="hint"
                />
                <label
                  htmlFor="hint"
                  className="cursor-pointer select-none py-1"
                >
                  {enableHint ? (
                    <span className="bg-primary rounded-md px-2 border-2 border-primary py-1 text-white duration-300">
                      Hint
                    </span>
                  ) : (
                    <span className="bg-white rounded-md px-2 py-1 border-2 border-gray-500 duration-300">
                      Hint
                    </span>
                  )}
                </label>
              </div>
              {enableHint && (
                <motion.textarea
                  layout
                  maxLength="250"
                  placeholder="Enter hint"
                  value={hint || ''}
                  className="outline-none border-b-2 duration-500 px-2 py-1 w-full resize-none overflow-y"
                  onChange={(e) => {
                    setHint(e.target.value)
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="font-medium text-xl">Answers</span>
            <Select
              value={selectedOption || ''}
              defaultValue={Selectoptions[0]}
              onChange={setSelectedOption}
              options={Selectoptions}
              className="w-44 transition-all"
            />
          </div>
          <div className="flex flex-col justify-center content-center min-h-[184px] my-2">
            {selectedOption?.value === 1 ? (
              <MultiChoice
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 2 ? (
              <TrueFalse
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 3 ? (
              <InputAnswer
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 4 ? (
              <MultiSelect
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : (
              ''
            )}
          </div>

          <div className="flex flex-row-reverse">
            <Button
              className="border-none shadow-lg"
              onClick={() => {
                addQuestionItem()
              }}
            >
              {currentQid ? 'Save' : 'Create Question'}
            </Button>
          </div>
        </div>
        <div className="flex flex-col my-4 gap-3">
          <div className="bg-white w-[400px] p-7 rounded-lg shadow-lg flex flex-col justify-between">
            <AssignmentInfo
              setSelectedAssignmentName={setSelectedAssignmentName}
              setSelectedPassScore={setSelectedPassScore}
              setSelectedTotalScore={setSelectedTotalScore}
              setSelectedDueTime={setSelectedDueTime}
              setSelectedDoTime={setSelectedDoTime}
              setSelectedRedo={setSelectedRedo}
            />
          </div>
          <div className="grow bg-white w-[400px] pb-7 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between px-10 pt-8">
                <span className="font-medium text-xl">Question list</span>
                <div className="flex items-center">
                  <span
                    className="text-primary cursor-pointer"
                    onClick={handleOpenModalBank}
                  >
                    Bank question
                  </span>
                  <Modal
                    isOpen={modalBankIsOpen}
                    style={{
                      top: '0',
                      left: '0',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                  >
                    <QuestionBank
                      questionsBank={questionList}
                      onUpdateQuestionBank={handleUpdateQuestionBank}
                      onCloseModalBank={handleCloseModalBank}
                    />
                  </Modal>
                </div>
              </div>
              <div className="h-[300px] rounded-sm mx-5 my-5 px-2 py-2 flex flex-col gap-4 overflow-y-auto duration-1000">
                {questionList.map((val, i) => (
                  <QuestionItem
                    question={val}
                    key={val + i}
                    index={i}
                    removeQuestionItem={() => {
                      removeQuestionItem(val.id)
                    }}
                    handleReviewQuestion={handleReviewQuestion}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-5">
              <div className="flex w-full items-center justify-center">
                <Button
                  className="w-[80%] border-none shadow-lg"
                  onClick={handleOpenModalGenerate}
                >
                  Generate question
                </Button>
              </div>

              <Modal
                isOpen={modalGenerateIsOpen}
                style={{
                  top: '0',
                  left: '0',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                }}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <GenerateQuestionForAssignenment
                  selectedGrade={selectedGrade}
                  selectedTopic={selectedTopic}
                  selectedSkills={selectedSkills}
                  listCurrentQuestion={questionList}
                  onCloseModalGenerate={handleCloseModalGenerate}
                  onUpdateGenerateQuestion={handleUpdateGenerateQuestion}
                />
              </Modal>
              <div className="flex w-full items-center justify-center">
                <ConfirmModal
                  isOpen={openSaveConfirm}
                  message="If you want to trial these questions? Click yes.
                                  If you want to go back the last page click no."
                  yesConfirm={() => handleSaveAssignment({ isTrial: true })}
                  noConfirm={() => handleSaveAssignment({ isTrial: false })}
                />
                <Button
                  className="w-[80%] border-none shadow-lg"
                  onClick={() => setOpenSaveConfirm(!openSaveConfirm)}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherAssignment
