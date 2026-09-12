import { type RecipeData } from "@/contexts/RecipeContext";
import { trackRecipeSaved } from "@/utils/achievements";

export function equal(r1: RecipeData, r2: RecipeData): boolean {
  if (!r1 || !r2) return false;
  if (r1.id && r2.id) {
    return r1.id === r2.id;
  }
  return r1.title === r2.title;
}

export function saveRecipe(
  recipeData: RecipeData,
  setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeData[]>>,
  restoreIndex?: number,
) {
  if (!recipeData || !recipeData.title) {
    console.warn("Cannot save recipe: recipe data or title is missing.");
    return;
  }

  setSavedRecipes((prevSavedRecipes) => {
    const currentSaves = Array.isArray(prevSavedRecipes)
      ? prevSavedRecipes
      : [];
    const isCurrentlyFavorite = currentSaves.some((r) => equal(r, recipeData));
    let updatedSaves: RecipeData[];

    if (isCurrentlyFavorite) {
      updatedSaves = currentSaves.filter((r) => !equal(r, recipeData));
    } else if (
      restoreIndex !== undefined &&
      restoreIndex >= 0 &&
      restoreIndex <= currentSaves.length
    ) {
      updatedSaves = [
        ...currentSaves.slice(0, restoreIndex),
        recipeData,
        ...currentSaves.slice(restoreIndex),
      ];
    } else {
      updatedSaves = [...currentSaves, recipeData];
    }

    trackRecipeSaved(updatedSaves.length);
    return updatedSaves;
  });
}
