import { storage } from "@/utils/storage";
import { type RecipeData } from "@/contexts/RecipeContext";

export function saveRecipe(
  recipeData: RecipeData,
  setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeData[]>>
) {
  if (!recipeData || !recipeData.title) {
    console.warn("Cannot save recipe: recipe data or title is missing.");
    return;
  }

  setSavedRecipes((prevSavedRecipes) => {
    const currentSaves = Array.isArray(prevSavedRecipes) ? prevSavedRecipes : [];
    const isCurrentlyFavorite = currentSaves.some((r) => r.title === recipeData.title);
    let updatedSaves: RecipeData[];

    if (isCurrentlyFavorite) {
      updatedSaves = currentSaves.filter((r) => r.title !== recipeData.title);
    } else {
      updatedSaves = [...currentSaves, recipeData];
    }

    storage.set("saves", JSON.stringify(updatedSaves));
    return updatedSaves;
  });
}
