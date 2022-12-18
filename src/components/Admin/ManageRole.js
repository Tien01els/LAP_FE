import React, { useState, useEffect } from 'react'
import Button from '../Button'
import ManageRoleModal from '../Modals/Admin/ManageRoleModal'
import ReactPaginate from 'react-paginate'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import RoleList from './RoleList'

const axiosJWT = createAxiosJWT()

const ManageRole = () => {
  const [createModal, setCreateModal] = useState(false)
  const [roles, setRoles] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(itemOffset + 4)

  const pageCount = Math.ceil(roles.length / 4)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % roles.length
    setItemOffset(newOffset)
    setEndOffset(newOffset + 4)
  }

  const getAllRoles = async () => {
    try {
      const res = await axiosJWT.get(API_URL + `role`)
      setRoles(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRoles()
  }, [])

  useEffect(() => {
    setCurrentItems(roles.slice(itemOffset, endOffset))
  }, [roles, itemOffset, endOffset])

  return (
    <>
      <ManageRoleModal
        isOpen={createModal}
        setIsOpen={setCreateModal}
        getAllRoles={getAllRoles}
      />
      <div className="flex flex-col gap-4 w-fit h-fit bg-white shadow px-3 py-3 rounded-lg">
        <div className="flex flex-row items-center justify-between">
          <span className="font-[500] text-gray-600">Manage Role</span>
          <Button onClick={() => setCreateModal(true)} className="text-xs">
            Add new role
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
                  Role
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((val, index) => {
                return (
                  <RoleList key={index} val={val} getAllRoles={getAllRoles} />
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

export default ManageRole
