import React from 'react'
import { useState, useEffect } from 'react'
import Button from '../Button'
import ManageQuestionTypeModal from '../Modals/Admin/ManageQuestionTypeModal'
import ConfirmModal from '../Modals/ConfirmModal'
import ReactPaginate from 'react-paginate'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import QuestionTypeList from './QuestionTypeList'

const axiosJWT = createAxiosJWT()
const ManageQuestionType = () => {
  const [createModal, setCreateModal] = useState(false)
  const [questionTypes, setQuestionTypes] = useState([])

  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + 4
  const currentItems = questionTypes.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(questionTypes.length / 4)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % questionTypes.length
    setItemOffset(newOffset)
  }

  const getAllQuestionTypes = async () => {
    try {
      const res = await axiosJWT.get(API_URL + `question-type`)
      setQuestionTypes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllQuestionTypes()
  }, [])

  return (
    <>
      <ManageQuestionTypeModal
        isOpen={createModal}
        setIsOpen={setCreateModal}
        getAllQuestionTypes={getAllQuestionTypes}
      />
      <div className="flex flex-col gap-4 w-fit h-fit bg-white shadow px-3 py-3 rounded-lg">
        <div className="flex flex-row items-center justify-between">
          <span className="font-[500] text-gray-600">Question type</span>
          <Button onClick={() => setCreateModal(true)} className="text-xs">
            Add new type
          </Button>
        </div>
        <div className="overflow-x-auto h-[256px] relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Type
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((val, index) => {
                return (
                  <QuestionTypeList
                    val={val}
                    getAllQuestionTypes={getAllQuestionTypes}
                    key={index}
                  />
                )
              })}
            </tbody>
          </table>
        </div>

        {pageCount > 1 && (
          <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            nextLabel={
              <button className="flex flex-row items-center gap-3">
                Next <i className="fas fa-angle-right text-xs"></i>
              </button>
            }
            previousLabel={
              <button className="flex flex-row items-center gap-3">
                <i className="fas fa-angle-left text-xs"></i> Previous
              </button>
            }
            className="flex flex-row gap-5 items-center justify-center select-none"
            activeClassName="bg-primary text-white flex justify-center items-center w-[40px] h-[40px] rounded-full shadow-lg"
          />
        )}
      </div>
    </>
  )
}

export default ManageQuestionType
