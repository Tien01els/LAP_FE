import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Test from './pages/Test'

const MainLayout = lazy(() => import('./layout/MainLayout'))
const TeacherDashBoard = lazy(() =>
  import('./pages/TeacherPages/TeacherDashBoard'),
)
const TeacherClasses = lazy(() => import('./pages/TeacherPages/TeacherClasses'))
const TeacherClass = lazy(() => import('./pages/TeacherPages/TeacherClass'))
const TeacherCreateQuestion = lazy(() =>
  import('./pages/TeacherPages/TeacherCreateQuestion'),
)
// const Topics = lazy(() => import('./pages/TopicPages/Topics'));
const Skills = lazy(() => import('./pages/SkillPages/Skills'))
const TeacherAssignment = lazy(() =>
  import('./pages/TeacherPages/TeacherAssignment'),
)
const TeacherManageStudents = lazy(() =>
  import('./pages/TeacherPages/TeacherManageStudents'),
)
const TeacherManageTopic = lazy(() =>
  import('./pages/TeacherPages/TeacherManageTopic'),
)
const AssignmentView = lazy(() => import('./pages/TeacherPages/AssignmentView'))
const TeacherExams = lazy(() => import('./pages/TeacherPages/TeacherExams'))
const TeacherReviewAnswers = lazy(() =>
  import('./pages/TeacherPages/TeacherReviewAnswers'),
)
const RoadMap = lazy(() => import('./pages/RoadMap'))

// Students
const StudentDashboard = lazy(() =>
  import('./pages/StudentPages/StudentDashboard'),
)
const StudentClass = lazy(() => import('./pages/StudentPages/StudentClass'))
const AnswerQuestion = lazy(() => import('./pages/AnswerQuestion'))
const AssignmentResult = lazy(() => import('./pages/AssignmentResult'))
const StudentExams = lazy(() => import('./pages/StudentPages/StudentExams'))

//admin
const ManageAccount = lazy(() => import('./pages/AdminPages/ManageAccount'))
const ManageSystem = lazy(() => import('./pages/AdminPages/ManageSystem'))

//login
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

//
const Profile = lazy(() => import('./pages/Profile'))

export default function AppRouter() {
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = accessToken && jwt_decode(accessToken)
  if (!decodedToken)
    return (
      <Routes>
        <Route path="*" element={<Login />} />;
      </Routes>
    )

  const returnRoutes = (roleID) => {
    if (roleID === 1)
      return (
        <>
          <Route path="/" element={<ManageSystem />} />
          <Route path="/accounts" element={<ManageAccount />} />
          <Route path="/system" element={<ManageSystem />} />
        </>
      )
    if (roleID === 2) {
      return (
        <>
          <>
            <Route path="/" element={<TeacherDashBoard />} />
            <Route path="/dashboard" element={<TeacherDashBoard />} />
            <Route path="/class" element={<TeacherClasses />} />
            <Route path="/class/:classId" element={<TeacherClass />} />
            <Route
              path="/class/:classId/topic"
              element={<TeacherManageTopic />}
            />
            <Route path="/class/:classId/topic/:topicId" element={<Skills />} />
            <Route
              path="/create-question"
              element={<TeacherCreateQuestion />}
            />
            <Route
              path="/class/:classId/manage-student"
              element={<TeacherManageStudents />}
            />
            <Route
              path="/skill/:skillId/assignment/:assignmentId"
              element={<TeacherAssignment />}
            />
            <Route
              path="/class/:classId/manage-topic"
              element={<TeacherManageTopic />}
            />
            <Route
              path="/assignment-summary/:assignmentId"
              element={<AssignmentView />}
            />
            <Route path="/class/:classId/exams" element={<TeacherExams />} />
            <Route
              path="/class/:classId/assignment/:assignmentId"
              element={<TeacherAssignment />}
            />
            <Route
              path="/assignment/:assignmentId/review"
              element={<TeacherReviewAnswers />}
            />
            <Route
              path="/assignment/:assignmentId/result"
              element={<AssignmentResult isTeacher />}
            />
            <Route
              path="/assignment/:assignmentId/question"
              element={<AnswerQuestion isTeacher />}
            />
            <Route
              path="/assignment/:assignmentId/question/:questionIndex"
              element={<AnswerQuestion isTeacher />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/road-map" element={<RoadMap isTeacher />} />
            <Route path="/test2" element={<Test />} />
          </>
        </>
      )
    }
    if (roleID === 3) {
      return (
        <>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route
            path="/assignment/:assignmentId/question"
            element={<AnswerQuestion />}
          />
          <Route
            path="/assignment/:assignmentId/question/:questionIndex"
            element={<AnswerQuestion />}
          />
          <Route path="/class/:classId" element={<StudentClass />} />
          <Route
            path="/assignment/:assignmentId/result"
            element={<AssignmentResult />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exams" element={<StudentExams />} />
          <Route path="/road-map" element={<RoadMap />} />
        </>
      )
    }
    if (roleID === 4) {
      return (
        <>
          <Route path="/" element={<StudentDashboard isParent />} />
          <Route path="/dashboard" element={<StudentDashboard isParent />} />
          <Route path="/class/:classId" element={<StudentClass isParent />} />
          <Route path="/exams" element={<StudentExams isParent />} />
          <Route
            path="/assignment/:assignmentId/result"
            element={<AssignmentResult isParent />}
          />
          <Route path="/road-map" element={<RoadMap />} />
        </>
      )
    }
    return (
      <>
        <Route path="*" element={<Login />} />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout role={decodedToken?.roleId} />}>
        {returnRoutes(decodedToken?.roleId)}
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
