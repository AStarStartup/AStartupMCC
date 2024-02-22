// Copyright AStartup; license at https://github.com/AStartupMCC

import React, { useState } from 'react'
const { TimestampSeconds } = require('linearid')
import MissionSelector from './MissionSelector'
import { ModelConfigSync, ModelConfigSyncSet } from '../Model'

export default function SessionPunchClockViewView(props: {
  ConfigSync   : ModelConfigSync
  ConfigSyncSet: (o: ModelConfigSync) => void
  IsSaving: boolean
  Syndicate: object
}) {
  const { ConfigSync, ConfigSyncSet, IsSaving, Syndicate } = props
  let { session } = ConfigSync
  if(session == undefined) return <div>undefined</div>
  const [MissionHeading, MissionHeadingSet] = useState('')
  const [SessionHeading, SessionHeadingSet] = useState('')
  const [SessionNumber, SessionNumberSet]   = useState(0)

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
    <MissionSelector ConfigSync={ConfigSync} ConfigSyncSet={ConfigSyncSet} 
      Syndicate={Syndicate} />
  </div>
}