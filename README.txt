Notes for the assignment

Todo List:

-Add API key to environment variable so that it is not exposed to the public.
-Make request and console log to see the json response
-Show current weather
-Show daily forecast - list of card components
-Make search by city and zipcode work
-Style with some icons


Design Decisions:

For search box, first implementation makes an API request on every change using onChange
event handler. Should probably have submit button so API is not spammed and only searches
when the user is done typing their desired location. 
Update- this was changed to only make an api request when user clicks the submit button

Update: realized I was using the wrong API so I will refactor the code to work for that

Used geocoding api to convert city name and zipcode into longitude and latitude to be used in
the actual weather api request. This was because the weather api depracated the automatic
geocoding feature.

When the user types into the search box and clicks search, the geocoding api will be
fetched to get a list of possible locations. Each location will have a clickable div 
with info such as city name, country, and coordinates so the user can choose their 
actual location. When one of the divs is clicked, the location state will be updated
and triggers the weather api fetch. 

Tools Used:

React 
Vite - to create react project (instead of create-react-app)
Tailwind CSS - utility classes that make styling components much faster
Dotenv package - hide api key in environment variable.
