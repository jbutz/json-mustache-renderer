import React from 'react'

export const TextareaComponent = React.forwardRef((props: any, ref) => <textarea {...props} ref={ref} className={`pure-u-1 ${props.className || ''}`}>{props.children}</textarea>);