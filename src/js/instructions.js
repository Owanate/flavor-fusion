import * as $ from "jquery";
import { getDescription} from "./main";

const ApiKey = "8dd45855b060473c83dc54dc67fb2869";
function getUrlParameter(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

$(document).ready(() => {
  let recipeId = getUrlParameter("id");
  $.get(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${ApiKey}&includeNutrition=true`,
    function (response) {
      $("#title").text(response.title);
      $("#serve-time").text(`${response.readyInMinutes} minutes`);
      $("#serve-people").text(`${response.servings} servings`);
      getDescription(response.summary, "#description", 4);
      $("#food-image").attr("src", response.image);
      $("#nutrition").text(
        `${response.nutrition.properties[3].amount.toFixed(2)}%`
      );
      $("#calories").text(`${response.nutrition.nutrients[0].amount}kcal`);
      $("#protein").text(
        `${response.nutrition.caloricBreakdown.percentProtein}%`
      );
      $("#fat").text(`${response.nutrition.caloricBreakdown.percentFat}%`);
      $("#carbs").text(`${response.nutrition.caloricBreakdown.percentCarbs}%`);
      $("#weight").text(`${response.nutrition.weightPerServing.amount}g`);
      $.each(response.extendedIngredients, (index, ingredient) => {
        $("#ingredients").append(
          `<li class="ingredient fs-5">${ingredient.original}</li>`
        );
      });
      $.each(response.analyzedInstructions[0].steps, (index, instruction) => {
        $("#instructions").append(
          `<li class="fs-5 lh-sm">${instruction.step}</li>`
        );
      });
    }
  ).fail((error) => console.error("Fetch", error));
});