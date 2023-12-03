// https://www.themealdb.com/api/json/v1/1/filter.php?i={SearchTerm}
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

let searchInput = document.querySelector(".search-input");

let searchBtn = document.querySelector("#search-btn");

let resultArea = document.querySelector(".result-area");

let recipeDetails = document.querySelector(".recipe-details");

searchBtn.addEventListener("click", getRecipes);

function getRecipes() {
  let SearchTerm = searchInput.value.trim();

  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchTerm}`;

  fetch(apiUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      displayRecipes(data);
    });
}

function displayRecipes(recipes) {
  if (recipes.meals == null) {
    resultArea.innerHTML = "No Data ...";
    return;
  }
  resultArea.innerHTML = "";

  recipes.meals.forEach((recipe) => {
    resultArea.innerHTML += `
    <div class="card">
    <div class="card-img">
      <img src="${recipe.strMealThumb}" alt="" />
    </div>
    <div class="card-info">
      <h2>${recipe.strMeal}</h2>
      <a href="#" class="recipe-btn"  data-id=${recipe.idMeal}>Get Recipe</a>
    </div>
  </div>
    `;
  });
}

resultArea.addEventListener("click", getRecipeDetails);

function getRecipeDetails(e) {
  if (e.target.classList.contains("recipe-btn")) {
    let id = e.target.getAttribute("data-id");

    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(apiUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        displayRecipeDetails(data);
      });
  }
}

function displayRecipeDetails(recipeItem) {
  let item = recipeItem.meals[0];

  recipeDetails.innerHTML = "";

  recipeDetails.innerHTML = `
        <i class="fas fa-times close"></i>
        <h2>${item.strMeal}</h2>
        <p>Instruction</p>
        <p>
        ${item.strInstructions}
        </p>
        <a href="${item.strYoutube}" target="_blank">Watch vidoe</a>
  `;
  recipeDetails.classList.remove("showDetails");
}

recipeDetails.addEventListener("click", close);

function close(e) {
  if (e.target.classList.contains("close")) {
    // recipeDetails.classList.add("showDetails")
    e.target.parentElement.classList.add("showDetails");
  }
}
