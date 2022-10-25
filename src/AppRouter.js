import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const MainLayout = lazy(() => import('./layout/MainLayout'));
const TeacherDashBoard = lazy(() =>
    import('./pages/TeacherPages/TeacherDashBoard')
);
const TeacherClasses = lazy(() =>
    import('./pages/TeacherPages/TeacherClasses')
);
const TeacherClass = lazy(() => import('./pages/TeacherPages/TeacherClass'));
const TeacherCreateQuestion = lazy(() =>
    import('./pages/TeacherPages/TeacherCreateQuestion')
);
const Topics = lazy(() => import('./pages/TopicPages/Topics'));
const Skills = lazy(() => import('./pages/SkillPages/Skills'));
const TeacherManageStudents = lazy(() =>
    import('./pages/TeacherPages/TeacherManageStudents')
);
const TeacherAssignment = lazy(() =>
    import('./pages/TeacherPages/TeacherAssignment')
);

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout></MainLayout>}>
                <Route path='/' element={<TeacherDashBoard />}></Route>
                <Route
                    path='/teacher/dashboard'
                    element={<TeacherDashBoard />}
                ></Route>
                <Route
                    path='/teacher/class'
                    element={<TeacherClasses />}
                ></Route>
                <Route
                    path='/teacher/class/:classId'
                    element={<TeacherClass />}
                />
                <Route
                    path='/teacher/class/:classId/topic'
                    element={<Topics />}
                />
                <Route
                    path='/teacher/class/:classId/topic/:topicId'
                    element={<Skills />}
                />
                <Route
                    path='/teacher/createquestion'
                    element={<TeacherCreateQuestion />}
                />
                <Route
                    path='/teacher/manage-student'
                    element={<TeacherManageStudents />}
                />
                <Route
                    path='/teacher/skill/:skillId/assignment/:assignmentId'
                    element={<TeacherAssignment />}
                />
            </Route>
        </Routes>
    );
}
