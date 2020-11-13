import React from 'react'

export const ButtonComponent = React.forwardRef((props: any, ref) => <button {...props} ref={ref} className={`pure-button ${props.className || ''}`}>{props.children}</button>);