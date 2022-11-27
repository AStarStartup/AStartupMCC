import { ModelDataOptions } from '../../Mutators/ModelData'
import React, { Dispatch, useState } from "react"
import { Box, Button, Grid, TextField, Typography } 
  from '@material-ui/core'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const OperationsManager = (props: {
  options: ModelDataOptions,
  reduce_state: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, reduce_state, is_saving } = props
  if (options == undefined || reduce_state == undefined) return null
  let {content_scripts, metric_units, crew, username } = options
  if (username     == undefined) return null
  
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant='h2'>Operations</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reduce_state({ type: 'OptionsSave', 
              values: {...options, } })}
            disabled={ is_saving }>
              { is_saving ? 'Save' : 'Saving...' }
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default OperationsManager
