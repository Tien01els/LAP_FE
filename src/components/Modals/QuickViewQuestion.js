import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'
import 'mathlive'

import MultiChoice from '../Teacher/AnswerType/MultiChoice'
import TrueFalse from '../Teacher/AnswerType/TrueFalse'
import MultiSelectAnswers from '../Student/MultiSelectAnswers'
import { useEffect } from 'react'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(165, 165, 165, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '8px',
    overflow: 'unset !important',
  },
}

const answers = {
  multiChoice: [
    {
      answer: 'test',
      isTrue: true,
    },
    {
      answer: 'test',
      isTrue: false,
    },
    {
      answer: 'test',
      isTrue: false,
    },
    {
      answer: 'test',
      isTrue: false,
    },
  ],
  trueFalse: [
    { isTrue: true, answer: 'True' },
    { isTrue: false, answer: 'False' },
  ],
  input: [{ isTrue: true, answer: 'test' }],
  multiSelect: [
    {
      answer: 'test',
      isTrue: true,
    },
    {
      answer: 'test',
      isTrue: true,
    },
    {
      answer: 'test',
      isTrue: false,
    },
    {
      answer: 'test',
      isTrue: false,
    },
  ],
}

const QuickViewQuestion = ({ isOpen, setIsOpen, question }) => {
  const renderAnswer = (questionTypeId, options) => {
    options = JSON.parse(options)
    switch (questionTypeId) {
      case 1:
        return (
          answers && (
            <MultiChoice
              answers={options}
              setAnswers={() => {}}
              Preview={true}
            />
          )
        )
      case 2:
        return answers && <TrueFalse answers={options} Review={true} />
      case 3:
        return (
          answers && (
            <div className="flex flex-col gap-4">
              <span className="px-2 font-[500]">Correct input</span>
              <div className="bg-blue-400  rounded-lg px-3 py-3 max-h-[200px] overflow-auto text-white break-words whitespace-normal">
                <span>{options.input[0].answer}</span>
              </div>
            </div>
          )
        )
      case 4:
        return answers && <MultiSelectAnswers answers={options} review />
      default:
        return <div>404</div>
    }
  }

  useEffect(() => {
    const mf = document.querySelector('#viewQ')
    if (mf) {
      mf.applyStyle({ fontSize: 7 })
      console.log(mf)
    }
  }, [question])

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(!isOpen)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-5 w-[600px] h-fit">
        <div className="flex flex-col gap-5">
          <math-field
            style={{
              whiteSpace: 'initial',
              fontSize: '20px',
              outline: 'none',
              padding: '0.5rem 1.5rem',
              userSelect: 'none',
              width: '100%',
              maxHeight: '150px',
              overflowWrap: 'break-word',
              fontFamily: 'Poppins',
            }}
            id="viewQ"
            value={
              String.raw`\begin{multline}
            ` +
              question.content +
              String.raw`\end{multline}`
            }
            readOnly
          ></math-field>
          {/* <span className="text-2xl font-semibold w-[450px] whitespace-normal break-words text-gray-700">
            {question.content}
          </span> */}
          <div className="flex flex-row gap-5 items-center text-sm px-2 text-gray-500">
            <span className="bg-primary text-white rounded-full px-2 text-sm flex items-center">
              {(question.questionTypeId === 1 && 'Multi Choice') ||
                (question.questionTypeId === 2 && 'True False') ||
                (question.questionTypeId === 3 && 'Input') ||
                (question.questionTypeId === 4 && 'Multi Select')}
            </span>
            <span className="text-gray-500">{question.score} pt</span>
          </div>
          {/* answers */}
          <div>{renderAnswer(question.questionTypeId, question.option)}</div>
        </div>
        <div className="flex flex-row-reverse">
          <Button className="w-[30%]" onClick={() => setIsOpen(!isOpen)}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default QuickViewQuestion
