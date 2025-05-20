// /pages/records/create.jsx

import RecipeForm from "@/components/RecipeForm";
import { recipeDefaultValues } from "@/utils/constants";
import { createRecipe } from "@/utils/recipesFunctions";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const entry = recipeDefaultValues;

  const onSubmit = async (data) => {
    const response = await createRecipe(data);

    if (response) {
      router.push("/");
    } else {
      alert("Failed to create recipe");
    }
  }

  return (
      <RecipeForm data={entry} onSubmit={onSubmit} />
  );
};

export default Create;