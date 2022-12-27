import { ModelDataOptions } from '../../Mutators/ModelData'
import React, { Dispatch, useState } from "react"
import { Box, Button, Grid, TextField, Typography } 
  from '@material-ui/core'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const IncidentCommand = (props: {
  command_structure: Object,
  options: ModelDataOptions,
  dispatch: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, command_structure, dispatch, is_saving } = props
  if (options == undefined || command_structure == undefined || 
      dispatch == undefined) return null
  let { content_scripts, metric_units, crew, username } = options
  if (username     == undefined) return null
  let command_roles = command_structure['command_roles']
  if (command_roles == undefined) return null
  
  const [Role, RoleSet] = useState('Commander')
  console.log("Role: " + Role)

  return (
    <div key="IncidentCommand" 
        style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          { Object.keys(command_roles).map ((key) => (
            <Button key={'IncidentCommandCommandRole' + key} 
              onClick={() => RoleSet(key)}>{key}</Button>
          ))}
        </Grid>
        <Grid item>
          <Typography variant='h2'>Incident Command</Typography>
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

export default IncidentCommand
