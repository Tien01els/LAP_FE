import React from 'react'
import ManageGrade from '../../components/Admin/ManageGrade'
import ManageQuestionType from '../../components/Admin/ManageQuestionType'
import ManageRole from '../../components/Admin/ManageRole'
import ManageStandard from '../../components/Admin/ManageStandard'

const ManageSystem = () => {
  return (
    <div className="px-10 py-7 flex flex-col gap-5">
      <span className="text-2xl font-[500] text-gray-600">Manage System</span>
      <div className="flex flex-wrap gap-10">
        {/* Question type */}
        <ManageRole />
        <ManageStandard />
        <ManageQuestionType />
        <ManageGrade />
      </div>
    </div>
  )
}

export default ManageSystem
