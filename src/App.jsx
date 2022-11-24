import { useState } from "react";
import { nanoid } from "nanoid";
import { iconUrlFromCode } from "./helperFunctions";
import WeatherCard from "./components/WeatherCard";
import SearchResult from "./components/SearchResult";
import SearchBox from "./components/SearchBox";
import {
  TbMapPin,
  TbWorldLatitude,
  TbWorldLongitude,
  TbWind,
} from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY; //stored in environment variable

  //Toggle search results UI and specific weather info UI - could replace with react router
  const [showSearchResults, setShowSearchResults] = useState(true);

  //Array of location objects returned from Geocoding API using city names and zip
  const [searchResults, setSearchResults] = useState([]);

  //Holds searchbox form data - creates controlled input (controlled component)
  const [formData, setFormData] = useState("");
  const [location, setLocation] = useState({
    name: "",
    country: "",
    state: "",
    zip: "",
    lat: "",
    lon: "",
  });

  //Holds location data - JSON from openweather API response
  const [data, setData] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${formData}&limit=5&appid=${API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("City Name Results: ", data);
        if (data != null && !data.cod) setSearchResults(data);
        return fetch(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${formData}&appid=${API_KEY}`
        );
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Zipcode results: ", data);
        if (data != null && !data.cod)
          setSearchResults((prevData) => [...prevData, data]);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setShowSearchResults(true);
  }

  function clickLocation(location) {
    setLocation({
      name: location.name,
      country: location.country,
      state: location.state ? location.state : "",
      zip: location.zip ? location.zip : "",
      lat: location.lat,
      lon: location.lon,
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data: ", data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setData(null);
      });
    setShowSearchResults(false);
  }

  //Creates SearchResult component for every object in searchResults state
  const locationResults = searchResults.map((result) => {
    return (
      <SearchResult
        key={nanoid()}
        location={result}
        handleClick={clickLocation}
      />
    );
  });

  //Creates WeatherCard component for every object in the daily field of data
  const weatherCards =
    data.daily !== undefined
      ? data.daily.map((item) => {
          return (
            <div
              key={item.dt}
              className="h-full flex-grow basis-1/3 xl:basis-1/5"
            >
              <WeatherCard apiData={item} />
            </div>
          );
        })
      : [];

  return (
    <div
      id="app"
      className="bg-gradient-to-b from-blue-300 to-cyan-300 text-gray-900 text-center w-full h-screen px-4 py-10 overflow-scroll"
    >
      {" "}
      <div>
        <SearchBox
          formdata={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />

        {showSearchResults ? (
          <>
            {searchResults.length === 0 ? (
              <>
                <div></div>
              </>
            ) : (
              <>
                {" "}
                <div className="text-left w-max mx-auto">Search Results:</div>
                <div className="w-11/12 mx-auto lg:w-1/2">
                  {locationResults}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div>
              {data.current !== undefined && data !== null && (
                <div className="flex flex-row justify-between items-center w-full mx-auto my-1 p-2 rounded md:w-3/4 lg:w-1/2">
                  <div className="flex flex-row">
                    <TbMapPin size="24" />
                    <h1 className="flex-1">
                      {location.name}
                      {location.state ? ", " + location.state : ""}
                      {location.zip ? ", " + location.zip : ""}
                      {", " + location.country}
                    </h1>
                  </div>
                  <div className="coords flex flex-col items-start">
                    <div className="flex flex-row items-center">
                      <TbWorldLatitude size="20" />
                      <h3 className="flex-1">lat: {location.lat}</h3>
                    </div>
                    <div className="flex flex-row items-center">
                      <TbWorldLongitude size="20" />
                      <h3 className="flex-1">lon: {location.lon}</h3>
                    </div>
                  </div>
                </div>
              )}
              {data.current !== undefined && data !== null && (
                <div
                  id="weather-current"
                  className="flex flex-col items-center my-10"
                >
                  <h1
                    id="cur-temp"
                    className="text-7xl"
                  >{`${data.current.temp}°C`}</h1>
                  <div className="flex flex-row items-center">
                    <h3
                      id="description"
                      className="text-2xl"
                    >{`${data.current.weather[0].description}`}</h3>
                    <img
                      src={iconUrlFromCode(data.current.weather[0].icon)}
                      alt=""
                      className="w-30"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-around w-full sm:w-1/2 lg:w-1/3">
                    <div className="flex flex-row items-center">
                      <TbWind size="20" />
                      <h3 id="wind-speed">{`Wind Speed: ${data.current.wind_speed}m/s`}</h3>
                    </div>
                    <div className="flex flex-row items-center">
                      <WiHumidity size="28" />
                      <h3 id="Humidity">{`Humidity: ${data.current.humidity}%`}</h3>
                    </div>
                  </div>
                </div>
              )}
              <h1 className="mt-20 mb-4 text-xl">Weekly Forecast</h1>
              {data && (
                <div className="w-full mx-auto px-3 flex flex-col gap-5 md:flex-row md:flex-wrap">
                  {weatherCards}
                </div>
              )}{" "}
              {/* <pre className="text-left w-min mx-auto">
            Data: {JSON.stringify(data, null, "\t")}
          </pre> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
