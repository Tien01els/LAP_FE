import React, { useEffect, useState } from 'react'

const InputAnswer = ({ answers, setAnswers }) => {
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    setAnswers([{ answer: answer }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer])

  useEffect(() => {
    setAnswer(answers[0]?.answer || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter the answer..."
        className="outline-primary resize-none transition-all border-2 border-gray-500 px-5 py-2 rounded-md w-[90%]"
      ></textarea>
    </div>
  )
}

export default InputAnswer
