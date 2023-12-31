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
