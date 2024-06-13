# Weather, News, To-Do App

A web application that provides current weather of the users location, top BBC News and a todo list functionality. This app has detailed features such as temperature, wind speed, humidity, link to more news information along with the ability to manage personal tasks.

**Installation**
Follow these steps to set up the project on your local machine:

1. Clone the repository git clone https://github.com/Sanjida213/geolocation.git 
2. Navigate to the project directory: cd geolocation
3. Install the dependencies: npm install
4. Get a Weather API key at https://www.weatherapi.com/. You'll have to create an account first.
5. Add the API key to a .env file as: VITE_WEATHER_API_KEY=your_api_key
6. Repeat the above API set up with the News API at https://newsapi.org/ 
7. Run the application: npm run dev
8. Open the browser and visit http://localhost:5173 to see the app

**Features**
Current Weather: Displays the current temperature, weather condition, wind speed, humidity, etc.
City Search: Ability to search for weather in any city globally.
Geolocation: Automatically fetches and displays weather for the user's current location.
Top BBC News: Ability to read the top BBC news.
Todo List: Allows users to create and delete personal tasks.


**Technologies Used**
React
TypeScript
SCSS
Weather API: For fetching weather data.
https://www.weatherapi.com/docs/
https://newsapi.org/docs