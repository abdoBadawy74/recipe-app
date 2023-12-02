// https://www.themealdb.com/api/json/v1/1/filter.php?i={SearchTerm}
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

let searchInput = document.querySelector(".search-input");

let searchBtn = document.querySelector("#search-btn");

let resultArea = document.querySelector(".result-area");

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
  resultArea.innerHTML=""
  recipes.meals.forEach((recipe) => {
    resultArea.innerHTML += `
    <div class="card">
    <div class="card-img">
      <img src="${recipe.strMealThumb}" alt="" />
    </div>
    <div class="card-info">
      <h2>${recipe.strMeal}</h2>
      <a href="#">Get Recipe</a>
    </div>
  </div>
    `
  })
}
