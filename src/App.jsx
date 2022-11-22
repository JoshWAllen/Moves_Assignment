import { useState } from "react";
import { useEffect } from "react";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [location, setLocation] = useState("Kingston, CA");
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </div>
  );
}

export default App;
