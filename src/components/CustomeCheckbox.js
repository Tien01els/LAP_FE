import React, { useState } from 'react'

const CustomCheckbox = ({ item }) => {
  const [isChecked, setIsCheck] = useState(false)
  return (
    <div
      className={`flex flex-row gap-5 w-[70%] rounded-lg justify-center select-none
                    outline outline-[2px] outline-primary px-5 py-4 transition-all cursor-pointer ${
                      isChecked ? `bg-primary text-white` : `text-primary`
                    }`}
      onClick={() => {
        setIsCheck(!isChecked)
      }}
    >
      <input type="checkbox" value={item?.answer} className="hidden" />
      <label className="cursor-pointer">{item?.answer}</label>
    </div>
  )
}

export default CustomCheckbox
