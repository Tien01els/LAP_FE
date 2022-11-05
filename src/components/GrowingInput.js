import React, { useState } from 'react'

const GrowingInput = React.forwardRef(
  ({ isEditing, className = '', ...rest }, ref) => {
    const [width, setWidth] = useState(rest?.defaultValue.length + 1 || 0)
    const changeHandler = (e) => {
      setWidth(e.target.value.length)
    }

    return (
      <input
        ref={ref}
        style={{ width: width + 1 + 'ch' }}
        className={`outline-none px-3 transition-all border-b-2 py-2 ${className} ${
          isEditing ? ` border-primary ` : `border-transparent`
        } `}
        onChange={(e) => changeHandler(e)}
        {...rest}
      />
    )
  },
)

export default GrowingInput
