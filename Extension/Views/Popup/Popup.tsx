import "./Popup.css"
import React, { useEffect, useState, useReducer } from 'react'
import { Box, Button, Card, CardContent, Grid, TextField, Typography } 
  from '@material-ui/core'
import { createRoot } from 'react-dom/client'
import { ModelDataOptions, ModelDataOptionsDefault, ModelDataOptionsGet } 
  from '../../Mutators/ModelData'

const Popup = () => {
  console.log('>Popup')
  const [Options, OptionsSet] = useState<ModelDataOptions | null>(
    ModelDataOptionsDefault)
  const [IsSaving, IsSavingSet] = useState(false)
  if (Options == null) return <div>Options == null</div>
  let { mission, project, session, username } = Options

  useEffect(() => {
    console.log('[useEffect]')
    ModelDataOptionsGet().then(options_new => OptionsSet(options_new))
  }, [])

  const SessionFocusChange = (username: string) => {
  }
  /*
      <div>{tags.length}/{Options.session_focus_length_max}</div>*/
  return (
    <div id="_Popup">
      <Typography className="Popup" variant='h1'>{username}</Typography>
      <TextField placeholder=
          "Enter the focus of the session in less than 100 characters..."
        value={ Options.username }
        onChange={ (event) => SessionFocusChange(event.target.value) }
        disabled={ IsSaving }
      />
      <Typography className="Popup" variant='h2'>Session #{session}</Typography>
      <Typography className="Popup" variant='h3'>{project}</Typography>
      <Typography className="Popup" variant='h4'>Mission #{mission}</Typography>
    </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
