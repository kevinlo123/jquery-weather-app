/* CREATING A WEATHER CRUD APPLICATION USING THE OPEN WEATHER API */

$(document).ready( () => { // DOCUMENT.READY FUNCTION DONT WANT ANYTHING IN THIS FUNCTION HAPPENING BEFORE THE PAGE LOADS
  $("#getWeather_Btn").on("click" , () => { // SEARCH BUTTON ON CLICK EVENT
      let city = $("#inputCity").val(); // GETTING THE VALUE FROM THE INPUT AND STORING INTO THE CITY VARIABLE 

      if(city == false){ //conditional stoping css changes if the input has no value
        confirm("please input a location");
        $(".toDo").css("display" , "none");
        $(".exitTo").css("display" , "none");
        $(".appBack").css("height", 300 + "px")
      }else{
        $("#inputCity").val("");// CLEARING FOR UX PURPOSES
        const apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=cd63f1a3797d35b613e676b91131bf3b"; /* API CALL VARIABLE HOLDING THE URL AS WELL ASS THE KEY 
                                                                                                                                                CONCATINATING THE CITY VARIABLE HOLDING THE USERS SEARCHED LOCATION*/
        $.getJSON(apiCall,weatherCall);//GET JSON METHOD SENDING APICALL VARIABLE AS PARAMETER AND WEATHERCALL.

        function weatherCall(weatherData){ // WEATHER CALL FUNCTION RETRIEVING THE DATA FROM THE JSON OBJECT AND STORING IT IN VARIABLES
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
          $("p").fadeIn(850); // FADING ALL THE PARAGRAPH ELEMENTS HOLDING THE DATA AND STRINGS THAT I WANT DISPLAYED WHEN THE USER HAS CLICKED SEARCH
          $("p").html("");
          $(".temperature").append("The weather in " + cityName + " " + country + "," + " is " + cityTemp + "&#8457;"); /*  CONCATINATING DATE WITH STRINGS
                                                                                                                      MAIN WEATHER APP INFORMATION BEING RETRIEVED */
          $(".description").append(description + icon);                                                                   
          $(".minMax").append("Low: " + cityTempMin + "&#8457;" + " High: " + cityTempMax + "&#8457;");  
          $(".pressure").append("Pressure: " + pressure + " hpa");
          $(".humidity").append("Humidity: " + humidity + "%")              
          $(".cord").append("Coordinates: "+ "Longitude: " + longitude  + " Latitude: " + latitude);
          $(".toDo").css("margin-left" , 400);
          $(".toDo").fadeIn();
          $(".exitTo").fadeIn();
          $(".appBack").css("height", 650 + "px");
          $(".appBack").css("top", 10 + "px");
        }
      }
   });

  $("#getWeather_Btn").on("click" , () => {  // on click function for the fading in of another city user searches didnt work without it*/
    $("p").fadeOut(25); 
    $(".toDo").css("background-color" , "#778899");
    $(".exitTo").css("margin-left" , 400); // CANCEL BUTTON CSS CHANGE
    $(".hello , .add , .inp").css("display" , "none");
  });

  $(".exitTo").on("click", () => { // EXITING OUT OF THE TO DO'S BUTTON WHEN CLICKED IN CASE USER DOESNT WANT TO USE FEATURE
    $(".exitTo").css("display" , "none");
    $(".toDo").css("display" , "none");
  }); 

  /**********************************
   *FADING IN TO DO LIST ELEMENTS */

  $(".toDo").on("click" , () => {
    $( ".toDo" ).fadeOut(100);
    $(".exitTo").fadeOut(100);
    $(".toDo").css("margin-left" , 95);
    $(".exitTo").css("margin-left" , 95); 
    $("p").css("display" , "none");
    $(".hello , .add , .inp").fadeIn(2000);
  });

  /**********************************/
  /**TO DO LIST PART OF THE APP******/

  let taskArray = [];

  $(".add").on("click" , () => {
    let task = $(".inp").val();    
    console.log(task);
    taskArray.push(task);
    $(".inp").val("");
    $("ol").html("<li>"+ taskArray.join("</li><li>") + "</li>");
    const edit = "edit";
    const remove = "remove";
    $("li").append("<button class='remove-btn'> " + edit + "</button>" + "<button class='edit-btn'> " + remove + "</button>");
    $(".remove-btn").on("click" , () => {
      console.log("remove button working");
    });
    $(".edit-btn").on("click" , () => {
      console.log("edit button working");
    });
  });
});


