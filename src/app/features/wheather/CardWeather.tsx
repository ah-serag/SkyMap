'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons"
import { fetchWeather } from "./WeatherSlice"
import { SkeletonCard } from "@/app/components/ui/Skelton";
import { RootState, AppDispatch } from "@/app/store/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const CardWeather = () => {
  const location = useSelector((state: RootState) => state.location)
  const stateWeather = useSelector((state: RootState) => state.Wheather)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (location.lat && location.lng) {
      dispatch(fetchWeather({ lat: location.lat, lng: location.lng }))
    }
  }, [location.lat, location.lng, dispatch])

  // No Location
  if (!location.lat || !location.lng) {
    return (
 <div className="text-center p-4 my-6 ">
  <h2 className="text-base font-medium leading-relaxed">
    Our app depends on your <span className="font-semibold text-blue-600"> location </span>  
     to deliver <span className="text-blue-500">precise weather updates</span>.  
    <br />
    <span className="text-sm">
      Please enable location services to continue.
    </span>
  </h2>
</div>
    )
  }

  //  Loading
  if (stateWeather.loading) return <SkeletonCard />

  // Error
  if (stateWeather.error) {
            
    return <p className="text-xl p-4 h-full flex items-center ">Error loading weather data please : check internet  </p>
  }

  // 🔹 عناصر الطقس
  const renderTemp = () => {
    const temp = stateWeather?.data?.main?.temp
    const description = stateWeather?.data?.weather?.[0]?.description

    if (temp) {
      return (
        <>
          <h1 className="p-2 shadow rounded-[10px] text-3xl bg-card ">
            {temp} <span>C°</span>
          </h1>
          <p className="text-sm capitalize">{description}</p>
        </>
      )
    }
  }

  const renderHumidity = () => {
    const humidity = stateWeather?.data?.main?.humidity
    if (humidity) {
      return (
        <>
          <FontAwesomeIcon className="bg-bgIcon shadow rounded p-1 px-2 text-chart-2" icon={faDroplet} />
          <p className="text-sm">Humidity: {humidity}%</p>
        </>
      )
    }
  }

  const renderWind = () => {
    const wind = stateWeather?.data?.wind?.speed
    if (wind) {
      return (
        <>
          <FontAwesomeIcon className="bg-card shadow rounded text-chart-2 p-1" icon={faWind} />
          <p className="text-sm">Wind: {wind} m/s</p>
        </>
      )
    }
  }

  const renderIcon = () => {
    const icon = stateWeather?.data?.weather?.[0]?.icon
    if (icon) {
      const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
      return <img className="w-20 h-20" src={url} alt="weather-icon" />
    }
  }

  return (
    <div className="h-full gap-3 flex flex-col justify-center p-4">
      {/* Temperature + Icon */}
      <div className="flex gap-3 items-center w-full">
        <div className="flex flex-1 gap-2 flex-col text-start">
          {renderTemp()}
        </div>
        <div className="flex flex-1 justify-center">
          {renderIcon()}
        </div>
      </div>

      {/* Wind + Humidity */}
      <div className="flex flex-wrap w-full gap-4 items-center mt-2">
        <div className="flex gap-2 items-center">
          {renderWind()}
        </div>
        <div className="flex gap-2 items-center">
          {renderHumidity()}
        </div>
      </div>
    </div>
  )
}

export default CardWeather
