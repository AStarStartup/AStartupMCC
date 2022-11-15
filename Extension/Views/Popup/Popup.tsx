import "./Popup.css"
import React, { useEffect, useState, useReducer } from 'react'
import { Box, Button, Card, CardContent, Grid, TextField, Typography
       } from '@material-ui/core'
import { createRoot } from 'react-dom/client'
import { ModelDataOptions, ModelDataOptionsGet } from '../../Mutators/ModelData'

 
const Popup = () => {

  const [options, options_set] = useState<ModelDataOptions | null>(null)

  useEffect(() => {
    console.log('[useEffect]')
    ModelDataOptionsGet().then(options_new => options_set(options_new))
  }, [])


  return (
    <div id="Popup">
      <Typography variant='h1'></Typography>
    </div>
  )
}
 
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)
