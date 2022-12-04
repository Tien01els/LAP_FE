import React, { useState, useEffect } from 'react'

const CustomCheckbox = ({ item, onClickCheckbox, review }) => {
  const [isChecked, setIsCheck] = useState(false)
  const handleClickCustomCheckbox = (answer) => {
    if (review) {
      return
    }
    setIsCheck(!isChecked)
    onClickCheckbox(answer)
  }
  useEffect(() => {
    setIsCheck(item?.isTrue)
  }, [item])

  return (
    <div
      className={`flex flex-row gap-5 w-full rounded-lg justify-center select-none
                    outline outline-[2px] outline-primary px-5 py-4 transition-all cursor-pointer ${
                      isChecked ? `bg-primary text-white` : `text-primary`
                    }`}
      onClick={() => {
        handleClickCustomCheckbox(item?.answer)
      }}
    >
      <input type="checkbox" value={item?.answer} className="hidden" />
      <label className="cursor-pointer">{item?.answer}</label>
    </div>
  )
}

export default CustomCheckbox
