'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

function degToCompass(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export default function WindRoseChart() {
  const weather = useSelector((state: RootState) => state.Wheather);
  const windDeg = weather?.data?.wind?.deg ?? 0;
  const windSpeed = weather?.data?.wind?.speed ?? 0;
  const compass = degToCompass(windDeg);

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const windData = directions.map((dir) => ({
    direction: dir,
    speed: dir === compass ? windSpeed : 0,
  }));

  return (
    <div className="relative w-full h-full p-2 ">
      <h2 className="text-md font-semibold  ">
        Wind Speed & Direction
      </h2>
      

      {/* سهم الاتجاه */}
      <div
        className="absolute left-1/2 top-1/2 z-20"
        style={{
          transform: `translate(-50%, -50%) rotate(${windDeg}deg)`,
        }}
      >
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[24px] border-l-transparent border-r-transparent border-b-blue-600" />
      </div>

      {/* نص السرعة
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-sm font-medium text-blue-600 z-30">
        {windSpeed.toFixed(1)} m/s
      </div> */}

      <ResponsiveContainer width="100%" height="90%">
        <RadarChart outerRadius="80%" data={windData}>
          <PolarGrid stroke="var(--color-primary)" />
          <PolarAngleAxis dataKey="direction" stroke="var(--color-primary)" />
          <Radar
            name="Wind"
            dataKey="speed"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
