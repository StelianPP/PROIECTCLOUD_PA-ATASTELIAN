// /pages/recipes/edit.jsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { recipeDefaultValues } from "@/utils/constants";
import { getRecipeById, updateRecipe } from "@/utils/recipesFunctions";
import RecipeForm from "@/components/RecipeForm";

const Edit = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [entry, setEntry] = useState(recipeDefaultValues);

  const getRecipe = async (id) => {
    const data = await getRecipeById(id);

    if (data) {
      setEntry(data);
    }

    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const response = await updateRecipe(data);

    if (response) {
      router.push("/");
    } else {
      alert("Failed to update recipe");
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
    const id = searchParams.get("id");

    if (!id) {
      router.push("/");
    }

    getRecipe(id);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {entry._id ? (
        <RecipeForm data={entry} onSubmit={onSubmit}/>
      ) : (
        <div className="text-center">Recipe not found</div>
      )}
    </>
  );
};

export default Edit;