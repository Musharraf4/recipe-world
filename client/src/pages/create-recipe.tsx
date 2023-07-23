import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState<any>({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event: any, index: any) => {
    const { value } = event.target;
    const ingredients: any = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    console.log('sdds')
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <div>
        <div className="flex flex-col items-center min-h-screen pt-8 bg-gray-50">
          <div>
            <a href="/">
              <h3 className="text-4xl font-bold text-[#DAB600]">Create Recipe</h3>
            </a>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
                  Recipe Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full mt-1 py-2 border-blue-900 rounded-md shadow-sm  focus:outline-none focus:border-none"
                    value={recipe.name}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Description
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full mt-1 py-2 border-blue-900 rounded-md shadow-sm  focus:outline-none focus:border-none"
                    value={recipe.description}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Ingredients
                </label>
                <div className="flex flex-col items-start">
                  {recipe.ingredients.map((ingredient: any, index: any) => (
                    <input
                      key={index}
                      type="text"
                      name="ingredients"
                      value={ingredient}
                      className="block w-full mt-1 py-2 border-blue-900 rounded-md shadow-sm  focus:outline-none focus:border-none"
                      onChange={(event) => handleIngredientChange(event, index)}
                    />
                  ))}

                  <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                ></textarea>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full focus:outline-none cursor-pointer"
                  value={recipe.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="cookingTime"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  id="cookingTime"
                  name="cookingTime"
                  className="w-full focus:outline-none cursor-pointer"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-500 transform bg-[#DAB600] rounded-md hover:bg-[#e9d700] focus:outline-none focus:bg-[#e9d700]"
                >
                  Create Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
