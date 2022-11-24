Notes for the assignment


Todo List:

-Add API key to environment variable so that it is not exposed to the public.
-Make search by city or zipcode work


Design Decisions:

For search box, first implementation makes an API request on every change using onChange
event handler. Should probably have submit button so API is not spammed and only searches
when the user is done typing their desired location. 
Update- this was changed to only make an api request when user clicks the submit button

The api does not have explicit temp min and max. Might need to manually loop through 
the hourly temps and find lowest.

The 16 day daily forecast needs a premium api subscription, but the 5day forcast is free so I will 
use that instead.

Since the 5 day forecast is a list of objects all with the same fields,
it makes sense to create a component for each element in the list, essentially
a weather card component to display the predicted weather at all the times.
To make the component easiest to use, I will pass an object as props so the card doesn't take
in a prop for each desired field, which would get lengthy. 

Want to divide 5 day forecast into days. 