function SearchResult({ location, handleClick }) {
  return (
    <div
      className="bg-blue-300 flex flex-row justify-around items-center my-1 p-2 rounded hover:bg-blue-400 hover:cursor-pointer"
      onClick={() => handleClick(location)}
    >
      <h1 className="flex-1">
        {location.name}
        {location.state ? ", " + location.state : ""}
        {location.zip ? ", " + location.zip : ""}
        {", " + location.country}
      </h1>
      <div className="coords flex-1 flex flex-col items-start">
        <h3 className="flex-1">lat: {location.lat}</h3>
        <h3 className="flex-1">lon: {location.lon}</h3>
      </div>
    </div>
  );
}

export default SearchResult;
