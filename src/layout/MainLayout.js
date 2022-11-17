import React from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from '../modules/main/TeacherSidebar'

const MainLayout = ({ role }) => {
  if (!role) return <Outlet></Outlet>

  return (
    <>
      <div className="pl-60">
        <Outlet></Outlet>
      </div>
      <TeacherSidebar />
    </>
  )
}

export default MainLayout
