import React from 'react'
import { NavLink } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const StudentSidebar = () => {
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = accessToken && jwtDecode(accessToken)

  console.log(decodedToken)

  return (
    <div className="flex flex-col gap-3">
      <NavLink
        to={'/dashboard'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fas fa-home text-xl pb-1"></i>
        <span className="font-semibold text-sm">Dashboard</span>
      </NavLink>
      <NavLink
        to={'/class'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100  text-gray-600'
        }
      >
        <i className="far fa-bookmark text-xl mb-1 ml-1"></i>
        <span className="font-semibold ml-1 text-sm">Class</span>
      </NavLink>

      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#f9fbfc]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fa-regular fa-user text-xl pb-1 pr-1"></i>
        <span className="font-semibold text-sm">Profile</span>
      </NavLink>
    </div>
  )
}

export default StudentSidebar