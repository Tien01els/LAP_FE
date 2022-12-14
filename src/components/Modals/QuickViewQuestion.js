import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'

//
import MultiChoice from '../Teacher/AnswerType/MultiChoice'
import TrueFalse from '../Teacher/AnswerType/TrueFalse'
import MultiSelectAnswers from '../Student/MultiSelectAnswers'

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

const QuickViewQuestion = ({ isOpen, setIsOpen }) => {
  const renderAnswer = (questionTypeId) => {
    switch (questionTypeId) {
      case 1:
        return (
          answers && (
            <MultiChoice answers={answers} setAnswers={() => {}} Preview />
          )
        )
      case 2:
        return answers && <TrueFalse answers={answers} />
      case 3:
        return (
          answers && (
            <div className="px-5 py-5">
              <span className="">
                Correct answer
                <br />
                {answers.input[0].answer}
              </span>
            </div>
          )
        )
      case 4:
        return answers && <MultiSelectAnswers answers={answers} />
      default:
        return <div>404</div>
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(!isOpen)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-5 w-[600px] h-fit">
        <div className="flex flex-col">
          <span className="text-xl font-semibold w-[450px] whitespace-normal break-words text-gray-700">
            Question
          </span>
          <div className="flex flex-row gap-5 items-center text-sm text-gray-500">
            <span>Multi choice</span>
            <span>5pt</span>
          </div>
          {/* answers */}
          <div className="pt-10">{renderAnswer(1)}</div>
        </div>
        <div className="flex flex-row-reverse">
          <Button className="w-[30%]">Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

export default QuickViewQuestion
