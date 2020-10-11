import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { renderRecipes } from "./components/renderRecipes.js";
import { searchRecipes } from "./components/searchRecipes.js";
import { getFavRecipes } from "./utils/favRecipes.js";

const recipesUrl = baseUrl + "recipes";

async function getRecipes() {
    try {
        const response = await fetch(recipesUrl);
        const json = await response.json();

        const recipes = json;

        renderRecipes(recipes);
        searchRecipes(recipes);

    } catch (error) {
            console.log(error);
            displayMessage("error", error, ".recipe-container");
    }
}

getRecipes();

const recipeContainer = document.querySelector(".recipe-container");
const favourites = getFavRecipes();

favourites.forEach((favourite) => {
    let iClass = "far";

    const doesObjectExits = favourites.find(function (fav) {
        console.log(fav);

        return parseInt(fav.id) === recipe.id;
    });

    console.log(doesObjectExits);

    if (doesObjectExits) {
        iClass = "fa";
    }

    recipeContainer.innerHTML += `<div class="recipe">
                                    <h2>${favourite.name}</h2>
                                    <p>${favourite.description}</p>
                                    <h4>Difficulty: ${favourite.difficulty}/10</h4>
                                    <a href="${favourite.link}">Link to recipe</a>
                                    <i class="${iClass} fa-heart" data-id="${favourite.id}" data-name="${favourite.name}"></i>
                                </div>`;
});

const favButton = document.querySelectorAll(".recipe i");

favButton.forEach((button) => {
    button.addEventListener("click", handleClick);
});

function handleClick() {
    this.classList.toggle("fa");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const name = this.dataset.name;

    const currentFavs = getFavRecipes();

    const recipeExists = currentFavs.find(function (fav) {
        return fav.id === id;
    });

    if (recipeExists === undefined) {
        const recipe = { id: id, name: name };
        currentFavs.push(recipe);
        saveFavs(currentFavs);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
    }
}

function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
}