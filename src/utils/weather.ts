
export async function getWeatherDetails(city: string) {

  const base_url = "http://api.openweathermap.org/data/2.5/weather?"
  const complete_url = base_url + "q=" + city + "&appid=" + process.env.WEATHER_API_KEY;
  const response = await fetch(complete_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  // console.log(data)

  if (data.cod == '404') return "NOT AVAILABLE"
  
  return JSON.stringify(data);
}