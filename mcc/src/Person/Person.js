import React from 'react';
import './Person.css'

const Person = (props) => {
  return (
    <div className="Person">
      <p>I'm {props.name} and I'm {props.age}.</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.} />
    </div>
  )
};

export default Person;
