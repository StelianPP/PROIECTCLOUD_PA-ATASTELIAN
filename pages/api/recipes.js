// /pages/api/recipes.js

import { sendMethodNotAllowed, sendOk } from '@/utils/apiMethods.js';
import { getCollection } from '@/utils/functions';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'recipes';

const getRecipes = async () => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.find({}).toArray();
}

const getRecipe = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
}

const postRecipe = async (recipe) => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.insertOne(recipe);
}

const putRecipe = async (recipe) => {
  const collection = await getCollection(COLLECTION_NAME);
  const id = recipe._id;
  delete recipe._id;
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: recipe });
}

const deleteRecipe = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.deleteOne({ _id: new ObjectId(id) });
}

export default async function handler(req, res) {
  const isAllowedMethod = ['GET', 'POST', 'PUT', 'DELETE'].includes(req.method);

  if (!isAllowedMethod) {
    return sendMethodNotAllowed(res);
  }

  if (req.method === 'GET' && req.query.id) {
    const id = req.query.id;
    const recipe = await getRecipe(id);
    return sendOk(res, recipe);
  } else if (req.method === 'GET') {
    const recipes = await getRecipes();
    return sendOk(res, recipes);
  } else if (req.method === 'POST') {
    const recipe = req.body;
    const result = await postRecipe(recipe);
    return sendOk(res, result);
  } else if (req.method === 'PUT') {
    const recipe = req.body;
    const result = await putRecipe(recipe);
    return sendOk(res, result);
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    const result = await deleteRecipe(id);
    return sendOk(res, result);
  }
}
