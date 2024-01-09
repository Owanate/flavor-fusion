import * as $ from "jquery";
import { ApiKey, getDescription, date, getUsername } from "./main";

$("#year").text(date.getFullYear());
$("#username").text(getUsername());

let getMealPlan = (response) => {
  if (date.getHours() < 12) {
    getMeal(response.meals[0].id);
    $("#tag").text("Breakfast");
  }else if (date.getHours() < 17) {
    getMeal(response.meals[1].id);
    $("#tag").text("Lunch");
  }else {
    getMeal(response.meals[2].id);
    $("#tag").text("Dinner");
  }
  $("#calories").text(`${response.nutrients.calories}kcal`);
  $("#protein").text(`${response.nutrients.protein}g`);
  $("#fat").text(`${response.nutrients.fat}g`);
  $("#carbohydrate").text(`${response.nutrients.carbohydrates}g`);
}

let getMeal = (recipeId) => {
  $.get(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${ApiKey}&includeNutrition=true`,
    (data) =>{
      $('#title').text(data.title);
      $('#food-image').attr('src', data.image);
      $('#likes').text(`${data.aggregateLikes} likes`);
      getDescription(data.summary, "#description", 3);
      $("#recipe-link").attr("href", `../pages/instructions.html?id=${data.id}`);
      getVideo(data.title);
    }
  );
}

function getVideo(name) {
  $.get(
    `https://api.spoonacular.com/food/videos/search?query=${name}&number=1&apiKey=${ApiKey}`, (data) => {
      console.log(data);
      $("#video-thumbnail").attr("src", data.videos[0].thumbnail);
      $("#video-title").text(data.videos[0].shortTitle);
      $("#video-title").attr("href", `https://www.youtube.com/watch?v=${data.videos[0].youTubeId}`);
    }
  );
}

$(document).ready(() => {
  $.get(
    `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=vegetarian&apiKey=${ApiKey}`,
    (data) => getMealPlan(data)
  );
});