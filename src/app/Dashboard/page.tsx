import dynamic from "next/dynamic";
import ChartWeather from "../features/weatherdaily/ChartWeather";
import ChartHumility from "../features/weatherdaily/charthumility";
import WindRoseChart from "../features/wheather/Wind";
import CardWeather from "../features/wheather/CardWeather";

const Map = dynamic(()=> import("../features/mapLocation/Map"))

const DashbordPage = () => {



  return (
<div className="pt-[98px] px-2 pb-2 grid grid-cols-12 sm:h-[100vh] h-[1300px] grid-rows-[repeat(5,minmax(250px,1fr))] sm:grid-rows-12 gap-2">

  <div className="col-span-12 order-1 sm:order-none s  sm:col-span-6 md:col-span-3 sm:row-span-4 md:row-span-5 cardSahdow">
   <CardWeather />
  </div>

  <div className="col-span-12 order-3 sm:order-none s sm:col-span-6 md:col-span-6 sm:row-span-4 md:row-span-5 cardSahdow">
    <ChartWeather />
  </div>

  <div className="col-span-12 order-5  s sm:col-span-6 md:col-span-3 sm:row-span-4 md:row-span-5 sm:order-5 md:order-none cardSahdow">
    <ChartHumility />
  </div>

  <div className="col-span-12 order-2  s sm:row-span-4 md:col-span-9 md:row-span-7  sm:order-none cardSahdow">
    <Map />
  </div>

  <div className="col-span-12 order-4 sm:order-none s sm:col-span-6 md:col-span-3 sm:row-span-4 md:row-span-7 p-3 cardSahdow">
    <WindRoseChart />
  </div>

</div>

  );
};

export default DashbordPage;
