import React, { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import Table from '../Table'
import axios from 'axios'
import Select from 'react-select'

import { API_URL } from '../../constant'
import MultiChoice from './AnswerType/MultiChoice'

const QuestionBank = ({
  onAddQuestionBank,
  onDeleteQuestionBank,
  onCloseModalBank,
}) => {
  // debugger
  const [enableHitQuestionBank, setEnableHitQuestionBank] = useState(false)
  const [hintQuestionBank, setHitQuestionBank] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [values, setValues] = useState([])

  const topics = [
    { value: 1, label: 'high' },
    { value: 2, label: 'easy' },
    { value: 3, label: 'medium' },
  ]

  function getQuestionBank() {
    axios
      .get(API_URL + `question/question-bank?gradeId=1&topicId=1&skillId=1`)
      .then((res) => {
        console.log(res.data)
      })
  }

  useEffect(() => {
    getQuestionBank()
  }, [])

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
    const newOffset = (event.selected * 5) % values.length
    setItemOffset(newOffset)
  }
  const thead = [
    {
      width: '5%',
      title: 'NO.',
    },
    {
      width: '40%',
      title: 'CONTENT',
    },
    {
      width: '20%',
      title: 'SKILLS',
    },
    {
      width: '15%',
      title: 'TOPIC',
    },
    {
      width: '15%',
      title: 'GRADE',
    },
    {
      title: '',
    },
  ]
  return (
    <div className="px-8 h-full relative">
      <i
        className="fas fa-times text-2xl translate-x-[1367px] -translate-y-[14px] absolute"
        onClick={onCloseModalBank}
      ></i>

      <div className="flex flex-row gap-7 pt-10 h-full w-full">
        <div className="w-[45%] flex flex-col justify-between">
          <math-field
            id="Bank-modal-formula"
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
          >
            Preview question
          </math-field>

          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="duration-300 h-[48px]"
          >
            {enableHitQuestionBank && (
              <div className="px-6 py-3 text-white flex flex-row gap-4 items-center bg-primary rounded-md overflow-hidden w-full break-words">
                <i className="far fa-lightbulb"></i>
                <span className=" whitespace-pre-line">
                  {hintQuestionBank ? hintQuestionBank : 'Hint'}
                </span>
              </div>
            )}
          </motion.div>

          <div className="">
            <MultiChoice Preview />
          </div>
        </div>
        <div className="flex flex-col w-[50%] h-full">
          <div className="flex flex-col h-[152px] justify-center align-center">
            <div className="flex flex-col w-full items-center p-[4px]">
              <div className="flex justify-between w-full p-[4px]">
                <Select
                  className="w-[48%]"
                  options={topics}
                  placeholder="Grade"
                />
                <Select
                  className="w-[48%]"
                  options={topics}
                  placeholder="Topic"
                />
              </div>
              <div className="flex justify-between w-full p-[4px]">
                <Select
                  className="w-[48%]"
                  options={topics}
                  placeholder="Level"
                />
                <Select
                  className="w-[48%]"
                  options={topics}
                  placeholder="Skill"
                />
              </div>
            </div>
            <form className="w-full px-[8px] pb-[4px]">
              <div className="flex justify-center">
                <div className="flex flex-row w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full outline-primary transition-all text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 "
                    placeholder="Search question"
                    required=""
                  />
                  <button
                    type="submit"
                    className="top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="grow">
            <div className="flex flex-col justify-between mb-[40px] h-[100%]">
              <div className="grow">
                <Table
                  checkboxTable={true}
                  thead={thead}
                  // tbody={topics}
                  tbody={[]}
                  actions={[
                    {
                      name: 'Delete',
                      // eventAction: handleDeleteClassTopic,
                    },
                    {
                      name: 'Add',
                      //eventAction: ,
                    },
                  ]}
                />
              </div>
              <div className="flex justify-between p-4">
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
        </div>
      </div>
    </div>
  )
}

export default memo(QuestionBank)
