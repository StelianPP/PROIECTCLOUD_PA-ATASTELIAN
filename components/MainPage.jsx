import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteRecord as deleteRecipe, getRecipes } from "@/utils/recipesFunctions";

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
    <div className="p-4 flex flex-wrap gap-4">
      {recipes.map((recipe) => (
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          key={recipe._id}
        >
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          )}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {recipe.name}
          </h5>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Ingrediente:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Durată:</strong> {recipe.duration} min
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <strong>Calorii:</strong> {recipe.calories} kcal
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => handleUpdateRecipe(recipe._id)}
            >
              Editează
            </button>
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => handleDeleteRecipe(recipe._id)}
            >
              Șterge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
