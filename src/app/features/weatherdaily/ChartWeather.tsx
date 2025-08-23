"use client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { RootState } from "@/app/store/store";
import { fetchForecast } from "./weatherDaylySlice";
import { useEffect } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/butto/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/butto/chart";

import { SkeletonCard } from "@/app/components/ui/Skelton";

const ChartWeather = () => {
  const WeatherDays = useSelector((state: RootState) => state.WeatherDays);
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  useEffect(() => {
    if (location.lat && location.lng) {
      dispatch(fetchForecast({ lat: location.lat, lng: location.lng }));
    }
  }, [location, dispatch]);

  // تأكد من عدم وجود loading أو error
  if (WeatherDays.loading) return <SkeletonCard />;
  if (WeatherDays.error)
    return <p className="p-12 text-2xl"> {WeatherDays.error}</p>;

  // استخدم البيانات الحقيقية
  const data =
    WeatherDays.data?.map((item) => ({
      date: item.date,
      avgTemp: item.avgTemp,
    })) || [];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-full flex flex-col  overflow-hidden  gap-2 pt-4 ">
      <CardHeader className="px-4 gap-1 text-start">
        <CardTitle className="text-base md:text-md">
          Temperature Forecast
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Average temperatures for the next 5 days.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="avgTemp"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.5}
                stroke="var(--color-desktop)"
                height={100}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default ChartWeather;
