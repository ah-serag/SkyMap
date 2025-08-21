import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {


    
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  const apiKey = process.env.WEATHER_API_KEY;

 const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
  const data = await res.json()
 
  return Response.json(data)
}