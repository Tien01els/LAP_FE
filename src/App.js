import React, { Suspense, useState, useEffect, createContext } from 'react'
import { io } from 'socket.io-client'
import AppRouter from './AppRouter'
import { SOCKET_API_URL } from './constant'
import { StudentProvider } from './Context/StudentContext'

export const SocketContext = createContext()

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(SOCKET_API_URL))
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <StudentProvider>
        <Suspense fallback={<></>}>
          <AppRouter />
        </Suspense>
      </StudentProvider>
    </SocketContext.Provider>
  )
}

export default App
