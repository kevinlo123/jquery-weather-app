$(document).ready(function(){
  $("#getWeather_Btn").on("click" , function(){
      var city = $("#inputCity").val();
      var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=cd63f1a3797d35b613e676b91131bf3b";

      $.getJSON(apiCall,weatherCall);

      function weatherCall(weatherData){
        var cityName = (weatherData.name);
        var cityHumidity = (weatherData.main.humidity);
        var cityTemp = (weatherData.main.temp);
        var cityTempMin = (weatherData.main.temp_min);
        var cityTempMax = (weatherData.main.temp_max);
        var description = (weatherData.weather[0].description);
        var country = (weatherData.sys.country);
        var wind = (weatherData.wind.speed);
        console.log(weatherData);
        $("p").html("");
        $("p").append("the weather for " + cityName + " is " + cityTemp);
      }
   });
});