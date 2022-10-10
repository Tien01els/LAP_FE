import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'

import Table from '../../components/Table'
import { API_URL } from '../../constant'
import Button from '../../components/Button'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(165, 165, 165, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '8px',
  },
}

const Topics = () => {
  const navigate = useNavigate()
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: formStateAdd,
  } = useForm()
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: formStateCreate,
  } = useForm()

  const [topics, setTopics] = useState([])
  const [values, setValues] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalTopicIsOpen, setTopicIsOpen] = useState(false)
  const [classes, setClasses] = useState([])
  const [grades, setGrades] = useState([])
  const [topicGrades, setTopicGrades] = useState([])
  const [prerequisiteTopicGrades, setPrerequisiteTopicGrades] = useState([])

  function handleCreateTopic(data) {
    const topic = {
      ...data,
      teacherId: 1,
    }
    axios.post(API_URL + `topic`, topic).then((res) => {
      getTopicOfGrade()
    })
  }

  function handleCreateClassTopic(classTopic) {
    axios.post(API_URL + `class-topic`, classTopic).then((res) => {
      getTopicOfClass()
    })
  }

  function handleDeleteClassTopic(id) {
    axios.delete(API_URL + `class-topic/${id}`).then((res) => {
      getTopicOfClass()
    })
  }

  function getAllGrades() {
    axios.get(API_URL + `grade`).then((res) => {
      setGrades(res.data)
    })
  }

  function getTopicOfClass() {
    axios.get(API_URL + `class-topic/1/1`).then((res) => {
      let result = res.data
      let arrayResult = []
      for (let i = 0; i < result.length; ++i) {
        arrayResult = [
          ...arrayResult,
          {
            id: result[i].id,
            topicName: result[i].topicName,
            numberSkills: result[i].numberSkills,
            prerequisiteTopicName: result[i].prerequisiteTopicName,
          },
        ]
      }
      setValues(arrayResult)
      setCurrentPage(arrayResult.length > 0 ? 1 : 0)
    })
  }

  function getTopicOfGrade() {
    axios.get(API_URL + `topic/1/1`).then((res) => {
      setTopicGrades(res.data)
    })
  }

  function getPrerequisiteTopicOfGrade() {
    axios.get(API_URL + `topic/1/1`).then((res) => {
      setPrerequisiteTopicGrades(res.data)
    })
  }
  function getClassOfGrade() {
    axios.get(API_URL + `class/1/1`).then((res) => {
      setClasses(res.data)
    })
  }

  function handleOpenModalAddTopic() {
    setIsOpen(true)
    getTopicOfGrade()
    getClassOfGrade()
  }

  function handleCloseModalAddTopic() {
    setIsOpen(false)
  }

  function handleOpenModalCreateTopic() {
    setTopicIsOpen(true)
    getAllGrades()
    getPrerequisiteTopicOfGrade()
  }

  function handleCloseModalCreateTopic() {
    setTopicIsOpen(false)
  }

  useEffect(() => {
    getTopicOfClass()
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + 5
    setTopics(values.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(values.length / 5))
  }, [itemOffset, values])

  useEffect(() => {
    if (formStateAdd.isSubmitSuccessful) {
      resetAdd({ topicId: -1, classId: -1 })
      handleCloseModalAddTopic()
    }
  }, [formStateAdd, resetAdd])

  useEffect(() => {
    if (formStateCreate.isSubmitSuccessful) {
      resetCreate({
        topicName: '',
        description: '',
        gradeId: -1,
        prerequisiteTopicId: -1,
      })
      handleCloseModalCreateTopic()
    }
  }, [formStateCreate, resetCreate])

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
    const newOffset = (event.selected * 5) % values.length
    setItemOffset(newOffset)
  }

  const thead = ['Topic Name', 'NO. SKILLS', 'PREREQUISITES', '']
  return (
    <div className="pt-[40px] px-[68px] h-screen">
      <div className="flex gap-2 items-center">
        <i className="fas fa-caret-left text-xl font-bold"></i>
        <span
          className="underline underline-offset-4 font-semibold cursor-pointer"
          onClick={() => {
            navigate('/teacher/classes')
          }}
        >
          All Classes
        </span>
      </div>
      <div className="w-full h-[68px] bg-primary flex items-center justify-between mt-[20px] rounded-xl shadow-lg px-12">
        <h1 className="text-2xl font-medium uppercase text-white">Topics</h1>
        <button
          className="h-7 w-24 px-2 flex items-center justify-center text-white rounded-xl border-[1px]"
          onClick={handleOpenModalAddTopic}
        >
          {/* material-icons */}
          <span className=" flex items-center justify-center mr-1">Add</span>
          <span>topic</span>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleCloseModalAddTopic()}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="relative">
            <button
              onClick={handleCloseModalAddTopic}
              className="absolute hover:text-red-400 transition-all text-2xl translate-x-[485px] -translate-y-[10px]"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form
            className="flex"
            onSubmit={handleSubmitAdd(handleCreateClassTopic)}
          >
            <div className="flex flex-col gap-7 w-[500px] px-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Add topic</h2>
                <label htmlFor="topic">Topic</label>
                <select
                  name="classes"
                  className="border outline-none border-gray-500 rounded px-2"
                  defaultValue="-1"
                  {...registerAdd('topicId')}
                >
                  <option disabled value="-1">
                    -- Select an topic --
                  </option>
                  {topicGrades.map((topic) => {
                    return (
                      <option key={topic.id} value={topic.id}>
                        {topic.topicName}
                      </option>
                    )
                  })}
                </select>
                <label htmlFor="classes">Class</label>
                <select
                  name="classes"
                  className="border outline-none border-gray-500 rounded px-2"
                  defaultValue="-1"
                  {...registerAdd('classId')}
                >
                  <option disabled value="-1">
                    {' '}
                    -- Select a class --{' '}
                  </option>
                  {classes.map((currentClass) => {
                    // if (currentClass == '1') {
                    //     <option
                    //         value='volvo'
                    //         selected='selected'
                    //     >
                    //         Volvo
                    //     </option>;
                    // }
                    return (
                      <option key={currentClass.id} value={currentClass.id}>
                        {currentClass.className}
                      </option>
                    )
                  })}
                </select>
                <span className="flex flex-row gap-1">
                  Or create
                  <span
                    className="text-primary underline-offset-2 underline cursor-pointer"
                    onClick={handleOpenModalCreateTopic}
                  >
                    new topic
                  </span>
                </span>
              </div>
              <div className="flex justify-center">
                <Button className="bg-primary border-none w-[50%]">ADD</Button>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={modalTopicIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="flex justify-end">
            <button onClick={handleCloseModalCreateTopic}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form
            className="flex flex-col w-[500px]"
            onSubmit={handleSubmitCreate(handleCreateTopic)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <h2 className="text-2xl font-semibold">Create new topic</h2>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="topicName">Name</label>
                <input
                  type="text"
                  name="topicName"
                  placeholder="Enter topic name"
                  className="outline-none border border-gray-500 px-2 py-1 rounded"
                  {...registerCreate('topicName')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="resize-none outline-none border border-gray-500 px-2 py-1 rounded"
                  {...registerCreate('description')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="grade">Grade</label>
                <select
                  name="grade"
                  className="border border-gray-500 rounded px-2"
                  defaultValue="-1"
                  {...registerCreate('gradeId')}
                >
                  <option disabled value="-1">
                    -- Select a grade --
                  </option>
                  {grades.map((grade) => {
                    return (
                      <option key={grade.id} value={grade.id}>
                        {grade.gradeName}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="prerequisiteTopic">Prerequisite topic</label>
                <select
                  name="prerequisiteTopic"
                  className="border border-gray-500 rounded px-2"
                  defaultValue="-1"
                  {...registerCreate('prerequisiteTopicId')}
                >
                  <option disabled value="-1">
                    -- Select a prerequisite topic --
                  </option>
                  {prerequisiteTopicGrades.map((topic) => {
                    return (
                      <option key={topic.id} value={topic.id}>
                        {topic.topicName}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </form>
          <Button className="border-none bg-primary w-full mt-5">Create</Button>
        </Modal>
      </div>

      <div className="flex flex-col justify-between mb-[40px] h-[77%]">
        <div className="grow">
          <Table
            thead={thead}
            tbody={topics}
            actions={[
              {
                name: 'Delete',
                eventAction: handleDeleteClassTopic,
              },
              {
                name: 'View detail',
                //eventAction: ,
              },
            ]}
          />
        </div>
        <div className="mt-[16px] flex justify-between px-5">
          <span className="font-sm text-gray-500">
            Page {currentPage} / {pageCount}
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <button>
                Next <i className="fas fa-angle-right"></i>
              </button>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={
              <button>
                <i className="fas fa-angle-left"></i> Previous
              </button>
            }
            renderOnZeroPageCount={null}
            className="flex flex-row text-gray-500 gap-7 justify-center font-semibold items-center"
            activeClassName="bg-primary text-white flex justify-center items-center w-8 h-8 rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Topics
