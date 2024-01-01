// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useState, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { ModelConfig, ModelConfigInit, ModelConfigGet } from '../Model';

const Popup = () => {
  console.log('>Popup');
  const [Config, ConfigSet] = useState<ModelConfig | null>(
    ModelConfigInit);
  const [IsSaving, IsSavingSet] = useState(false);
  if (Config == null) return <div>Options == null</div>
  let { me: username, session, account, repo, mission, child_mission } = Config;

  useEffect(() => {
    console.log('[useEffect]');
    ModelConfigGet().then(options_new => ConfigSet(options_new));
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
      <h1>{username}</h1>
      <h2>Session #{session}</h2>
      <h3>{account}</h3>
      <h4>{repo}</h4>
      <h5>{mission}</h5>
      <h6>{child_mission}</h6>
      <input placeholder=
          "Enter the focus of the session in less than 100 characters..."
        value={ Config.me }
        onChange={ (event) => SessionFocusChange(event.target.value) }
        disabled={ IsSaving }
      />
    </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
