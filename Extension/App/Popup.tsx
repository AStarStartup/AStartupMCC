// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ModelConfigSync, ModelConfigSyncGet,
  ModelConfigSyncInit,
  ModelConfigSyncSet,
  ModelSyndicateGet
} from '../Model'
import MissionSelector from '../View/MissionSelector'
const { TimestampSeconds } = require('linearid')

function SessionNumberChange(session_number: number, config: ModelConfigSync) {
  if(session_number < 0) return
  ModelConfigSyncSet({ ...config, session: session_number })
}

// Browser extension popup widget.
const Popup = () => {
  console.log('>Popup')
  // Live Coding AStartupMCC #39.F Add: Can clock and off to dummy...
  const [Config, ConfigSet] = useState<ModelConfigSync | null>(ModelConfigSyncInit)
  const [MissionHeading, MissionHeadingSet] = useState('')
  const [SessionHeading, SessionHeadingSet] = useState('')
  const [Syndicate, SyndicateSet ] = useState({})

  const [IsSaving, IsSavingSet] = useState(false)
  useEffect(() => {
    console.log('[useEffect]')
    ModelConfigSyncGet().then(options_new => ConfigSet(options_new))
    ModelSyndicateGet().then(syndicate_new => SyndicateSet(syndicate_new))
  }, [])
  if (Config == null) return <div>Config == null</div>
  let { account, mission, mission_ids, repo, session, session_ids } = Config
  if (session == undefined) return <div>Config members undefined</div>
  const [SessionNumber, SessionNumberSet] = useState(0)

  function MissionHeadingUpdate (focus_headline: string) {
    MissionHeadingSet(focus_headline)
  }

  function SessionHeadingUpdate (focus_headline: string) {
    SessionHeadingSet(focus_headline)
  }

  function TimesheetPunchHandle () {
    if (session == undefined) return
    const Time = TimestampSeconds()
    const TimeText = new Date(Time * 1000)
    if(session == 0) { // End Session
      console.log('Clocking on to Session #' + SessionNumber + ' at ' + TimeText)
      //@todo Integrate with GitHub to create Session Tickets.
      const ConfigNew = {...(Config as ModelConfigSync), session: SessionNumber}
      ModelConfigSyncSet(ConfigNew)
      ConfigSet(ConfigNew)
    } else if (session < 0) { // Stop Break
      const S = -session
      console.log('Stopping break from Session #' + S + ' at ' + TimeText)
      const ConfigNew = {...(Config as ModelConfigSync), session: S}
      ModelConfigSyncSet(ConfigNew)
      ConfigSet(ConfigNew)
    } else { // -> Session > 0
      console.log('Clocking off from Session #' + session + ' at ' + TimeText)
      const ConfigNew = {...(Config as ModelConfigSync), session: 0}
      ModelConfigSyncSet(ConfigNew)
      ConfigSet(ConfigNew)
    }
  }

  function TimesheetBreakStartHandle () {
    if (session == undefined) return
    let time = TimestampSeconds()
    console.log('Starting break from Session #' + session + ' at ' + new Date(time * 1000))
    const ConfigNew = {...(Config as ModelConfigSync), session: -session}
    ModelConfigSyncSet(ConfigNew)
    ConfigSet(ConfigNew)
  }

  return <div className="flex flex-col w-full">
    <MissionSelector Config={Config} ConfigSet={ConfigSet} 
      Syndicate={Syndicate} />
    <br/>
    <h1>Account: {account} #{Math.abs(session)}</h1>
    <h2>Repo: {repo}</h2>
    <h3>Mission: #{Math.abs(mission)}</h3>
    <h4>Heading: {session_ids ?? '' + mission_ids}</h4>
    <div className='flex flex-row m-4'>
      { session == 0 && <>
        <input id='ClockOnOffButton' type="button" value="Begin Session" onClick={TimesheetPunchHandle} />
        <input
          id='SessionNumberInput'
          type='number'
          value={SessionNumber}
          onChange={ event => SessionNumberSet(event.target.valueAsNumber) }
          disabled={ IsSaving }
        />
        </>
      }
      { session > 0 && <>
        <input id='ClockBreakOnOffButton' type="button" value="End Session" onClick={TimesheetPunchHandle} />
        <input id='TimesheetBreakButton' type="button" value="Start Break" onClick={TimesheetBreakStartHandle} />
      </>}
      { session < 0 &&
        <input id='ClockBreakOnOffButton' type="button" value="Stop break" onClick={TimesheetPunchHandle} />
      }
      { session == 0 &&  <div>
        <span>Session and Mission Heading:</span>
        <input type='text' placeholder=
            "Enter #SID and heading..."
          value={ SessionHeading }
          onChange={ (event) => SessionHeadingUpdate(event.target.value) }
          disabled={ IsSaving }
        />
        <span>Mission heading:</span>
        <input type='text' placeholder=
            "Enter mission heading..."
          value={ MissionHeading }
          onChange={ (event) => MissionHeadingUpdate(event.target.value) }
          disabled={ IsSaving }
        />
      </div>
      }
    </div>
  </div>
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
