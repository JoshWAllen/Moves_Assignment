function SearchBox({ formData, setFormData, handleSubmit }) {
  return (
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
          className="shadow appearance-none border rounded bg-blue-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
  );
}

export default SearchBox;
