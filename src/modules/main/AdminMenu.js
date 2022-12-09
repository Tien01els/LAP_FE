import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-3">
      <NavLink
        to={'/system'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fa-solid fa-gear text-xl"></i>
        <span className="font-semibold text-sm">System</span>
      </NavLink>
      <NavLink
        to={'/accounts'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fa-solid fa-user text-xl"></i>
        <span className="font-semibold text-sm">Accounts</span>
      </NavLink>
    </div>
  )
}

export default AdminMenu
