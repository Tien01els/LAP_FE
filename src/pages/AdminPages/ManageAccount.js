import React, { useState } from 'react'
import Button from '../../components/Button'
import ManageAccountModal from '../../components/Modals/ManageAccountModal'

const ManageAccount = () => {
  const [openManageAccount, setOpenManageAccount] = useState(false)

  return (
    <div className="px-10 py-7 flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <span className="text-2xl font-[500]">Manage Account</span>
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
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                User Name
              </th>
              <th scope="col" className="py-3 px-6">
                role
              </th>
              <th scope="col" className="py-3 px-6">
                Active
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="py-4 px-6">Sliver</td>
              <td className="py-4 px-6">Laptop</td>
              <td className="py-4 px-6">$2999</td>
              <td className="py-4 px-6 text-right">
                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </span>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="py-4 px-6">White</td>
              <td className="py-4 px-6">Laptop PC</td>
              <td className="py-4 px-6">$1999</td>
              <td className="py-4 px-6 text-right">
                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </span>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="py-4 px-6">Black</td>
              <td className="py-4 px-6">Accessories</td>
              <td className="py-4 px-6">$99</td>
              <td className="py-4 px-6 text-right">
                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageAccount
