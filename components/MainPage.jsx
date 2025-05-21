import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteRecipe, getRecipes } from "@/utils/recipesFunctions";

const MainPage = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await deleteRecipe(id);
      if (response.deletedCount === 1) {
        const newRecipes = recipes.filter((recipe) => recipe._id !== id);
        setRecipes(newRecipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRecipe = (id) => {
    router.push(`/recipes/edit?id=${id}`);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-lime-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6">
    <h1 className="text-4xl font-bold text-center text-emerald-700 dark:text-lime-400 mb-10">
      🥗 NutriNote – Gătește cu grijă, trăiește cu gust!
    </h1>

    {recipes.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Nu ai adăugat încă nicio rețetă.
      </p>
    ) : (
      <div className="flex flex-wrap justify-center gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="w-full sm:w-72 p-4 bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-emerald-700 dark:text-lime-300 mb-2 text-center">
              {recipe.name}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <strong>Ingrediente:</strong>{" "}
              {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : "N/A"}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <strong>Durată:</strong> {recipe.duration} min
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <strong>Calorii:</strong> {recipe.calories} kcal
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleUpdateRecipe(recipe._id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg px-4 py-1.5 text-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-1.5 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default MainPage;
