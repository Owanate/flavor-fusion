import * as $ from "jquery";
import { ApiKey, date, getUsername } from "./main";

$("#year").text(date.getFullYear());
$("#username").text(getUsername());

let searchCard = (result) => {
    let card = `
      <li class="col">
        <div class="card wrapper text-white">
          <div class="row g-0">
            <div class="col-sm-4 col-lg-5">
              <img src="${result.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="">
            </div>
            <div class="col-sm-8 col-lg-7">
              <div class="card-body pe-md-0 text-center text-sm-start">
                <h5 class="card-title h4">${result.title}</h5>
                <p class="card-text mb-0 fs-6">
                  <span class="fw-semibold">Healthy: </span>
                  <span>${result.veryHealthy}</span>
                </p>
                <p class="card-text mb-0 fs-6">
                  <span class="fw-semibold">Nutrition Score: </span>
                  <span id="nutrition">${result.nutrition.properties[3].amount.toFixed(0)}%</span>
                </p>
                <p class="card-text mb-0 fs-6">
                  <span class="fw-semibold">Calories: </span>
                  <span id="calories">${result.nutrition.nutrients[0].amount} kcal</span>
                </p>
                <div class="d-grid col-12 col-sm-8 mt-3">
                  <a href="../pages/instructions.html?id=${result.id}" class="btn fw-semibold d-flex align-items-center justify-content-center" id="recipe-link" target="_blank">
                    Recipe
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>  
    `;
    return card;
}

function searchResult(e) {
    e.preventDefault();
    let value = $("input").val();

    $("#search-wrapper").empty();

    $.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=4&query=${value}&diet=vegtarian&apiKey=${ApiKey}&addRecipeNutrition=true`, 
      (response) => {
        $.each(response.results, (index, data) => {
           $("#search-wrapper").append(searchCard(data)); 
        })
      }
    );
}

$("#search-btn").click((e) => {
  searchResult(e);
  $("input").val("");
});
$("input").keyup((e) => {
  if (e.key == "Enter") {
    searchResult(e);
    $("input").val("");
  } else {
    return false;
  }
});