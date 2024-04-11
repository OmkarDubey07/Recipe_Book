document.addEventListener("DOMContentLoaded", () => {
  const addRecipeBtn = document.getElementById("addRecipe");
  const recipeForm = document.getElementById("recipeForm");
  const recipeList = document.getElementById("recipeLists");
  const modal = document.getElementById("promptBox");
  const closeBtn = document.querySelector(".closeBtn");

  addRecipeBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = recipeForm.name.value;
    let ingredients = recipeForm.ingredients.value;
    let description = recipeForm.description.value;
    saveToLocal(name, ingredients, description);
    recipeForm.reset();
    modal.style.display = "none";
    showDishes();
  });

  function saveToLocal(name, ingredients, description) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push({ name, ingredients, description });
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  function showDishes() {
    recipeList.innerHTML = "";
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.forEach((element, index) => {
      let dishes = document.createElement("div");
      dishes.classList.add("recipe");
      dishes.innerHTML += `
        <h2>${element.name}</h2>
        <p><strong>Ingredients:</strong> ${element.ingredients}</p>
        <p><strong>Instructions:</strong> ${element.description}</p>
        <button class="deleteBtn">Delete</button>
      `;
      recipeList.appendChild(dishes);
    });
  }

  recipeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      let index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
      deleteRecipe(index);
    }
  });

  function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    showDishes();
  }

  showDishes();
});
