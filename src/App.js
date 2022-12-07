import React, { Suspense, useState, useEffect, createContext } from 'react'
import { io } from 'socket.io-client'
import AppRouter from './AppRouter'
import { API_URL } from './constant'

export const SocketContext = createContext()

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(API_URL))
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <Suspense fallback={<></>}>
        <AppRouter />
      </Suspense>
    </SocketContext.Provider>
  )
}

export default App
