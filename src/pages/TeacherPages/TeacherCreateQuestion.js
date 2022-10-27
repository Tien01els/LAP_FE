import React, { useEffect, useReducer, useState } from 'react'
import 'mathlive'
import Select from 'react-select'
import { motion } from 'framer-motion'
// import { utils } from 'react-modern-calendar-datepicker';
// import moment from 'moment';
import axios from 'axios'
import Modal from 'react-modal'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

import { API_URL } from '../../constant'
// import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import Button from '../../components/Button'
import QuestionOption from '../../components/Teacher/QuestionOption'
import QuestionItem from '../../components/Teacher/QuestionItem'
import MultiChoice from '../../components/Teacher/AnswerType/MultiChoice'
import TrueFalse from '../../components/Teacher/AnswerType/TrueFalse'
import InputAnswer from '../../components/Teacher/AnswerType/InputAnswer'
import MultiSelect from '../../components/Teacher/AnswerType/MultiSelect'
import QuestionBank from '../../components/Teacher/QuestionBank'

const TeacherCreateQuestion = () => {
  const teacherId = 1
  const Selectoptions = [
    { value: 1, label: 'Multi Choice' },
    { value: 2, label: 'True False' },
    { value: 3, label: 'Input' },
    { value: 4, label: 'Multi Select' },
  ]

  const [question, setQuestion] = useState('')
  const [questionList, setQuestionList] = useState([])
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(Selectoptions[0])
  // const [assignmentName, setAssignmentName] = useState('Assignment Name');
  // const [enableEdit, setEnableEdit] = useState(false);
  // const [time, setTime] = useState('');
  const [enableHint, setEnableHint] = useState(false)
  const [hint, setHint] = useState('')
  const [answers, setAnswers] = useState({
    multiChoice: [],
    multiSelect: [],
    input: [],
    trueFalse: [],
  })
  const [currentQid, setCurrentQid] = useState('')
  // const [selectedDay, setSelectedDay] = useState(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedLevel, setSelectedLevel] = useState('')

  const [modalBankIsOpen, setBankIsOpen] = useState(false)
  const [questionsBank, setQuestionsBank] = useState([])
  const [questionsNew, setQuestionsNew] = useState([])

  // const assignmenNameRef = useRef(null);

  const handleOpenModalBank = () => {
    setBankIsOpen(true)
  }

  const handleCloseModalBank = () => {
    setBankIsOpen(false)
  }

  const handleUpdateQuestionBank = (questionBank) => {
    setQuestionsBank(questionBank)
    setQuestionList([...questionsNew, ...questionBank])
  }

  // const formatInputValue = () => {
  //     if (!selectedDay) return '';
  //     return `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`;
  // };

  const handleScore = (e) => {
    const score = Math.max(0, Math.min(100, Number(e.target.value)))
    setScore(score)
  }

  const handleEnableHint = () => {
    setEnableHint(!enableHint)
  }

  // const handleCreateAssignment = () => {
  //     const due = new Date(
  //         `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`
  //     );
  //     console.log(due);
  //     const assignment = {
  //         assignmentName,
  //         dateDue: moment(due).format('YYYY-MM-DD HH:mm:ss'),
  //         time: 90,
  //         totalScore: 100,
  //         redo: 3,
  //         teacherId: 1,
  //     };
  //     console.log(assignment);
  //     axios.post(API_URL + `assignment`, assignment).then((res) => {
  //         console.log(res);
  //     });
  // };

  const handleReviewQuestion = (data) => {
    console.log(data.option)
    setCurrentQid(data?.id)
    setQuestion(data?.content)
    if (data?.hint !== '') {
      setEnableHint(true)
      setHint(data?.hint)
    } else {
      setEnableHint(false)
      setHint(null)
    }
    setAnswers(data?.option)
    setScore(data?.score)
    setSelectedLevel(data?.level)
    setSelectedOption(Selectoptions[data?.questionTypeId - 1])
  }

  const handleSelectedOption = (e) => {
    setSelectedOption(e)
  }

  const addQuestionItem = () => {
    if (questionList.find((item) => item.id === currentQid)) {
      let index = questionList.findIndex((item) => item.id === currentQid)
      let indexNew = questionsNew.findIndex(
        (itemNew) => itemNew.id === currentQid,
      )
      const questionUpdate = {
        content: question,
        option: answers,
        hint: hint,
        score: score,
        level: selectedLevel,
        skillIds: selectedSkills,
        questionTypeId: selectedOption?.value,
        teacherId,
      }
      axios
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
          }
          questionsNew[indexNew] = questionList[index]
          setQuestionsNew([...questionsNew])
          setQuestionList([...questionList])
          setCurrentQid('')
          setScore(0)
          setQuestion('')
          setHint('')
          setEnableHint(false)
          setSelectedOption('')
          setAnswers([])
          forceUpdate()
        })
        .catch((err) => console.log(err))
      return
    }
    let questionCreate = {
      content: question,
      option: answers,
      hint: hint,
      score: score,
      level: selectedLevel,
      skillIds: selectedSkills,
      questionTypeId: selectedOption?.value,
      teacherId,
    }
    axios
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
        }
        setQuestionList([...questionList, questionNewCreate])
        setQuestionsNew([...questionsNew, questionNewCreate])
        setCurrentQid('')
        setScore(0)
        setQuestion('')
        setHint('')
        setEnableHint(false)
        setSelectedOption('')
        setAnswers([])
        forceUpdate()
        setSelectedLevel('')
      })
      .catch((err) => console.log(err))
  }

  const removeQuestionItem = (id) => {
    const newList = questionList.filter((item) => item.id !== id)
    setQuestionList(newList)
    setCurrentQid('')
    setScore(0)
    setQuestion('')
    setHint('')
    setEnableHint(false)
    setSelectedOption(Selectoptions[0])
    setAnswers([])
    forceUpdate()
    setSelectedLevel('')
  }

  useEffect(() => {
    if (selectedLevel) {
      if (selectedLevel.toLowerCase() === 'easy') setScore(5)
      if (selectedLevel.toLowerCase() === 'medium') setScore(10)
      if (selectedLevel.toLowerCase() === 'hard') setScore(20)
    }
  }, [selectedLevel, score])

  // useEffect(() => {
  //     console.log(selectedOption);
  //     setAnswers([]);
  // }, [selectedOption]);

  useEffect(() => {
    const mf = document.querySelector('#formula')
    mf.setValue(question)
  }, [question])

  return (
    <div className="flex flex-col items-center gap-7 justify-center h-full">
      {/* <div className="w-[1190px] h-[100px] px-10 bg-white rounded-lg shadow-lg flex flex-row items-center justify-between">
        <div className="flex flex-row gap-5 items-center">
          {enableEdit ? (
            <input
              className="text-2xl min-w-[250px] transition-all max-w-[500px] font-medium outline-none border-b-2 resize-x py-2 px-1"
              value={assignmentName}
              maxLength={45}
              ref={assignmenNameRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  assignmentName === 'Assignment Name'
                    ? setAssignmentName('')
                    : setAssignmentName(assignmentName)
                  setEnableEdit(!enableEdit)
                  assignmenNameRef.current.focus()
                }
              }}
              onChange={(e) => {
                setAssignmentName(e.target.value)
              }}
              style={{ width: `${assignmentName.length}ch` }}
            />
          ) : (
            <input
              className="text-2xl min-w-[250px] transition-all max-w-[500px] font-medium resize-x outline-none py-2 px-1"
              value={assignmentName}
              ref={assignmenNameRef}
              maxLength={45}
              style={{ width: `${assignmentName.length}ch` }}
              readOnly
            />
          )}
          <i
            className="fas fa-edit cursor-pointer hover:text-primary transition-all"
            onClick={() => {
              assignmentName === 'Assignment Name'
                ? setAssignmentName('')
                : setAssignmentName(assignmentName)
              setEnableEdit(!enableEdit)
              assignmenNameRef.current.focus()
            }}
          ></i>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
            }}
            className="outline-none border transition-all border-gray-500 px-2 py-1 rounded-md "
          />
          <DatePicker
            colorPrimary="#75b9cc"
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a date"
            formatInputText={formatInputValue}
            minimumDate={utils().getToday()}
            inputClassName="daypicker"
          />
          <Button className="border-none" onClick={handleCreateAssignment}>
            Save
          </Button>
        </div>
      </div> */}

      <div className="flex flex-row gap-7 justify-center w-full h-full">
        <div className="w-[800px] bg-white rounded-lg shadow-lg flex flex-col justify-between my-4 px-10 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-xl">Question</span>
              <div className="flex flex-row gap-10 items-center">
                <div className="flex gap-2 items-center">
                  <span>Score</span>
                  <input
                    className="outline-none border-b-2 px-[10px] py-[3px] justify-center items-center text-right w-[50px] duration-300 transition-all"
                    value={score}
                    onChange={handleScore}
                  />
                  <span>pt</span>
                </div>
              </div>
            </div>

            <math-field
              // id={`question-${idQuestion}` || `1`}
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

            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="duration-300 h-[48px]"
            >
              {enableHint && (
                <div className="px-6 py-3 text-white flex flex-row gap-4 items-center bg-primary rounded-md overflow-hidden w-full break-words">
                  <i className="far fa-lightbulb"></i>
                  <span className=" whitespace-pre-line">
                    {hint ? hint : 'Hint'}
                  </span>
                </div>
              )}
            </motion.div>
            <textarea
              id="latex"
              className="outline-none focus:shadow-md duration-300 shadow-sm bg-gray-100 rounded-lg resize-none px-4 py-[0.5rem] h-36"
              onChange={(e) => {
                setQuestion(e.target.value)
              }}
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
              onChange={handleSelectedOption}
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
          <div className="bg-white h-[34vh] w-[400px] p-7 rounded-lg shadow-lg flex flex-col justify-between">
            <QuestionOption
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
          </div>
          <div className="h-[60vh] bg-white w-[400px] pb-7 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between px-10 pt-8">
                <span className="font-medium text-xl">Question list</span>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenModalBank}
                  >
                    Bank question
                  </button>
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
                      questionsBank={questionsBank}
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
            <div className="flex justify-center items-center">
              <Button className="px-28 border-none shadow-lg">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherCreateQuestion
