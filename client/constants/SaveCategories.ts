import { type RecipeCategories } from "@/contexts/RecipeContext";

export type SaveCategoryFilter = "all" | keyof RecipeCategories;

export const saveCategories: {
  title: string;
  image: string;
  filter: SaveCategoryFilter;
}[] = [
  // filters
  {
    title: "Made With Leftovers",
    image: "Pizza",
    filter: "madeWithLeftovers",
  }, //uses any prepared ingredients
  { title: "Tasty Meals", image: "Burger", filter: "tastyMeals" }, //all marked breakfast/lunch/dinner
  { title: "Sweet Treats", image: "Cake", filter: "sweetTreats" }, //anything marked dessert
  { title: "Quick Snacks", image: "Cookies", filter: "quickSnacks" }, //anything marked snack/side
  { title: "Under 15 Minutes", image: "Clock", filter: "under15Minutes" }, //anything that takes less than 15 minutes
  { title: "All Recipes", image: "SushiCaviar", filter: "all" }, //everything
];

export const countSavesInCategory = (
  saves: { categories?: Partial<RecipeCategories> }[],
  filter: SaveCategoryFilter,
): number =>
  filter === "all"
    ? saves.length
    : saves.filter((recipe) => recipe.categories?.[filter]).length;
