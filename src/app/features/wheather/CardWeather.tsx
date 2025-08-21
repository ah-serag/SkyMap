
'use client'
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome"
import {faWind ,faDroplet} from "@fortawesome/free-solid-svg-icons"
import { fetchWeather } from "./WeatherSlice"
import { SkeletonCard } from "@/app/components/ui/Skelton";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useSelector  , useDispatch} from 'react-redux';
import { AppDispatch } from '@/app/store/store';

const   CardWeather = () => {

  const location = useSelector((state: RootState) => state.location)
  const stateWeahter = useSelector((state :RootState)=> state.Wheather)
  const dispatch = useDispatch<AppDispatch>()
 useEffect(()=>{
  if(location.lat && location.lng){

     dispatch(fetchWeather({lat:location.lat ,lng: location.lng})) 
  }
 },[location.lat])

 useEffect(()=>{
  console.log(stateWeahter)
 },[stateWeahter])

  if (stateWeahter.loading) return <SkeletonCard />
  if (stateWeahter.loading) return <p className="text-xl text-red-600">خطأ في تحميل الطقس</p>



const temp = ()=>{

const temp = stateWeahter?.data?.main?.temp
const description = stateWeahter?.data?.weather[0].description


if(stateWeahter){

 return (
<>
<h1 className="text-nowrap p-2 shadow rounded-[10px]  text-4xl bg-card">{temp} <span className="">C°</span> 
 </h1>
 <p>{description}</p>
</>


 ) 

}
}

const humidity = ()=>{
  const humidity = stateWeahter?.data?.main?.humidity 

  if(humidity){

    return <>
         <FontAwesomeIcon className="bg-bgIcon shadow rounded p-1 px-2 text-chart-2" icon={faDroplet}/>
        <p className="text-sm">humidity : {humidity}%</p>

    </> 
  }
}

const wind = ()=>{
const wind = stateWeahter?.data?.wind?.speed

if(wind){
  return <>
  <FontAwesomeIcon className="bg-card shadow rounded text-chart-2 p-1" icon={faWind}/>
 <p className="text-sm">wind : {wind}m/s</p>
  </>
}
}
const iconWeahter = ()=>{

const icon = stateWeahter?.data?.weather[0].icon

const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
if(icon){
  return <img className="w-25" src={url} alt="" />
}
}



  return (

  <div className="  h-full    gap-3 flex flex-col justify-center   p-4 ">
          {/* // */}
          <div className="flex gap-3 items-center w-full">
            <div className="flex flex-1  gap-2 flex-col text-start">
              {temp()}
            </div>
             <div className=" flex flex-1 justify-center ">
               {iconWeahter()} 
             </div>
          </div>
         
          {/* // */}
          <div className="flex flex-wrap  w-full gap-2 items-center">
             <div className="flex gap-1 items-center">
              {wind()}
            </div>

             <div className="flex gap-1 items-center">
              {humidity()}
             </div>
             
            
          </div>
 </div>
  
  )
}

export default CardWeather
