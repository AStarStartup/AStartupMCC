// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import MissionSelector from './MissionSelector'
import { ModelConfig, ModelConfigGet, ModelConfigInit, ModelSyndicateGet } from '../Model'

const Popup = () => {
  console.log('>Popup')
  const [Config, ConfigSet] = useState<ModelConfig | null>(ModelConfigInit)
  const [Syndicate, SyndicateSet ] = useState({})

  const [IsSaving, IsSavingSet] = useState(false)
  useEffect(() => {
    console.log('[useEffect]')
    ModelConfigGet().then(options_new => ConfigSet(options_new))
    ModelSyndicateGet().then(syndicate_new => SyndicateSet(syndicate_new))
  }, [])
  if (Config == null) return <div>Options == null</div>
  let { me, account, repo, mission } = Config
  /*
  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return
    }
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }
  */

  const SessionFocusChange = (username: string) => {
  }

  function LogInOutHandle() {
    
  }
     
  
  return <div className="flex w-full">
    <MissionSelector Config={Config} ConfigSet={ConfigSet} 
      Syndicate={Syndicate} />
    <br/>
    <h1>Account: {account}</h1>
    <h2>Repo: {repo}</h2>
    <h3>Mission: {mission}</h3>
    <input placeholder=
        "Enter the current focus of the mission..."
      value={ me }
      onChange={ (event) => SessionFocusChange(event.target.value) }
      disabled={ IsSaving }
    />
    <input type="button"value="Log In" onClick={LogInOutHandle} />
  </div>
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
