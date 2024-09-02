// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ModelConfigLocal, ModelConfigLocalGet, ModelConfigLocalInit, 
  ModelConfigLocalSet,
  ModelConfigSync, ModelConfigSyncGet, ModelConfigSyncInit, ModelConfigSyncSet,
  ModelSyndicateGet
} from '../Model'
import SessionPunchClockView from '../View/SessionPunchClockView'

// Browser extension popup widget.
const Popup = () => {
  console.log('>Popup')
  // Example:
  // Live Coding AStartupMCC #39.F Add: Can clock and off to dummy...
  const [ConfigSync, ConfigSyncSet] = 
    useState<ModelConfigSync | null>(ModelConfigSyncInit)
  const [ConfigLocal, ConfigLocalSet] = 
    useState<ModelConfigLocal | null>(ModelConfigLocalInit)
  const [Syndicate, SyndicateSet ] = useState({})
  const [IsSaving, IsSavingSet] = useState(false)

  useEffect(() => {
    console.log('[useEffect]')
    ModelConfigSyncGet().then(state => ConfigSyncSet(state))
    ModelConfigLocalGet().then(state => ConfigLocalSet(state))
    ModelSyndicateGet().then(state => SyndicateSet(state))
  }, [])
  if (ConfigLocal == null || ConfigSync == null) return <div>null</div>

  let { account, mission_ids, repo, session, session_ids } = ConfigSync
  if (session == undefined) return <div>Config members undefined</div>

  return <div className="flex flex-col w-full">
    <h1>Account: {account} #{Math.abs(session)}</h1>
    <h2>Repo: {repo}</h2>
    <h3>Mission: {mission_ids}</h3>
    <h4>Heading: {session_ids}</h4>
    <br/>
    <SessionPunchClockView ConfigSync={ConfigSync} ConfigSyncSet={ConfigSyncSet}
      ConfigLocal={ConfigLocal} ConfigLocalSet={ConfigLocalSet}
      ModelConfigLocalSet={ModelConfigLocalSet}
      ModelConfigSyncSet={ModelConfigSyncSet}
      IsSaving={IsSaving} Syndicate={Syndicate} />
  </div>
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
