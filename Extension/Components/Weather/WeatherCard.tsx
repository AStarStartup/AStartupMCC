import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } 
  from '@material-ui/core'
import { fetchOpenWeatherData, OpenWeatherData, UnitsTemperature } 
  from './OpenWeather'
import './WeatherCard.css'

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    on_delete?: () => void
  }> = ({ children, on_delete }) => {
  return (
    <Card>
      <Box mx='4px' my='16px'>
        <CardContent>
          {children}
        </CardContent>
        <CardActions>{ on_delete && (
          <Button color="secondary" onClick={on_delete}>
            <Typography className="WeatherCardBody">Delete</Typography>
          </Button>) }
        </CardActions>
      </Box>
    </Card>
  )
}

const WeatherCard: React.FC<{
  city: string,
  units_temperature: UnitsTemperature,
  on_delete?: () => void
}> = ({ city, units_temperature, on_delete }) => {
  const [weather_data, set_weather_data] = 
    useState<OpenWeatherData | null>(null)
  const [card_state, card_state_set] = useState<WeatherCardState>("loading")
  useEffect(() => {
    fetchOpenWeatherData(city, units_temperature)
      .then((data) => {
        set_weather_data(data)
        card_state_set("ready")
      })
      .catch((err) => card_state_set("error"))
    }, [city, units_temperature]
  )
  
  if (card_state != "ready")
    return (
      <WeatherCardContainer on_delete={on_delete}>
        <Typography className="WeatherCardTitle">{city}</Typography>
        <Typography className="WeatherCardBody">{ card_state == "loading" ? 
          'Loading...' : 'Error: ' + city + ' is an invalid city.' }
        </Typography>
      </WeatherCardContainer>
    )
  
  if (!weather_data) return (
    <WeatherCardContainer>weather_data was null.</WeatherCardContainer>)

  return (
    <WeatherCardContainer on_delete={on_delete}>
      <Typography className="WeatherCardTitle">{weather_data.name}
      </Typography>
      <Typography variant="body1">{Math.round(weather_data.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weather_data.main.feels_like)}
      </Typography>
    </WeatherCardContainer>)
}

export default WeatherCard
