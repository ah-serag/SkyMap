import { createSlice , PayloadAction ,Middleware } from "@reduxjs/toolkit";


interface locationState {
    lat : number | null 
    lng : number | null 
}


let initialState:locationState = {lat:null , lng : null} ;



try {
  const savedLocation = localStorage.getItem("location");

  if (savedLocation) {
    const parsed = JSON.parse(savedLocation);
    initialState = parsed;
    
   }


} catch (error) {
  console.warn("خطأ في قراءة بيانات location من localStorage", error);
}



export const locationMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (setLocation.match(action)) {
    localStorage.setItem("location", JSON.stringify(state.location));
 
  }

  return result;
};


const LocationSlice = createSlice({

name: "Location",
initialState,
reducers :{
  setLocation : (state , action :PayloadAction<{lat :number ,lng:number}>) =>{
    state.lat = action.payload.lat 
    state.lng = action.payload.lng
  }
}

})


export const {setLocation} = LocationSlice.actions ;
export default LocationSlice.reducer
