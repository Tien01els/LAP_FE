import React, { useContext } from 'react'
import { SocketContext } from '../../App'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import Button from '../../components/Button'

const TeacherNotification = ({ value }) => {
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = accessToken && jwtDecode(accessToken)
  const socket = useContext(SocketContext)
  const handleAcceptRefuse = (answer) => {
    socket?.emit('send-handle-request-notification', {
      userId: decodedToken?.userId,

      senderId: decodedToken?.accountId,
      receiverId: value?.senderAccountId,

      senderRoleId: decodedToken?.roleId,
      receiverRoleId: 3,
      notificationContentId: value?.id,
      typeHandle: value?.typeHandle,
      idHandle: value?.idHandle,
      answer: answer,
    })
  }
  return (
    value && (
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
              <Button
                className="text-xs"
                onClick={() => {
                  handleAcceptRefuse(true)
                }}
              >
                Accept
              </Button>
              <Button
                className="text-xs bg-white text-primary shadow border border-primary"
                onClick={() => {
                  handleAcceptRefuse(false)
                }}
              >
                Deny
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default TeacherNotification
