import React from 'react'

const imgsrc =
  'https://students.flinders.edu.au/_jcr_content/content/section_856874544_co/par_0/image_general.coreimg.png/1621207287287/waving-person.png'

const StudentCard = () => {
  return (
    <div className="w-full h-[150px] flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3">
      <img src={imgsrc} alt="" className="object-fill h-32 w-36 rounded-lg" />
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex flex-row justify-between items-center">
          <span className="font-medium max-w-[380px] truncate">
            Nguyen Minh Nhat
          </span>
          <div className="rounded-full h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center hover:bg-gray-100">
            <i className="fas fa-ellipsis-h font-xs"></i>
          </div>
        </div>
        <p className="text-sm line-clamp-3">
          Lorem Ipsum is simply dummy text of the printing and
          typesettingindustry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum
        </p>
        <div className="flex flex-row justify-between items-center pr-1 text-xs">
          <span>
            Average Score : <span className="text-primary">80</span>
          </span>
          <span className="text-primary cursor-pointer">View</span>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
