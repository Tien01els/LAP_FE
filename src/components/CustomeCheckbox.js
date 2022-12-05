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
      className={`flex flex-row gap-5 w-full rounded-lg select-none
                    outline outline-[2px] outline-primary px-5 py-2 transition-all cursor-pointer ${
                      isChecked ? `bg-primary text-white` : `text-primary`
                    }`}
      onClick={() => {
        handleClickCustomCheckbox(item?.answer)
      }}
    >
      <input type="checkbox" value={item?.answer} className="hidden" />
      <label className="flex flex-row justify-between items-center w-full cursor-pointer">
        <span className="w-[80%] whitespace-normal break-words">
          {item?.answer}
        </span>
        <div className="flex items-center border justify-center rounded-full border-primary bg-white h-[20px] w-[20px]">
          {isChecked ? (
            <i className="fa-solid fa-check text-green-400 text-xs"></i>
          ) : (
            ''
          )}
        </div>
      </label>
    </div>
  )
}

export default CustomCheckbox
