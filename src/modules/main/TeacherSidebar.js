import React from 'react'
import logo from '../../img/logo.png'
import TeacherMenu from './TeacherMenu'

const TeacherSidebar = () => {
  let user = {
    name: 'Nhat nguyen',
    imageUrl:
      'https://bizweb.dktcdn.net/100/307/433/articles/87126502-2509242206005371-2073523065622364160-n.jpg?v=1627806241047',
    role: 'Teacher',
  }
  return (
    <div className="w-[240px] items-center h-full fixed top-0 left-0 bg-white shadow-sm flex flex-col p-5 gap-10 justify-between">
      {/* logo */}
      <div className="flex flex-col justify-center items-center gap-20">
        <img src={logo} alt="" className="w-[200px] h-[100px] bg-cover"></img>
        <TeacherMenu/>
      </div>

      {/* bottom */}
      <div className="flex flex-row gap-3 items-center justify-between mx-2">
        <img
          src={user?.imageUrl}
          alt=""
          className="w-[50px] h-[50px] bg-cover rounded-full"
        ></img>
        <div className="flex flex-col justify-center  text-gray-600">
          <span className="font-semibold text-sm truncate">{user?.name}</span>
          <span className="text-xs">{user?.role}</span>
        </div>
        <div className="flex justify-center items-center divide-solid cursor-pointer hover:bg-gray-200 px-2 h-8 rounded-lg text-gray-600">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  )
}

export default TeacherSidebar
