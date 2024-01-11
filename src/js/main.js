import $ from "jquery";
let date = new Date();
$("#year").text(date.getFullYear());

let getUsername = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let username = user[0].name;
  return username;
};
$("#username").text(getUsername());

const ApiKey = "9b70d83cccd246cf95b21a3a66f7539e";
let getData = (food, callback) => {
  try {
    $.get(
      `https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,${food}&apiKey=${ApiKey}`,
      callback
    );
  } catch (error) {
    console.error("Fetch", error);
  }
};

function getDescription(apiString, targetElement, end) {
  const description = apiString
    .replace(/(<([^>]+)>)|\n/gi, "")
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|");

  $(targetElement).text(description.slice(0, end).join(" "));
}

function getRandomMeal() {
  let meal = "";
  date.getHours() < 12
    ? (meal = "breakfast")
    : date.getHours() < 17
    ? (meal = "lunch")
    : (meal = "dinner");
  getData(meal, (details) => {
    $("#title").text(details.recipes[0].title);
    $("#serve-time").text(`${details.recipes[0].readyInMinutes} minutes`);
    $("#serve-people").text(`${details.recipes[0].servings} servings`);
    getDescription(details.recipes[0].summary, "#description", 3);
    $("#food-image").attr("src", details.recipes[0].image);
    $("#recipe-link").attr(
      "href",
      `../pages/instructions.html?id=${details.recipes[0].id}`
    );
  });
}

function getRandomDrink() {
  getData("drink", (data) => {
    $("#drink-title, #drink-modal-title").text(data.recipes[0].title);
    $("#drink-serve").text(
      `Ready in ${data.recipes[0].readyInMinutes} minutes`
    );
    $("#drink-image, #drink-modal-image").attr("src", data.recipes[0].image);
    $.each(data.recipes[0].dishTypes, (index, dish) => {
      $("#dish-types-drink").append(
        `<p class="orange-box rounded px-3 py-2 lh-1 me-sm-3">${dish}</p>`
      );
    });
    $.each(data.recipes[0].extendedIngredients, (index, ingredient) => {
      $("#drink-ingredients").append(
        `<li class="ingredient fs-5">${ingredient.original}</li>`
      );
    });
    $.each(
      data.recipes[0].analyzedInstructions[0].steps,
      (index, instruction) => {
        $("#drink-instructions").append(
          `<li class="fs-5 lh-1 mb-2">${instruction.step}</li>`
        );
      }
    );
  });
}

function getRandomSnack() {
  getData("snack", (data) => {
    $("#snack-title, #snack-modal-title").text(data.recipes[0].title);
    $("#snack-serve").text(
      `Ready in ${data.recipes[0].readyInMinutes} minutes`
    );
    $("#snack-image, #snack-modal-image").attr("src", data.recipes[0].image);
    $.each(data.recipes[0].dishTypes, (index, dish) => {
      $("#dish-types-snack").append(
        `<p class="orange-box rounded px-3 py-2 lh-1 ms-sm-3">${dish}</p>`
      );
    });
    $.each(data.recipes[0].extendedIngredients, (index, ingredient) => {
      $("#snack-ingredients").append(
        `<li class="ingredient fs-5">${ingredient.original}</li>`
      );
    });
    $.each(
      data.recipes[0].analyzedInstructions[0].steps,
      (index, instruction) => {
        $("#snack-instructions").append(
          `<li class="fs-5 lh-1 mb-2">${instruction.step}</li>`
        );
      }
    );
  });
}

function fetchContent() {
  $.get(
    `https://api.spoonacular.com/food/jokes/random?apiKey=${ApiKey}`,
    function (data) {
      $("#joke").text(data.text);
    }
  ).fail((error) => console.error("Fetch", error));
}

$("document").ready(
  getUsername(),
  getRandomMeal(),
  getRandomDrink(),
  getRandomSnack(),
  fetchContent()
);

export { ApiKey, getDescription, date, getUsername };
