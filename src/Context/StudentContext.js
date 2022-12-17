import { useState, createContext } from 'react'

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState()

  const value = {
    studentInfo,
    setStudentInfo,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentProvider, StudentContext }
