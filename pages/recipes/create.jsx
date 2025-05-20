// /pages/records/create.jsx

import RecordForm from "@/components/RecipeForm";
import { recordDefaultValues } from "@/utils/constants";
import { createRecord } from "@/utils/recipesFunctions";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const entry = recordDefaultValues;

  const onSubmit = async (data) => {
    const response = await createRecord(data);

    if (response) {
      router.push("/");
    } else {
      alert("Failed to create record");
    }
  }

  return (
      <RecordForm data={entry} onSubmit={onSubmit} />
  );
};

export default Create;