"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import * as React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/butto/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/butto/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "var(--chart-1)",
  },
  february: {
    label: "February",
    color: "var(--chart-2)",
  },
  march: {
    label: "March",
    color: "var(--chart-3)",
  },
  april: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const ChartHumility: React.FC = () => {
  const forecast = useSelector(
    (state: RootState) => state.WeatherDays.data || []
  );

  // فلترة للتأكد من عدم وجود قيم null أو undefined
  const rainData = forecast
    .filter((day) => day.totalRain != null)
    .map((day) => ({
      name: day.date,
      value: day.totalRain,
    }));

  const hasRain = rainData.some((day) => day.value > 0);

  console.log("Rain Data:", rainData); // للتحقق أثناء التطوير

  return (
    <Card className="flex flex-col pt-3 border-none gap-0 h-full w-full">
      <CardHeader className="items-center p-0 px-3">
        <CardTitle>Rain Forecast</CardTitle>
        <CardDescription>
          Expected rainfall over the next 5 days
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-1">
        {hasRain ? (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="visitors"
                      nameKey="value"
                      indicator="line"
                      labelFormatter={(_, payload) => {
                        if (!payload || !payload[0]) return "";
                        const key = payload[0]
                          .dataKey as keyof typeof chartConfig;
                        return chartConfig[key]?.label ?? "";
                      }}
                    />
                  }
                />
                <Pie data={rainData} dataKey="value" outerRadius="60%" />
                <Pie
                  data={rainData}
                  dataKey="value"
                  innerRadius="65%"
                  outerRadius="80%"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground text-sm">
            <img src="/photo/Rain.svg" className="w-20" alt="No rain" />
            <p>No rain expected in the next 5 days.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartHumility;
