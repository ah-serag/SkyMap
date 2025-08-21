"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex items-center p-10 justify-center w-full h-full">

       <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="  "
      captionLayout="dropdown"
    />
    </div>
   
  )
}
