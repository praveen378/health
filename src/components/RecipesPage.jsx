import React from "react";

const recipes = [
  {
    title: "Lentil Soup",
    description:
      "A hearty and nutritious soup rich in protein and fiber. Ideal for maintaining energy levels.",
    ingredients: [
      "1 cup red lentils",
      "4 cups vegetable broth",
      "1 carrot, chopped",
      "1 onion, chopped",
      "1 clove garlic, minced",
    ],
  },
  {
    title: "Chicken & Vegetable Stir-fry",
    description:
      "A quick, balanced meal packed with vitamins and lean protein.",
    ingredients: [
      "200g chicken breast",
      "1 bell pepper",
      "1 broccoli head",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
    ],
  },
  {
    title: "Spinach & Chickpea Salad",
    description:
      "A light and refreshing salad that is a great source of iron and fiber.",
    ingredients: [
      "2 cups fresh spinach",
      "1 cup chickpeas",
      "1/2 cup cherry tomatoes",
      "1/4 red onion, sliced",
      "Lemon vinaigrette",
    ],
  },
];

const RecipesPage = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Nutritional Plans & Recipes
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Access a variety of healthy and easy-to-make recipes. A good diet is a
        cornerstone of a healthy life, helping to prevent illness and build a
        strong immune system.
      </p>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {recipe.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {recipe.description}
            </p>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">
              Ingredients:
            </h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
