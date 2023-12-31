import React, { useEffect, useState, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { ModelOptions, ModelOptionsDefault, ModelOptionsGet } from '../Model';

const Popup = () => {
  console.log('>Popup');
  const [Options, OptionsSet] = useState<ModelOptions | null>(
    ModelOptionsDefault);
  const [IsSaving, IsSavingSet] = useState(false);
  if (Options == null) return <div>Options == null</div>
  let { mission, project, session, username } = Options;

  useEffect(() => {
    console.log('[useEffect]');
    ModelOptionsGet().then(options_new => OptionsSet(options_new));
  }, []);

  const SessionFocusChange = (username: string) => {
  }

  function LogInOutHandle() {
    
  }
  /*
      <div>{tags.length}/{Options.session_focus_length_max}</div>*/
  return (
    <div className="flex">
      <input type="button"value="Log In" onClick={LogInOutHandle} />
      <br/>
      <h1 className="Popup">{username}</h1>
      <input placeholder=
          "Enter the focus of the session in less than 100 characters..."
        value={ Options.username }
        onChange={ (event) => SessionFocusChange(event.target.value) }
        disabled={ IsSaving }
      />
      <h2>Session #{session}</h2>
      <h3 className="Popup">{project}</h3>
      <h4 className="Popup">Mission #{mission}</h4>
    </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
