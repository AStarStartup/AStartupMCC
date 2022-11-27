import { ModelDataOptions } from '../../Mutators/ModelData'
import React, { Dispatch, useState } from "react"
import { Box, Button, Grid, TextField, Typography } 
  from '@material-ui/core'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { AForm } from '../../Mutators/ModelData'

export const ICSForms = {
  ['ICS 201']: {
    title: 'Incident Briefing',
    description: '',
    instructions: '',
    root: {},
    log: {}
  },
  ['ICS 202']: {
    title: 'Incident Objectives',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 203']: {
    title: 'Organization Assignment List',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 204']: {
    title: 'Assignment List',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 205']: {
    title: 'Incident Radio Communications Plan',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 205A']: {
    title: 'Communications List',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 206']: {
    title: 'Medical Plan',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 207']: {
    title: 'Incident Organization Chart',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 208']: {
    title: 'Safety Message/Plan',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 209']: {
    title: 'Incident Summary',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 210']: {
    title: 'Resource Status Change',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 211']: {
    title: 'Incident Check-In List',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 213']: {
    title: 'General Message',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 214']: {
    title: 'Activity Log',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 215']: {
    title: 'Operational Planning Worksheet',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 215A']: {
    title: 'Incident Action Plan Safety Analysis',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 218']: {
    title: 'Support Vehicle/Equipment Inventory',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 219']: {
    title: 'Resource Status Cards (T-Cards)',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 220']: {
    title: 'Air Operations Summary Worksheet',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 221']: {
    title: 'Demobilization Check-Out',
    description: '',
    instructions: '',
    log: {}
  },
  ['ICS 225']: {
    title: 'Incident Personnel Performance Rating',
    description: '',
    instructions: '',
    log: {}
  },
  ['Form XYZ']: {
    title: 'Incident Personnel Performance Rating',
    description: '',
    instructions: '',
    log: {}
  }
}

const ICSFormManager = (props: {
  options: ModelDataOptions,
  dispatch: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, dispatch, is_saving } = props
  if (options == undefined || dispatch == undefined) return null
  let {content_scripts, metric_units, crew, username } = options
  if (username     == undefined) return null
  
  return (
    <div key="ICSFormManager" 
        style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant='h2'>Safety</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: 'OptionsSave', 
              values: {...options, } })}
            disabled={ is_saving }>
              { is_saving ? 'Save' : 'Saving...' }
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default ICSFormManager
