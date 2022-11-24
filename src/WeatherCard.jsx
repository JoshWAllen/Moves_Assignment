function WeatherCard({ apiData }) {
  return (
    <div
      id="weather-card"
      className="w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow-md"
    >
      <h1>{`${timeConverter(apiData.dt)}`}</h1>
      <h3 id="description">{`${apiData.weather[0].description}`}</h3>
      <h3 id="cur-temp">{`Temperature: ${apiData.temp.day}°C`}</h3>
      <h3 id="min-temp">{`Min Temperature: ${apiData.temp.min}°C`}</h3>
      <h3 id="max-temp">{`Max Temperature: ${apiData.temp.max}°C`}</h3>
      <h3 id="wind-speed">{`Wind Speed: ${apiData.wind_speed}m/s`}</h3>
      <h3 id="Humidity">{`Humidity: ${apiData.humidity}%`}</h3>
      {apiData.rain && <h3 id="Rain">{`Rain: ${apiData.rain}mm`}</h3>}
      {apiData.snow && <h3 id="Snow">{`Snow: ${apiData.snow}mm`}</h3>}
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
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export default WeatherCard;
