import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/main/Footer'
import TeacherSidebar from '../modules/main/TeacherSidebar'
const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Header></Header> */}
      <TeacherSidebar></TeacherSidebar>
      <div className="pl-60">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default MainLayout
