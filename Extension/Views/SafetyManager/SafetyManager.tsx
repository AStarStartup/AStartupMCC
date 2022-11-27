import { ModelDataOptions } from '../../Mutators/ModelData'
import React, { Dispatch, useState } from "react"
import { Box, Button, Grid, TextField, Typography } 
  from '@material-ui/core'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SafetyManager = (props: {
  options: ModelDataOptions,
  dispatch: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, dispatch, is_saving } = props
  if (options == undefined || dispatch == undefined) return null
  let {content_scripts, metric_units, crew, username } = options
  if (username     == undefined) return null
  
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
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

export default SafetyManager
