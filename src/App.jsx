import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import WeatherCard from "./WeatherCard";
import SearchResult from "./SearchResult";

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

  const locationResults = searchResults.map((result) => {
    return (
      <SearchResult
        key={nanoid()}
        location={result}
        handleClick={clickLocation}
      />
    );
  });

  const weatherCards =
    data.daily !== undefined
      ? data.daily.map((item) => {
          return (
            <div key={item.dt} className="w-max flex-shrink-0">
              <WeatherCard apiData={item} />
            </div>
          );
        })
      : [];

  return (
    <div
      id="app"
      className="bg-white text-black text-center w-screen h-screen p-4"
    >
      <form
        id="search-form"
        onSubmit={handleSubmit}
        className="w-4/5 mx-auto my-2 sm:w-2/3 lg:w-1/2"
      >
        <label
          htmlFor="search-location"
          className="block text-gray-700 text-sm font-bold"
        >
          Search City or Zipcode
        </label>{" "}
        <div className="flex">
          <input
            id="search-location"
            type="search"
            placeholder="City/zipcode, Country Code"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFormData(e.target.value)}
            value={formData}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </form>

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
              <div className="w-11/12 mx-auto">{locationResults}</div>
            </>
          )}
        </>
      ) : (
        <>
          {data.current !== undefined && data !== null && (
            <div className="bg-gray-200 flex flex-row justify-around items-center my-1 p-2 rounded">
              <h1 className="flex-1">
                {location.name}
                {location.state ? ", " + location.state : ""}
                {location.zip ? ", " + location.zip : ""}
              </h1>
              <h3 className="flex-1">{location.country}</h3>
              <div className="coords flex-1 flex flex-col items-start">
                <h3 className="flex-1">lat: {location.lat}</h3>
                <h3 className="flex-1">lon: {location.lon}</h3>
              </div>
            </div>
          )}
          {data.current !== undefined && data !== null && (
            <div id="weather-current" className="">
              <h1>Current Weather</h1>
              <h3 id="description">{`${data.current.weather[0].description}`}</h3>
              <h3 id="cur-temp">{`Current Temperature: ${data.current.temp}°C`}</h3>
              <h3 id="wind-speed">{`Wind Speed: ${data.current.wind_speed}m/s`}</h3>
              <h3 id="Humidity">{`Humidity: ${data.current.humidity}%`}</h3>
            </div>
          )}
          {data && (
            <div className="flex overflow-x-scroll gap-x-1 pb-4">
              {weatherCards}
            </div>
          )}{" "}
          {/* <pre className="text-left w-min mx-auto">
            Data: {JSON.stringify(data, null, "\t")}
          </pre> */}
        </>
      )}
    </div>
  );
}

export default App;
