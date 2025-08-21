import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../features/mapLocation/locationSlice'
import { locationMiddleware } from '../features/mapLocation/locationSlice'
import WeatherReducer from '../features/wheather/WeatherSlice'
import forecastReducer from '../features/weatherdaily/weatherDaylySlice'

export const store = configureStore({
  reducer: {
    location : locationReducer ,
    Wheather : WeatherReducer,
    WeatherDays : forecastReducer ,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(locationMiddleware)

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch






















