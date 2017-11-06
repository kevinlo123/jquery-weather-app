/* CREATING A WEATHER CRUD APPLICATION USING THE OPEN WEATHER API */

$(document).ready( () => { // DOCUMENT.READY FUNCTION DONT WANT ANYTHING IN THIS FUNCTION HAPPENING BEFORE THE PAGE LOADS

  $(".sun").on("click" , () => { // CLICK EVENT MAKING THE SUN RESET APPLICATION
    $(".toDo").css("display" , "none");
    $(".exitTo").css("display" , "none");
    $(".appBack").css("height", 320 + "px");
    $(".exitTo").css("display" , "none");
    $(".add").css("display" , "none");
    $("li").css("display" , "none");
    $(".inp").css("display" , "none");
    $(".hello").css("display" , "none");
    $("p").css("display" , "none");
  });

  $("#getWeather_Btn").on("click" , () => { // SEARCH BUTTON ON CLICK EVENT
      let city = $("#inputCity").val(); // GETTING THE VALUE FROM THE INPUT AND STORING INTO THE CITY VARIABLE 

      if(city == ""){ //conditional stoping css changes if the input has no string as value
        confirm("please input a location");
        $(".toDo").css("display" , "none");
        $(".exitTo").css("display" , "none");
        $(".appBack").css("height", 320 + "px");
        $("li").css("display" , "none");        
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
          $(".time").append(("Time: " + new Date().getHours() % 12) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
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

  /**********************************
   *TO DO LIST CODE */ 
  
  $(".add").on('click', () => {
    event.preventDefault();
    addTodoItem(); // running add to do function when add button clicked
  });  

  const addTodoItem = () => {
    let todoItem = $(".inp").val();
    $(".todo-list").append("<li>" +  todoItem + "<button class='todo-item-done'>" + "<i class='fa fa-check' aria-hidden='true'></i>" +
    "</button>" +  "<button class='todo-item-delete'>" + "<i class='fa fa-trash-o' aria-hidden='true'></i>" +
    "</button>" +  "<button class='todo-item-edit'>" +  "<i class='fa fa-pencil' aria-hidden='true'></i>" +  "</button>" + "</li>");
    $(".inp").val("");
  }

  /************************ DELETE BUTTON *******************/

  $(".todo-list").on('click', '.todo-item-delete', function(event){
    event.preventDefault(); // preventing form event from happening
    let item = this;
    deleteTodoItem(event, item);
  });
  
  const deleteTodoItem = (event, item) => {
    event.preventDefault(); // preventing form event from happening
    $(item).parent().fadeOut('fast', () => { 
      $(item).parent().remove(); // this being passed in item so li gets removed
    });
  };

  /************************ DONE BUTTON *******************/

  $(".todo-list").on('click', '.todo-item-done', function(event){
    event.preventDefault(); // preventing form event from happening
    let item = this;
    taskDone(event, item);
  });

  const taskDone = (event, item) => {
    event.preventDefault(); // preventing form event from happening
    $(item).parent().toggleClass("task-finished");              
  };

  /************************ EDIT BUTTON *******************/

  $(".todo-list").on("click" , ".todo-item-edit" , function(event){
    event.preventDefault(); 
    $(this).parent().html("<input type='text' class='input_edit' />" + "<button class='confirm_button'>" + "confirm" + "</button>");    
    $(".confirm_button").on("click" , function(){
      let newItem = $(".input_edit").val(); // variable holding value of the input to be interpolated at list item
      $(this).parent().html(newItem + "<button class='todo-item-done'>" + "<i class='fa fa-check' aria-hidden='true'></i>" +
      "</button>" +  "<button class='todo-item-delete'>" + "<i class='fa fa-trash-o' aria-hidden='true'></i>" +
      "</button>" +  "<button class='todo-item-edit'>" +  "<i class='fa fa-pencil' aria-hidden='true'></i>" +  "</button>");
    });
  });
});


