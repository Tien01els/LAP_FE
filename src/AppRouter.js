import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const MainLayout = lazy(() => import('./layout/MainLayout'))
const TeacherDashBoard = lazy(() =>
  import('./pages/TeacherPages/TeacherDashBoard'),
)
const TeacherClasses = lazy(() => import('./pages/TeacherPages/TeacherClasses'))
const TeacherClass = lazy(() => import('./pages/TeacherPages/TeacherClass'))

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route path="/" element={<TeacherDashBoard />}></Route>
        <Route path="/teacher/dashboard" element={<TeacherDashBoard />}></Route>
        <Route path="/teacher/class" element={<TeacherClasses />}></Route>
        <Route path="/teacher/class/:id" element={<TeacherClass />} />
      </Route>
    </Routes>
  )
}
