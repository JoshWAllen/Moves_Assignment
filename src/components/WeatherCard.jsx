import { iconUrlFromCode } from "../helperFunctions";

function WeatherCard({ apiData }) {
  return (
    <div
      id="weather-card"
      className="p-5 h-full flex flex-col items-center bg-blue-300 border border-blue-300 rounded-lg shadow-md transition ease-in-out hover:-translate-y-1 duration-300"
    >
      <h1 className="my-2 text-lg">{`${timeConverter(apiData.dt)}`}</h1>
      <img
        src={iconUrlFromCode(apiData.weather[0].icon)}
        alt=""
        className="w-20"
      />
      <h3 className="text-lg mb-2">{`${apiData.weather[0].description}`}</h3>
      <h3 className="text-md">{`Temp: ${apiData.temp.day}°C`}</h3>
      <h3 className="text-md">{`Min: ${apiData.temp.min}°C`}</h3>
      <h3 className="text-md">{`Max: ${apiData.temp.max}°C`}</h3>
      <h3 className="text-md">{`Wind Speed: ${apiData.wind_speed}m/s`}</h3>
      <h3 className="text-md">{`Humidity: ${apiData.humidity}%`}</h3>
      {apiData.rain && <h3 className="text-md">{`Rain: ${apiData.rain}mm`}</h3>}
      {apiData.snow && <h3 className="text-md">{`Snow: ${apiData.snow}mm`}</h3>}
    </div>
  );
}

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  // const hour = a.getHours();
  // const min = a.getMinutes();
  // const sec = a.getSeconds();
  const time = date + " " + month + " " + year;
  return time;
}

export default WeatherCard;
