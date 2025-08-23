import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store/store';
import axios from 'axios';

// بيانات كل عنصر من عناصر التوقع
interface ForecastEntry {
  dt_txt: string;
  main: { temp: number };
  rain?: { '3h': number }; // <-- كمية الأمطار المتوقعة خلال 3 ساعات
}

// نوع بيانات الـ API
interface WeatherForecastData {
  list: ForecastEntry[];
  city: { name: string };
}

// نوع الحالة
interface ForecastState {
  data: { date: string; avgTemp: number; totalRain: number }[];
  cityName: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  data: [],
  cityName: null,
  loading: false,
  error: null,
};

interface FetchWeatherArgs {
  lat: number;
  lng: number;
}

// async thunk لجلب التوقعات
export const fetchForecast = createAsyncThunk<
  WeatherForecastData,
  FetchWeatherArgs,
  { rejectValue: string }
>('forecast/fetchForecast',
  async ({ lat, lng }, thunkAPI) => {
    if (lat == null || lng == null) {
      return thunkAPI.rejectWithValue('No location clicked');
    }

    try {
      const response = await axios(`/api/weatherDaily?lat=${lat}&lng=${lng}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('');
    }
  }
);

// Slice
const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action: PayloadAction<WeatherForecastData>) => {
        state.loading = false;
        state.cityName = action.payload.city.name;

        const dailyTemps: { [date: string]: number[] } = {};
        const dailyRain: { [date: string]: number } = {};

        action.payload.list.forEach((ele) => {
          const date = ele.dt_txt.split(' ')[0];

          // تجميع درجات الحرارة
          if (!dailyTemps[date]) dailyTemps[date] = [];
          dailyTemps[date].push(ele.main.temp);

          // تجميع كمية الأمطار (قد تكون غير موجودة)
          const rainAmount = ele.rain?.['3h'] || 0;
          if (!dailyRain[date]) dailyRain[date] = 0;
          dailyRain[date] += rainAmount;
        });

        state.data = Object.entries(dailyTemps).map(([date, temps]) => ({
          date,
          avgTemp: Number((temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(1)),
          totalRain: Number((dailyRain[date] ?? 0).toFixed(1)),
        }));
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default forecastSlice.reducer;
