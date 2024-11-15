import { useState } from "react";
import { Search } from "lucide-react";
import RecipeCard from "./Components/RecipeCard";

const APP_ID = "e9595357";
const APP_KEY = "b3a598d6972b38e9d0264e6970bde9bb";
const USER_ID = "shadosx";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          method: "GET",
          headers: {
            "Edamam-Account-User": USER_ID,
          },
        }
      );
      const data = await response.json();
      if (data.count === 0) {
        setError("No recipes found for the given search.");
        setRecipes([]);
      } else {
        setRecipes(data.hits.map((hit) => hit.recipe));
        setError("");
      }
    } catch {
      setError("An error occurred while fetching recipes.");
      setRecipes([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchRecipes();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold mb-6">Recipe Finder</h1>
          <div className="bg-white text-gray-700 rounded-lg shadow-lg p-4 flex items-center">
            <Search className="text-gray-400 mr-3" size={24} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search for a recipe..."
              className="w-full bg-transparent outline-none"
            />
          </div>
          {error && (
            <div className="mt-4 bg-red-100 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
        </div>
        <footer className="mt-6 text-xs text-gray-200">
          © 2024 Recipe Finder. All rights reserved.
        </footer>
      </aside>

      <main className="w-full md:w-2/3 p-6">
        {recipes.length === 0 && !error ? (
          <p className="text-center text-gray-500 mt-10">
            Start by searching for a recipe!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
