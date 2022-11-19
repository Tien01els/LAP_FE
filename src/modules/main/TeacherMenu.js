import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import createAxiosJWT from '../../createAxiosJWT'
import { SocketContext } from '../../App'
import jwtDecode from 'jwt-decode'

const axiosJWT = createAxiosJWT()

const Notification = ({ value }) => {
  return (
    <div className="flex flex-row p-3 select-none hover:bg-gray-100 transition-all gap-4">
      <i className="fa-solid fa-square-check text-2xl text-green-400"></i>
      <div className="flex flex-col gap-2">
        <span className="max-w-[260px] pt-1 text-sm whitespace-normal break-words text-gray-600">
          {value.content}
        </span>
        <div className="flex flex-row justify-between items-center">
          <span className="text-xs text-gray-400">
            {moment(value.dateRequest).format('lll')}
          </span>
          <div className="flex flex-row gap-2">
            <Button className="text-xs">Accept</Button>
            <Button className="text-xs bg-white text-primary shadow border border-primary">
              Refuse
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TeacherMenu = () => {
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = useMemo(() => {
    return accessToken && jwtDecode(accessToken)
  }, [accessToken])
  const socket = useContext(SocketContext)

  const [isOpenNoti, setIsOpenNoti] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    socket?.on('vui ve ko quau nha 2', (data) => {
      console.log('SV Nhat')
    })
    socket?.on('get-request-unlock-topic', (data) => {
      if (data.senderId !== decodedToken?.accountId) {
        console.log(data)
        setNotifications((prev) => [data, ...prev])
      }
    })
  }, [socket, decodedToken])

  const getRoomsOfUser = useCallback(async () => {
    try {
      if (decodedToken) {
        const res = await axiosJWT.get(
          API_URL + `notification-content/receiver/${decodedToken.accountId}`,
        )
        setNotifications(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [decodedToken])

  useEffect(() => {
    getRoomsOfUser()
  }, [getRoomsOfUser])

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

      <div className="relative">
        <div
          onClick={() => setIsOpenNoti(!isOpenNoti)}
          className={
            isOpenNoti
              ? 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none  text-gray-600 bg-[#e5ebee]'
              : 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none hover:bg-gray-100  text-gray-600'
          }
        >
          <i className="fa-regular fa-bell text-xl"></i>
          <span className="font-semibold ml-1 text-sm">Notification</span>
          <div className="absolute bg-red-500 w-[8px] h-[8px] translate-x-3 -translate-y-3 rounded-full"></div>
        </div>
        <div
          className={`${
            isOpenNoti ? `` : `hidden`
          }  absolute bg-white rounded-r-lg pr-1 pb-2 shadow flex flex-col w-[350px] h-[100vh] translate-x-[220px] -translate-y-[480px]  z-[1000px]`}
        >
          <span className="text-xl text-gray-600 font-[500] px-5 py-3">
            Notifications
          </span>
          <div className="flex flex-col overflow-y-auto">
            {notifications?.map((val, i) => {
              return <Notification key={val.id} value={val} />
            })}
          </div>
        </div>
      </div>

      <NavLink
        to={'/create-question'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#f9fbfc]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fas fa-home text-xl pb-1"></i>
        <span className="font-semibold text-sm">Create Question</span>
      </NavLink>
    </div>
  )
}

export default TeacherMenu
