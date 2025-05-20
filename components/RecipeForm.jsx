// /components/RecipeForm.jsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const RecipeForm = (props) => {
  const { data, onSubmit } = props;
  const router = useRouter();
  
  // Dacă data nu e definită, setăm un obiect gol cu proprietăți default
  const [recipe, setRecipe] = useState(data || {
    name: "",
    ingredients: [],
    duration: "",
    calories: "",
    imageUrl: "",
  });

  const updateRecipe = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  // Pentru ingrediente vrem să le introducem ca text și să le spargem în array
  const handleIngredientsChange = (e) => {
    const value = e.target.value;
    // spargem ingredientele după virgulă și eliminăm spațiile
    const ingredientsArray = value.split(",").map((i) => i.trim());
    updateRecipe("ingredients", ingredientsArray);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="border p-4 rounded-md shadow-sm flex flex-col gap-4 w-full max-w-80">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nume Rețetă
          </label>
          <input
            type="text"
            id="name"
            value={recipe.name}
            onChange={(e) => updateRecipe("name", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nume rețetă"
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ingrediente (separate prin virgulă)
          </label>
          <input
            type="text"
            id="ingredients"
            value={recipe.ingredients.join(", ")}
            onChange={handleIngredientsChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ex: ouă, făină, zahăr"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Durată (minute)
          </label>
          <input
            type="number"
            id="duration"
            value={recipe.duration}
            onChange={(e) => updateRecipe("duration", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Durată preparare"
            required
          />
        </div>
        <div>
          <label htmlFor="calories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Calorii (kcal)
          </label>
          <input
            type="number"
            id="calories"
            value={recipe.calories}
            onChange={(e) => updateRecipe("calories", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Calorii"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL Imagine
          </label>
          <input
            type="text"
            id="imageUrl"
            value={recipe.imageUrl}
            onChange={(e) => updateRecipe("imageUrl", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="URL imagine rețetă"
          />
        </div>
        <div className="w-full flex justify-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={() => onSubmit(recipe)}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {recipe._id ? "Actualizează" : "Creează"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
