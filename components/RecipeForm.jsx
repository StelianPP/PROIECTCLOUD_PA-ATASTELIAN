import React, { useState } from "react";
import { useRouter } from "next/router";

const RecipeForm = (props) => {
  const { data, onSubmit } = props;
  const router = useRouter();

  const [recipe, setRecipe] = useState(
    data || {
      name: "",
      ingredients: [],
      duration: "",
      calories: "",
    }
  );

  const updateRecipe = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleIngredientsChange = (e) => {
    const value = e.target.value;
    const ingredientsArray = value.split(",").map((i) => i.trim());
    updateRecipe("ingredients", ingredientsArray);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          {recipe._id ? "Editează Rețeta" : "Creează o Rețetă Nouă"}
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-semibold text-gray-800 text-lg"
          >
            Nume Rețetă
          </label>
          <input
            type="text"
            id="name"
            value={recipe.name}
            onChange={(e) => updateRecipe("name", e.target.value)}
            placeholder="Nume rețetă"
            required
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 text-base border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block mb-1 font-semibold text-gray-800 text-lg"
          >
            Ingrediente (separate prin virgulă)
          </label>
          <input
            type="text"
            id="ingredients"
            value={Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : ""}
            onChange={handleIngredientsChange}
            placeholder="ex: ouă, făină, zahăr"
            required
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 text-base border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block mb-1 font-semibold text-gray-800 text-lg"
          >
            Durată (minute)
          </label>
          <input
            type="number"
            id="duration"
            value={recipe.duration}
            onChange={(e) => updateRecipe("duration", e.target.value)}
            placeholder="Durată preparare"
            required
            min={0}
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 text-base border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          />
        </div>

        <div>
          <label
            htmlFor="calories"
            className="block mb-1 font-semibold text-gray-800 text-lg"
          >
            Calorii (kcal)
          </label>
          <input
            type="number"
            id="calories"
            value={recipe.calories}
            onChange={(e) => updateRecipe("calories", e.target.value)}
            placeholder="Calorii"
            required
            min={0}
            className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 text-base border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={() => onSubmit(recipe)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-md"
          >
            {recipe._id ? "Actualizează" : "Creează"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
