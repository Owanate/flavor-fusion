import * as $ from "jquery";
import { ApiKey, date, getUsername } from "./main";

$("#year").text(date.getFullYear());
$("#username").text(getUsername());

function getCuisine(cuisine, wrapper) {
    $.get(
      `https://api.spoonacular.com/recipes/random?number=4&tags=vegetarian,${cuisine}&apiKey=${ApiKey}`,(data) => {
        $.each(data.recipes, (index, result) => {
            let card = `
                <li class="col">
                    <div class="card cuisine-card text-bg-dark position-relative">
                        <img src="${result.image}" class="card-img object-fit-cover" alt="" style="height: 15em;">
                        <div class="card-img-overlay">
                            <p class="card-subtitle text-white mb-2 fw-semibold text-uppercase d-flex align-items-center justify-content-between">
                                ${result.dishTypes[0]}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                                </svg>
                            </p>
                            <h5 class="card-title h4">
                                <a href="../pages/instructions.html?id=${result.id}" class="text-decoration-none text-white" target="_blank">${result.title}</a>
                            </h5>
                        </div>
                    </div>
                </li>
            `;
            $(wrapper).append(card);
        }) 
    });
}

$("document").ready(
    getCuisine("italian", "#italian-wrapper"),
    getCuisine("mexican", "#mexican-wrapper"),
    getCuisine("indian", "#indian-wrapper"),
    getCuisine("spanish", "#spanish-wrapper")
);