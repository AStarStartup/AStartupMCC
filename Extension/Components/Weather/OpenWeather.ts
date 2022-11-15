const OPEN_WEATHER_API_KEY = "00906078ec85e202bfe97716ae365d56"

export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export type UnitsTemperature = 'metric' | 'imperial'

export async function fetchOpenWeatherData(city: string,
  units_temperature: UnitsTemperature): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units_temperature}&appid=${OPEN_WEATHER_API_KEY}`
  )

  if(!res.ok) {
    throw new Error('City not found')
  }

  const data: OpenWeatherData = await res.json()
  return data
}
