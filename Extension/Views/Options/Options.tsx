import React, { useEffect, useState, useReducer} from 'react'
import { createRoot } from 'react-dom/client'
import { Box, Button, Card, CardContent, Grid, TextField, Typography } 
  from '@material-ui/core'
import SettingsIcon from '@mui/icons-material/settings';
import Tooltip from '@mui/material/Tooltip'
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import TaskIcon from '@mui/icons-material/Task';

import OptionsEditor from '../../Components/OptionsEditor'
import { ModelDataOptions, ModelDataOptionsGet } 
  from '../../Mutators/ModelData'
 
const OptionsView = () => {
  console.log('[OptionsView].Begin')

  enum Modes {
    Init,
    Loading,
    Options,
    Intake,
    CentralCommand,
    MissionControl,
    PublicLiaison
  }

  const [Visible, VisibleSet] = useState(false)
  const [State, StateSet] = useState(0)
  const [IsSaving, IsSavingSet] = useState(false)
  const [Mode, ModeSet] = useState(Modes.Options)
  const [Options, OptionsSet] = useState<ModelDataOptions | null>(null)
  
  useEffect(() => {
    console.log('[useEffect]')
    ModelDataOptionsGet().then(options_new => OptionsSet(options_new))
  }, [])

  const ReduceState = (state, action) => {
    let type = action.type
    console.log('[OptionsView.ReduceState]: ' + type)
    switch (type) {
      case "Options":
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

  const [App, Dispatch] = useReducer(ReduceState, { prop1: null, prop2: null})

  if (Options == null || Options == undefined) return null
  
  return (
    <div id='Root'>
      <div id="RootMidground" />
      <div id="RootForeground" />
      <div id="RootBackground">
        <div id="PageHeader">
          <img id="PageImage" src="./Icon128.png" />
          <div>
          { Mode == Modes.Intake &&
            <Tooltip title="Options">
              <Button disabled><JoinLeftIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Intake &&
            <Tooltip title="Options">
              <Button onClick={() => ModeSet(Modes.Intake)}>
                <JoinLeftIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.CentralCommand &&
            <Tooltip title="Central Command">
              <Button disabled><JoinInnerIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.CentralCommand &&
            <Tooltip title="Central Command">
              <Button onClick={() => ModeSet(Modes.CentralCommand)}>
                <JoinInnerIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.MissionControl &&
            <Tooltip title="Mission Control">
              <Button disabled><JoinRightIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.MissionControl &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.MissionControl)}>
                <JoinRightIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.PublicLiaison &&
            <Tooltip title="Mission Control">
              <Button disabled><JoinFullIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.PublicLiaison &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.PublicLiaison)}>
                <JoinFullIcon /></Button>
            </Tooltip>
          }{ Mode == Modes.Options &&
            <Tooltip title="Mission Control">
              <Button disabled><SettingsIcon /></Button>
            </Tooltip>
          }{ Mode != Modes.Options &&
            <Tooltip title="Mission Control">
              <Button onClick={() => ModeSet(Modes.Options)}>
                <SettingsIcon /></Button>
            </Tooltip>
          }
        </div>
      </div>
      { Mode == Modes.Options &&
      <Box mx="10%" my="2%">
        <Card>
          <CardContent>
            <OptionsEditor options={Options} dispatch={Dispatch} 
              is_saving={IsSaving} />
          </CardContent>
        </Card>
      </Box>
      }
    </div>
  </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<OptionsView />)
