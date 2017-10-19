$(document).ready(function(){
  $("#getWeather_Btn").on("click" , function(){
      var city = $("#inputCity").val();
      $("#inputCity").val("");
      var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=cd63f1a3797d35b613e676b91131bf3b";

      $.getJSON(apiCall,weatherCall);

      function weatherCall(weatherData){
        var cityName = (weatherData.name);
        var cityHumidity = (weatherData.main.humidity);
        var cityTemp = (weatherData.main.temp);
        var cityTempMin = (weatherData.main.temp_min);
        var cityTempMax = (weatherData.main.temp_max);
        var pressure = (weatherData.main.pressure); 
        var humidity = (weatherData.main.humidity);                
        var description = (weatherData.weather[0].description);
        var longitude = (weatherData.coord.lon);
        var latitude = (weatherData.coord.lat);        
        var icon = ("<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>");        
        var country = (weatherData.sys.country);
        var wind = (weatherData.wind.speed);
        console.log(weatherData);
        $("p").fadeIn(850);
        $("p").html("");
        $(".temperature").append("The weather in " + cityName + " " + country + "," + " is " + cityTemp + "&#8457;");
        $(".description").append(description + icon);
        $(".minMax").append("Low: " + cityTempMin + "&#8457;" + " High: " + cityTempMax + "&#8457;");  
        $(".pressure").append("Pressure: " + pressure + " hpa");
        $(".humidity").append("Humidity: " + humidity + "%")              
        $(".cord").append("Coordinates: "+ "Longitude: " + longitude  + " Latitude: " + latitude);
      }
   });
  $("#getWeather_Btn").on("click" , function(){ /*on click function for the fading in of another city user searches didnt work without it*/
    $("p").fadeOut(25); 
    var height = 600;
    var top = 10;
    $(".appBack").css("height", height + "px"); /* growing of the div behind the inputs and main content */
    $(".appBack").css("top", top + "px");  
  });
});


