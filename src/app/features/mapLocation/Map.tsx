"use client";

import { MapContainer, TileLayer, useMapEvents ,Marker ,Popup  } from 'react-leaflet'
import { useDispatch ,useSelector } from 'react-redux'
import 'leaflet/dist/leaflet.css'
import { setLocation } from './locationSlice'
import { RootState } from '@/app/store/store'
import L from 'leaflet'






const Map: React.FC = () => {


  const dispatch = useDispatch()
  const location = useSelector((state : RootState)=> state.location)
  const checkLocation = location.lat != null  && location.lng != null


// icon farm Location 
var greenIcon = L.icon({
    iconUrl: '/photo/AgroMap.svg',
    shadowUrl: '/Photo/AgroShadowMap.svg',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [30, 60],  // the same for the shadow
    popupAnchor:  [-5, -60] // point from which the popup should open relative to the iconAnchor
});



  function LocationMarker() {
     useMapEvents({

      click(e) {
        const { latlng } = e
        dispatch(setLocation({lat : latlng.lat ,lng :latlng.lng}))

      },
  
    })


    return checkLocation ? (
        <Marker position ={[location.lat as number, location.lng as number]} icon={greenIcon}>
         <Popup  className='gap-0 w-fit'>
           </Popup>
        </Marker>
    ) : null
    
    
  }





let mapCenter: [number, number] = checkLocation
  ? [location.lat as number, location.lng as number]
  : [29.5, 42.0];
   
return (
    <>
    <MapContainer
        center={mapCenter}
        zoom={checkLocation ? 17 : 5}
        scrollWheelZoom={true}
        style={{ height: '100%',zIndex:15  , width: '100%' }}
        className='rounded-xl '
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

    </>
    
 
  )
}

export default Map
