import React from 'react';

export function ButtonSave({ props, children }) {
  return <button
  color="primary"
  onClick={() => props?.dispatch({ type: 'OptionsSave', 
    values: {...props.options, } })}
  disabled={ props.is_saving }>
    { children }
</button>
}

export function Tooltip({ children, title }) {
  return <div
    className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
    data-te-toggle="tooltip"
    title={title}
    >{children}
  </div>
}