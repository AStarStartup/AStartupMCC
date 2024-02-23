// Copyright AStartup; license at https://github.com/AStartupMCC

import React, { useState } from 'react'
const { TimestampSeconds } = require('linearid')
import MissionSelector from './MissionSelector'
import { ModelConfigLocal, ModelConfigLocalSet, ModelConfigSync,
  ModelConfigSyncSet } from '../Model'

export default function SessionPunchClockViewView(props: {
  ConfigLocal   : ModelConfigLocal
  ConfigLocalSet: (o: ModelConfigLocal) => void
  ConfigSync   : ModelConfigSync
  ConfigSyncSet: (o: ModelConfigSync) => void
  ModelConfigLocalSet: (config: ModelConfigLocal) => Promise<void>
  ModelConfigSyncSet : (config: ModelConfigSync) => Promise<void>
  IsSaving: boolean
  Syndicate: object
}) {
  const { ConfigLocal, ConfigLocalSet, ConfigSync, ConfigSyncSet, 
    IsSaving, Syndicate } = props
  let { session } = ConfigSync
  if(session == undefined) return <div>undefined</div>
  const [MissionHeading, MissionHeadingSet] = useState('')
  const [SessionHeading, SessionHeadingSet] = useState('')
  const [SessionNumber, SessionNumberSet]   = useState(0)

  const CanCancelMissionSwitch = ConfigLocal.account != ConfigSync.account ||
    ConfigLocal.mission_ids != ConfigSync.mission_ids ||
    ConfigLocal.repo != ConfigSync.repo

    const OtherMissionSelected = ConfigLocal.account != ConfigSync.account &&
      ConfigLocal.mission_ids != ConfigSync.mission_ids &&
      ConfigLocal.repo != ConfigSync.repo

  function TimesheetPunchHandle () {
    if (session == undefined) return
    const Time = TimestampSeconds()
    const TimeText = new Date(Time * 1000)
    if(session == 0) { // End Session
      console.log('Clocking on to Session #' + SessionNumber + ' at ' + TimeText)
      //@todo Integrate with GitHub to create Session Tickets.
      const ConfigNew = {...(ConfigSync as ModelConfigSync), session: SessionNumber}
      ModelConfigSyncSet(ConfigNew)
      ConfigSyncSet(ConfigNew)
    } else if (session < 0) { // Stop Break
      const S = -session
      console.log('Stopping break from Session #' + S + ' at ' + TimeText)
      const ConfigNew = {...(ConfigSync as ModelConfigSync), session: S}
      ModelConfigSyncSet(ConfigNew)
      ConfigSyncSet(ConfigNew)
    } else { // -> Session > 0
      console.log('Clocking off from Session #' + session + ' at ' + TimeText)
      const ConfigNew = {...(ConfigSync as ModelConfigSync), session: 0}
      ModelConfigSyncSet(ConfigNew)
      ConfigSyncSet(ConfigNew)
    }
  }

  function TimesheetBreakStartHandle () {
    if (session == undefined) return
    let time = TimestampSeconds()
    console.log('Starting break from Session #' + session + ' at ' + new Date(time * 1000))
    const ConfigNew = {...(ConfigSync as ModelConfigSync), session: -session}
    ModelConfigSyncSet(ConfigNew)
    ConfigSyncSet(ConfigNew)
  }

  function MissionHeadingUpdate (focus_headline: string) {
    MissionHeadingSet(focus_headline)
  }

  function SessionHeadingUpdate (focus_headline: string) {
    SessionHeadingSet(focus_headline)
  }

  return <div className='flex flex-row m-4'>
    { session == 0 && <>
      <input id='ClockOnOffButton' type="button" value="Begin Session" onClick={TimesheetPunchHandle} />
      <input
        id='SessionNumberInput'
        type='number'
        value={SessionNumber}
        onChange={ e => SessionNumberSet(e.target.valueAsNumber) }
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
    <MissionSelector ConfigLocal={ConfigLocal} ConfigLocalSet=
      {ConfigLocalSet} ModelConfigSyncSet={ModelConfigSyncSet}
      Syndicate={Syndicate} />
    { CanCancelMissionSwitch &&  
    <button onClick={() => {
      const ConfigNew = { ...ConfigLocal, account: ConfigSync.account, 
        repo: ConfigSync.repo, mission_ids: ConfigSync.mission_ids }
      console.log('')
      ConfigLocalSet(ConfigNew)
      ModelConfigLocalSet(ConfigNew)
    }}>Cancel</button>
    }
    { OtherMissionSelected && 
    <button onClick={() => {
      const Timestamp = TimestampSeconds()
      let {account, mission_ids, repo} = ConfigLocal
      const ConfigNew = { ...ConfigSync, account: account, 
        repo: repo, mission_ids: mission_ids }
      console.log(new Date(Timestamp * 1000) + ': Starting mission ' + account + '/' + repo + mission_ids)
      ConfigSyncSet(ConfigNew)
      ModelConfigSyncSet(ConfigNew)
    }}>Start mission</button>
    }

  </div>
}