import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../constant'
import ConfirmModal from '../Modals/ConfirmModal'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()

const RoleList = ({ val, getAllRoles }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(API_URL + `role/${id}`)
      getAllRoles()
      setConfirmDelete(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmDelete}
        message="Are you sure to delete this role ?"
        yesConfirm={() => {
          handleDelete(val?.id)
        }}
        noConfirm={() => setConfirmDelete(false)}
      />
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="py-4 px-6">
          {val?.id}
        </th>
        <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {val?.role}
        </th>
        <td className="py-4 px-6 text-right">
          <span
            onClick={() => {
              setConfirmDelete(true)
            }}
            className="font-medium text-red-500 hover:cursor-pointer hover:underline"
          >
            Remove
          </span>
        </td>
      </tr>
    </>
  )
}

export default RoleList
