import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherData {
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind :{speed:number ; deg:number}
  name: string;
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

interface FetchWeatherArgs {
  lat: number;
  lng: number;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<
  WeatherData,           
  FetchWeatherArgs,       
  { rejectValue: string } 
>('weather/fetchWeather', async ({ lat, lng }, thunkAPI) => {
  try {
    const response = await fetch(`/api/weather?lat=${lat}&lng=${lng}`);
    const result = await response.json()
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue('فشل في جلب بيانات الطقس');
  }
});

// إنشاء slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {}, // لا نحتاج ريدوسر عادي الآن
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'حدث خطأ غير معروف';
      });
  },
});

export default weatherSlice.reducer;
