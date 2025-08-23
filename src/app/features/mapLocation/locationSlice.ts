'use client';

import { createSlice, PayloadAction, Middleware } from "@reduxjs/toolkit";

interface LocationState {
  lat: number | null;
  lng: number | null;
}

let initialState: LocationState = { lat: null, lng: null };

try {
  if (typeof window !== "undefined") {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      initialState = JSON.parse(savedLocation);
    }
  }
} catch (error) {
  console.warn("خطأ في قراءة بيانات location من localStorage", error);
}

export const locationMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (setLocation.match(action)) {
    if (typeof window !== "undefined") {
      localStorage.setItem("location", JSON.stringify(state.location));
    }
  }

  return result;
};

const LocationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    }
  }
});

export const { setLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
