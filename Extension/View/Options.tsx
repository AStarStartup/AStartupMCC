// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useEffect, useReducer, useState } from 'react'
import { createRoot } from 'react-dom/client'

import {
  ModelCommandStructureDefault, ModelOptions,
  ModelOptionsDefault, ModelOptionsGet
} from '../Model'
 
const OptionsView = () => {
  console.log('[OptionsView].Begin')

  enum Modes {
    Init,
    Loading,
    Options,
    Intake,
    CentralCommand,
    MissionControl,
    Estuary,
    Post
  }
 
  const [CommandStructure, CommandStructureSet] = 
    useState(ModelCommandStructureDefault)
  const [Visible, VisibleSet] = useState(false)
  const [State, StateSet] = useState(0)
  const [IsSaving, IsSavingSet] = useState(false)
  const [Mode, ModeSet] = useState(Modes.Options)
  const [Options, OptionsSet] = 
    useState<ModelOptions | null>(ModelOptionsDefault)

  const SaveButtonStyles = 'block mt-10 border-none outline-none'
                         + 'rounded-md p-4 bg-violet-500 font-bold'
                         + 'cursor-pointer';
  
  useEffect(() => {
    console.log('[useEffect]')
    ModelOptionsGet().then(options_new => OptionsSet(options_new))
  }, [])
  
  const ReduceState = (state, action) => {
    let type = action.type
    console.log('[OptionsView.ReduceState]: ' + type)
    switch (type) {
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

  const [AppState, Dispatch] = useReducer(ReduceState, { prop1: null, prop2: null})

  if (Options == null || Options == undefined) return null
  
  return (
    <div id='Root'>
      <div id='RootMidground' />
      <div id='RootForeground' />
      <div id='RootBackground'>
        <div id='PageHeader'>
          <img id='PageImage' src='./Icon128.png' />
          <div>
        </div>
        <div id='PageMain'>

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

/*
          { Mode == Modes.Intake &&
            <Tooltip title="Liaison">
              <Button><JoinLeftIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Intake &&
            <Tooltip title="Liaison">
              <Button onClick={() => ModeSet(Modes.Intake)}>
                <JoinLeftIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.CentralCommand &&
            <Tooltip title="Central Command">
              <Button><JoinInnerIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.CentralCommand &&
            <Tooltip title="Central Command">
              <Button onClick={() => ModeSet(Modes.CentralCommand)}>
                <JoinInnerIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.MissionControl &&
            <Tooltip title="Mission Control">
              <Button><JoinRightIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.MissionControl &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.MissionControl)}>
                <JoinRightIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.Estuary &&
            <Tooltip title="Mission Control">
              <Button><JoinFullIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Estuary &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.Estuary)}>
                <JoinFullIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.Post &&
            <Tooltip title="Post">
              <Button><PostAddIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Post &&
            <Tooltip title="Post">
              <Button onClick={() => ModeSet(Modes.Post)}>
                <PostAddIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.Options &&
            <Tooltip title="Mission Control">
              <Button><SettingsIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Options &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.Options)}>
                <SettingsIcon /></Button>
            </Tooltip>
          }
*/