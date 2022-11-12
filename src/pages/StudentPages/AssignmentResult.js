import React from 'react'

const AssignmentResult = () => {
  const executeScroll = (id) => {
    let elementId = `question-${id}`
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="px-10 py-7 flex flex-row">
      {/* left */}
      <div className=" bg-white  w-[40%] h-fit px-5 py-4 shadow rounded-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-[500] text-primary">
              Assignment Name
            </span>
            <span className="text-gray-500 text-sm">
              <i class="fa-regular fa-clock"></i> 45 mins -{' '}
              <i class="fa-regular fa-calendar"></i> 20/12/2022
            </span>
            <span>Correct answers</span>
            <span className="font-base">Score</span>
          </div>
          {/* answers */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-base">Your answers</span>
            <div className="flex flex-wrap gap-5 px-2 py-3 rounded-xl items-center">
              {new Array(10).fill(0).map((val, i) => {
                return (
                  <div
                    onClick={() => executeScroll(i)}
                    key={i}
                    className="h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-200 hover:outline-red-400 rounded overflow-hidden transition-all cursor-pointer select-none"
                  >
                    <div className="flex justify-center items-center">
                      <span>{i + 1}</span>
                    </div>
                    <div className="text-white flex w-full h-full items-center justify-center bg-red-400">
                      <i className="fa solid fa-xmark text-[8px]"></i>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="px-10 gap-5 h-[90vh] w-[60%] overflow-y-auto  items-center justify-center">
        <div className="flex flex-col gap-5 pb-5 ">
          {new Array(10).fill(0).map((val, i) => {
            return (
              <div
                id={`question-${i}`}
                key={i}
                className="flex flex-row gap-5 w-full bg-white rounded-lg shadow px-3 py-3"
              >
                <div className="w-[80px] h-[80px] flex items-center justify-center bg-primary rounded-lg select-none">
                  <span className="text-white text-xl font-semibold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-3">
                      <span className="text-xl w-[480px]">
                        Ban co bi ngu khong ?
                      </span>
                      <span>Correct Answer</span>
                    </div>
                    <span className="text-sm text-gray-400 pt-1">5pt</span>
                  </div>
                  <div className="text-sm flex flex-row items-center gap-5">
                    <div className="bg-[#dcedfd] w-[480px] flex justify-between px-3 py-5 rounded-lg">
                      <span>Your Answer</span>
                    </div>
                    {/* sai nao thi lay do */}
                    <div>
                      <i className="fa-solid fa-circle-check text-xl text-green-400"></i>
                      <i class="fa-solid fa-circle-xmark text-xl text-red-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AssignmentResult
