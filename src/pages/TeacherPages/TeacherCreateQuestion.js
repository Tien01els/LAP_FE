import React from 'react'
import { MathfieldElement } from 'mathlive'
// import EquationEditor from 'equation-editor-react'
import { useState } from 'react'

const TeacherCreateQuestion = () => {
  // const [latex, setLatex] = React.useState('f(x)=\\log _10 x')
  const mfe = new MathfieldElement()

  const [equation, setEquation] = useState('y=x')
  return (
    <div className="flex flex-row items-center gap-10 justify-center min-h-[60%] h-screen">
      <div
        className="min-h-[90%] min-w-[60%] bg-white h-[600px] w-[60%] rounded-lg shadow-lg
      flex flex-col px-10 py-5"
      >
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-xl">Question</span>

          <math-field
            // id={`question-${idQuestion}` || `1`}
            style={{
              whiteSpace: 'initial',
              fontSize: '20px',
              outline: 'none',
              padding: '0.5rem 1.5rem',
              border: '1px solid #dadada',
              borderRadius: '10px',
              width: '100%',
              cursor: 'pointer',
              maxHeight: '200px',
            }}
          ></math-field>
        </div>
      </div>
      <div className="min-h-[90%] min-w-[20%] bg-white h-[600px] w-[30%] rounded-lg shadow-lg"></div>
    </div>
  )
}

export default TeacherCreateQuestion
