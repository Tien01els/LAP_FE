import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../../constant'
import logo from '../../img/logo.png'
import TeacherMenu from './TeacherMenu'
import StudentMenu from './StudentMenu'
import createAxiosJWT from '../../createAxiosJWT'
import { SocketContext } from '../../App'
import jwtDecode from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css'

const axiosJWT = createAxiosJWT()
const Sidebar = () => {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = useMemo(() => {
    return accessToken && jwtDecode(accessToken)
  }, [accessToken])

  const [rooms, setRooms] = useState([])

  const handleRoles = (roleId) => {
    if (roleId === 1) {
      return 'Admin'
    }
    if (roleId === 2) {
      return 'Teacher'
    }
    if (roleId === 3) {
      return 'Student'
    }
    if (roleId === 4) {
      return 'Parent'
    }
    return ''
  }

  let user = {
    name: decodedToken && decodedToken.fullName,
    imageUrl:
      'https://bizweb.dktcdn.net/100/307/433/articles/87126502-2509242206005371-2073523065622364160-n.jpg?v=1627806241047',
    role: handleRoles(decodedToken?.roleId),
  }

  const handleLogOut = async () => {
    try {
      await axiosJWT.delete(API_URL + 'account/logout')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/')
      window.location.reload()
    } catch (err) {
      console.log(err)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/')
      window.location.reload()
    }
  }

  const getRoomsOfUser = useCallback(async () => {
    try {
      if (decodedToken) {
        const res = await axiosJWT.get(
          API_URL + `notification-room/receiver/${decodedToken.accountId}`,
        )
        setRooms(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [decodedToken])

  useEffect(() => {
    getRoomsOfUser()
  }, [getRoomsOfUser])

  useEffect(() => {
    rooms && socket?.emit('rooms', rooms)
  }, [socket, rooms])

  const returnMenu = (roleId) => {
    if (roleId === 1) {
      return <></>
    }
    if (roleId === 2) {
      return <TeacherMenu />
    }
    if (roleId === 3) {
      return <StudentMenu />
    }
    if (roleId === 4) {
      return <StudentMenu />
    }
    return <></>
  }

  return (
    <div className="w-[240px] items-center h-full fixed top-0 left-0 bg-white shadow-sm flex flex-col p-5 gap-10 justify-between">
      {/* logo */}
      <div className="flex flex-col justify-center items-center gap-20">
        <img src={logo} alt="" className="w-[200px] h-[100px] bg-cover"></img>
        {/* Same as */}
        {returnMenu(decodedToken?.roleId)}
      </div>
      {/* bottom */}
      <div className="flex flex-row gap-3 items-center justify-between">
        <img
          src={user?.imageUrl}
          alt=""
          className="w-[50px] h-[50px] bg-cover rounded-full"
        ></img>
        <div className="flex flex-col justify-center text-gray-600">
          <span className="font-semibold text-sm w-[100px] truncate">
            {user?.name}
          </span>
          <span className="text-xs">{user?.role}</span>
        </div>
        <div
          className="flex justify-center items-center divide-solid cursor-pointer hover:bg-gray-200 px-2 h-8 rounded-lg text-gray-600"
          onClick={handleLogOut}
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
