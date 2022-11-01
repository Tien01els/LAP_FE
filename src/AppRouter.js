import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const MainLayout = lazy(() => import('./layout/MainLayout'));
const TeacherDashBoard = lazy(() => import('./pages/TeacherPages/TeacherDashBoard'));
const TeacherClasses = lazy(() => import('./pages/TeacherPages/TeacherClasses'));
const TeacherClass = lazy(() => import('./pages/TeacherPages/TeacherClass'));
const TeacherCreateQuestion = lazy(() => import('./pages/TeacherPages/TeacherCreateQuestion'));
const Topics = lazy(() => import('./pages/TopicPages/Topics'));
const Skills = lazy(() => import('./pages/SkillPages/Skills'));
const ManageAssignment = lazy(() => import('./pages/TeacherPages/ManageAssignment'));
const TeacherAssignment = lazy(() => import('./pages/TeacherPages/TeacherAssignment'));
const TeacherManageStudents = lazy(() => import('./pages/TeacherPages/TeacherManageStudents'));

const StudentDashboard = lazy(() => import('./pages/StudentPages/StudentDashboard'));

const AnswerQuestion = lazy(() => import('./pages/AnswerQuestion'));

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout></MainLayout>}>
                <Route path='/' element={<TeacherDashBoard />}></Route>
                <Route path='/teacher/dashboard' element={<TeacherDashBoard />}></Route>
                <Route path='/teacher/class' element={<TeacherClasses />}></Route>
                <Route path='/teacher/class/:classId' element={<TeacherClass />} />
                <Route path='/teacher/class/:classId/topic' element={<Topics />} />
                <Route path='/teacher/class/:classId/topic/:topicId' element={<Skills />} />
                <Route path='/teacher/create-question' element={<TeacherCreateQuestion />} />
                <Route path='/teacher/class/:classId/manage-student' element={<TeacherManageStudents />} />
                <Route path='/student/dashboard' element={<StudentDashboard />} />
                <Route path='/question' element={<AnswerQuestion />} />
                <Route
                    path='/teacher/skill/:skillId/assignment/:assignmentId'
                    element={<TeacherAssignment />}
                />
                <Route path='/teacher/manage-assignment' element={<ManageAssignment />} />
            </Route>
        </Routes>
    );
}
