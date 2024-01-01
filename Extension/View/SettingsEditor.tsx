// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import { ModelAppState, ModelConfig } from '../Model'
import React, { Dispatch, useState } from "react";

const ConfigEditor = (props: {
  options: ModelConfig,
  dispatch: Dispatch<any>,
  is_saving: boolean,
}) => {
  let { options, dispatch, is_saving } = props;
  if (options == undefined || dispatch == undefined) return null;
  let { content_scripts, me, metric_units } = options;
  if (content_scripts == undefined || metric_units == undefined || 
      me     == undefined) return null

  const [ContentScripts, ContentScriptsSet] = 
    useState(content_scripts == true ? 'Enabled' : 'Disabled')
  const [MetricUnits, MetricUnitsSet] = 
    useState(metric_units == true ? 'Standard' : 'Imperial')

  const UsernameChange = (me: string) => {
  }
  
  const ContentScriptsChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    ContentScriptsSet(value == 'Enabled' ? 'Disabled' : 'Enabled')
  }
  
  const MetricUnitsChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    MetricUnitsSet( 'Standard' ? 'Imperial' : 'Standard')
  }

  return <div className='flex justify-center h-full'>
    <h2>Options</h2>
    <span>Username</span>
    <input type='text' placeholder="Enter your GitHub me..."
      value={options.me}
      onChange={(event) => 
        UsernameChange(event.target.value)}
      disabled={ is_saving }
    />
    <div id='UseContentScripts'>
      <label htmlFor="UseContentScriptsCB">Use content scripts: </label>
      <input type="checkbox" id="UseContentScriptsCB" name="scales" checked />
    </div>
      <div id='UseStandardMetricUnits'>
        <label htmlFor="UseStandardMetricUnitsCB">Use standard metric units: </label>
        { ContentScripts == 'Enabled' ? (
        <input type="checkbox" id="UseStandardMetricUnitsCB" name="scales" checked />
          ) : (
        <input type="checkbox" id="UseStandardMetricUnitsCB" name="scales" />
        )}
      </div>
    <button
      color="primary"
      onClick={() => dispatch({ type: 'OptionsSave', 
        values: {...options, } })}
      disabled={ is_saving }>
        { is_saving ? 'Save' : 'Saving...' }
    </button>
  </div>
}

export default ConfigEditor
