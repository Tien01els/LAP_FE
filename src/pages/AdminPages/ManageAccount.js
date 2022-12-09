import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import ManageAccountModal from '../../components/Modals/ManageAccountModal'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import TokenExpire from '../../components/Modals/TokenExpire'
import ReactPaginate from 'react-paginate'
import ConfirmModal from '../../components/Modals/ConfirmModal'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const axiosJWT = createAxiosJWT()
const ManageAccount = () => {
  const [openManageAccount, setOpenManageAccount] = useState(false)
  const [banModal, setBanModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  //
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + 9
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / 9)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 9) % items.length
    setItemOffset(newOffset)
  }

  const handleBan = (id) => {
    console.log(id)
  }

  const handleRemove = (id) => {
    console.log(id)
  }

  useEffect(() => {
    const getAllAccounts = async () => {}
    getAllAccounts()
  }, [])
  return (
    <>
      <ConfirmModal
        isOpen={banModal}
        message="Are you sure to ban this account ?"
        noConfirm={() => setBanModal(false)}
        yesConfirm={() => {}}
      />
      <ConfirmModal
        isOpen={removeModal}
        message="Are you sure to remove this account ?"
        noConfirm={() => setRemoveModal(false)}
        yesConfirm={() => {}}
      />
      <div className="px-10 py-7 flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-[500] text-gray-600">
            Manage Account
          </span>
          <Button
            onClick={() => {
              setOpenManageAccount(true)
            }}
          >
            Add an account
          </Button>
          <ManageAccountModal
            isOpen={openManageAccount}
            setIsOpen={setOpenManageAccount}
          />
        </div>
        <div className="overflow-x-auto h-[521px] relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Active
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((val) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="py-4 px-6">
                      1
                    </th>
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="py-4 px-6">Sliver</td>
                    <td className="py-4 px-6">Laptop</td>
                    <td className="py-4 px-6">$2999</td>
                    <td className="py-4 px-6 text-right flex flex-row justify-between select-none">
                      <span
                        onClick={() => {
                          handleBan(val?.id)
                          setBanModal(true)
                        }}
                        className="font-medium text-orange-500 dark:text-blue-500 hover:cursor-pointer"
                      >
                        Ban
                      </span>
                      <span
                        onClick={() => {
                          handleRemove(val?.id)
                          setRemoveModal(true)
                        }}
                        className="font-medium text-red-500 dark:text-blue-500 hover:cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
        <TokenExpire isOpen={isExpired} />
      </div>
    </>
  )
}

export default ManageAccount
