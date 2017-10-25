
$(document).ready( () => {
  $("#getWeather_Btn").on("click" , () => {
      let city = $("#inputCity").val();
      $("#inputCity").val("");
      const apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=cd63f1a3797d35b613e676b91131bf3b";

      $.getJSON(apiCall,weatherCall);

      function weatherCall(weatherData){
        const cityName = (weatherData.name);
        const cityHumidity = (weatherData.main.humidity);
        const cityTemp = (weatherData.main.temp);
        const cityTempMin = (weatherData.main.temp_min);
        const cityTempMax = (weatherData.main.temp_max);
        const pressure = (weatherData.main.pressure); 
        const humidity = (weatherData.main.humidity);                
        const description = (weatherData.weather[0].description);
        const longitude = (weatherData.coord.lon);
        const latitude = (weatherData.coord.lat);        
        const icon = ("<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>");        
        const country = (weatherData.sys.country);
        const wind = (weatherData.wind.speed);
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

  $("#getWeather_Btn").on("click" , () => {  /*on click function for the fading in of another city user searches didnt work without it*/
    $("p").fadeOut(25); 
    const height = 650;
    const top = 10;
    $(".toDo").fadeIn();
    $(".exitTo").fadeIn();
    $(".appBack").css("height", height + "px"); /* growing of the div behind the inputs and main content */
    $(".appBack").css("top", top + "px");
    $(".toDo").css("margin-left" , 400);
    $(".toDo").css("background-color" , "#778899");
    $(".exitTo").css("margin-left" , 400); 
  });

  $(".exitTo").on("click", () => {
    $(".exitTo").css("display" , "none");
    $(".toDo").css("display" , "none");
  }); 
});

$(".toDo").on("click" , () => {
  $( ".toDo" ).fadeOut(100);
  $(".exitTo").fadeOut(100);
  $(".toDo").css("margin-left" , 95);
  $(".exitTo").css("margin-left" , 95); 
  $("p").css("display" , "none");
  $(".hello , .add , .inp").fadeIn(2000);
});


