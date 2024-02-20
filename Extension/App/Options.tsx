// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useReducer, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ClockIcon, GearIcon } from '../View/Icons'
import { Tooltip } from '../View/Primitives'

import {
  CommandStructureInit, ModelConfigSync,
  ModelConfigSyncGet,
  ModelConfigSyncInit
} from '../Model'
import TimesheetsView from '../View/Timesheets'
import SettingsEditor from '../View/SettingsView'
 
export function OptionsView () {
  console.log('[OptionsView].Begin')

  enum Modes {
    CentralCommand,
    Estuary,
    Init,
    Intake,
    Loading,
    MissionControl,
    Post,
    Settings,
    Timesheets
  }
  
  const SettingsDispatcher = (state, action) => {
    let type = action.type
    console.log('[OptionsView.ReduceState]: ' + type)
    switch (type) {
      case null: return state
      case 'Options':
        return state.map((state_prior) => {
          ///if (state_prior.id === action.id) {
          ///  return { ...state_prior, complete: !state_prior.complete };
          ///} else {
          ///  return state_prior;
          ///}
          return state_prior
        })
        case 'OptionsUsernameSet':
          return state.map((state_prior) => {

          })
      default: return state
    }
  };
 
  const [CommandStructure, CommandStructureSet] = 
    useState(CommandStructureInit)
  //const [Visible, VisibleSet] = useState(false) //???
  const [State, StateSet] = useState(0)
  const [IsSaving, IsSavingSet] = useState(false)
  const [Mode, ModeSet] = useState(Modes.Settings)
  const [Config, ConfigSet] = 
    useState<ModelConfigSync | null>(ModelConfigSyncInit)

  const SaveButtonStyles = 'block mt-10 border-none outline-none'
                         + 'rounded-md p-4 bg-violet-500 font-bold'
                         + 'cursor-pointer';
  
  useEffect(() => {
    console.log('[useEffect]')
    ModelConfigSyncGet().then(options_new => ConfigSet(options_new))
  }, [])

  const SettingsReducer = (action) => {
    return SettingsDispatcher(Config, action)
  }
  const [AppState, Dispatch] = useReducer(SettingsReducer, { prop1: null, prop2: null})

  if (Config == null || Config == undefined) return null
  
  return (
    <div id='Root'>
      <div id='RootMidground' />
      <div id='RootForeground' />
      <div id='RootBackground'>
        <div id='SPAHeader'>
          <img id='PageImage' src='./Icon128.png' />
          <div>
        </div>
        <div id='SPAToolbar' className='flex flex-row inline'>
          { Mode == Modes.Timesheets &&
            <Tooltip title="Timesheets">
              <button><ClockIcon />Timesheets</button>
            </Tooltip>
          }{ Mode != Modes.Timesheets &&
            <Tooltip title="Timesheets">
              <button onClick={() => ModeSet(Modes.Timesheets)}>
                <ClockIcon />Timesheets</button>
            </Tooltip>
          }{ Mode == Modes.Settings &&
            <Tooltip title="Settings">
              <button><GearIcon />Settings</button>
            </Tooltip>
          }{ Mode != Modes.Settings &&
            <Tooltip title="Settings">
              <button onClick={() => ModeSet(Modes.Settings)}>
                <GearIcon />Settings</button>
            </Tooltip>
          }
        </div>
        <div id='SPAMain' className=''>
          { Mode == Modes.Timesheets &&
              <TimesheetsView />
          }{ Mode == Modes.Settings &&
            <SettingsEditor dispatch={SettingsReducer} 
              is_saving={IsSaving} 
            />
          }
        </div>
      </div>
    </div>
  </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<OptionsView />)
