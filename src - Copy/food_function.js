function searchMeal() {
  const input = document.getElementById("meal-input").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("meal-result");

      if (data.meals == null) {
        resultDiv.innerHTML = "No meals found.";
        return;
      }

      const meal = data.meals[0];
      const mealName = meal.strMeal;
      const mealInstructions = meal.strInstructions;
      const mealImage = meal.strMealThumb;
      const mealCategory = meal.strCategory;
      const mealIngredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          mealIngredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
      const mealRecipe = meal.strYoutube;

      const html = `
        <h2>${mealName}</h2>
        <p>${mealInstructions}</p>
        <img src="${mealImage}" alt="${mealName}" />
        <p><strong>Category:</strong> ${mealCategory}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          ${mealIngredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
        <p><strong>Recipe:</strong></p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${mealRecipe.split("=")[1]}" frameborder="0" allowfullscreen></iframe>
      `;

      resultDiv.innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      const resultDiv = document.getElementById("meal-result");
      resultDiv.innerHTML = "An error occurred while fetching meal data.";
    });
}
