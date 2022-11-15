import { ModelDataOptions } from '../../Mutators/ModelData'
import React, { Dispatch, useState } from "react"
import { Box, Button, Grid, TextField, Typography } 
  from '@material-ui/core'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const OnOffMarks = [
  {
    value: 0,
    label: 'Off',
  },
  {
    value: 1,
    label: 'On',
  }
];

const OptionsEditor = (props: {
  options: ModelDataOptions,
  dispatch: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, dispatch, is_saving } = props
  if (options == undefined || dispatch == undefined) return null
  let {content_scripts, metric_units, crew, username } = options
  if (content_scripts == undefined || metric_units == undefined || 
      crew            == undefined || username     == undefined) return null

  const [ContentScripts, ContentScriptsSet] = 
    useState(content_scripts == true ? 'Enabled' : 'Disabled')
  const [MetricUnits, MetricUnitsSet] = 
    useState(metric_units == true ? 'Standard' : 'Imperial')
  const [Crew, CrewSet] = useState<string>(crew)
  const [Username, UsernameSet] = useState<string>(username)

  const UsernameChange = (username: string) => {
  }
  
  const ContentScriptsChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    ContentScriptsSet(value == 'Enabled' ? 'Disabled' : 'Enabled');
  };
  
  const MetricUnitsChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    ContentScriptsSet( 'Standard' ? 'Imperial' : 'Standard');
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant='h2'>Options</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Username</Typography>
          <TextField placeholder="Enter your GitHub username..."
            value={options.username}
            onChange={(event) => 
              UsernameChange(event.target.value)}
            disabled={ is_saving }
          />
        </Grid>
        <Grid item>
          <Grid container style={{margin: 'auto'}}>
            <Grid item xs={4}>
              <Typography className='OptionLabel'>Use content scripts
              </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={3}> 
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} 
                  label={MetricUnits} />
              </FormGroup>
            </Grid>
          </Grid>
          <Box height='16px' />
          <Grid container>
            <Grid item xs={4}>
              <Typography className='OptionLabel'>Metric units</Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox />} 
                  label={ContentScripts} />
              </FormGroup>
            </Grid>
          </Grid>
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

export default OptionsEditor
