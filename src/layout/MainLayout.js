import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../modules/main/Sidebar'

const MainLayout = ({ role }) => {
  if (!role) return <Outlet></Outlet>

  return (
    <>
      <div className="pl-60">
        <Outlet></Outlet>
      </div>
      <Sidebar />
    </>
  )
}

export default MainLayout
