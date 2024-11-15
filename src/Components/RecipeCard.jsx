import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white transform hover:scale-105 transition-transform duration-200">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={recipe.image}
        alt={recipe.label}
      />

      <div className="px-6 py-4">
        <h2 className="font-semibold text-xl text-gray-800 mb-2">{recipe.label}</h2>

        <h3 className="text-sm text-gray-500 font-medium mb-2">Ingredients:</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-2 border-t border-gray-200 flex justify-between items-center">
        <span className="text-gray-500 text-xs">Calories: {Math.round(recipe.calories)} kcal</span>
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    calories: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;

