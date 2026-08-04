import { Food } from "@/components/features/pantry/Search";
import { PantryDetails, PantryDetailsType } from "@/contexts/PantryDetails";

type PromptProps = {
  pantryDetails: PantryDetails;

  mealVibe: string;
  mealTexture: string;
  mealMethod: string;

  generationType: number;
  difficulties: string[];
  recipeTime: string[];
  numberOfServings: number;
  mealType: string[];
  cuisine: string[];
  dietaryPreference: string[];
};
export default function Prompt(props: PromptProps) {
  return `You are an expert chef assistant. Generate a delicious, realistic, high-quality recipe matching the structural parameters requested.


USER INGREDIENTS:

${
  props.generationType === 0
    ? `
Select ingredients from the user's pantry below that acheive the recipe constraints and create a realistic, tasty recipe.
Special note on leftovers: If leftover/prepared dishes are provided, assumed they are already cooked. DO NOT recook already made prepared dishes/leftovers.

Pantry:
${props.pantryDetails.ingredients
  .map((ingredient) => ingredient.name)
  .join("\n")}

`
    : props.generationType === 1
      ? `
Select ingredients from the list of ingredients below that acheive the recipe constraints and create a realistic, tasty recipe. You are not required to use all ingredients listed, instead, just choose the best ones for a tasty recipe. Constraints are recommendations and not strictly enforced. A tasty and realistic recipe is more important.
Special note on leftovers: If leftover/prepared dishes are provided, assumed they are already cooked. DO NOT recook already made prepared dishes/leftovers.


Ingredients Available for Use:
Leftover Fried Rice
Asparagus
Thyme
Flour
Eggs
Butter
Bread
Ice cream
Whipped cream
Ghost peppers
Chocolate chip cookies
`
      : `Use any ingredients to create the best tasting recipe that meets the given constraints. Ensure the recipe is realistic, tasty and satisfies the user's requests`
}

RECIPE CONSTRAINTS:
- Meal vibe: ${props.mealVibe}
- Meal texture: ${props.mealTexture}
- Meal method: ${props.mealMethod}

- IMPORTANT NOTE ON CONSTRAINTS: if a recipe is not compatible with the given constraints, do not force it into a recipe (if the meal texture is charred, and the user inputs ingredients for a cake, the constraint can be ignored. It is simply a guideline to encourage unique generation)

- Meal type: ${props.mealType[Math.floor(Math.random() * props.mealType.length)]}
- Recipe difficulty/complexity level: ${props.difficulties[Math.floor(Math.random() * props.difficulties.length)]}
- Recipe time range: ${props.recipeTime.length >= 3 || props.recipeTime.length === 0 ? `Any` : props.recipeTime[Math.floor(Math.random() * props.recipeTime.length)]}
- Number of servings: ${props.numberOfServings}
- Cusine: ${props.cuisine[Math.floor(Math.random() * props.cuisine.length)]}
${props.generationType === 2 ? `Dietary Restrictions: ${props.dietaryPreference}` : ``} 

CULINARY GUIDELINES:
1. Incorporate the provided ingredients naturally.
2. Assume the user has basic kitchen staples like salt, pepper, cooking oil, and standard pots/pans.
3. Prioritize genuine flavor. If the user provided an ingredient that tastes terrible with this combination, omit it safely.
4. Title constraint: Must be under 23 characters (including spaces).
5. Tags: Generate 3-5 relevant tags (Dinner, Italian, Quick, etc.). The first tag MUST be the meal type (Breakfast, Lunch, Dinner, Snack, Dessert, Side, Beverage, etc.). The rest should be cuisine/style tags.
6. Description constraint: Must be a short, mouthwatering hook under 23 words.
7. Ingredients List: Each item must be a 2-element array (tuple) of strings: [quantity, ingredient_name (first letter capitalized)], for example: ["2 tbsp", "Olive oil"] or ["400g", "Ground beef"] or ["To taste", "Salt"]. Do not use any dashes or separators between the quantity and the ingredient name.
8. Servings: Ensure the ingredient quantities are realistic based on the number of servings given by the user.
9. Instructions: Write each step clearly, aiming for 6-12 steps. For steps that require specific timing, set a positive integer for timerMinutes and restate the step that needs the timer in a concise, capitalized description of what is being timed for timerTask (e.g., "Bake cookies" or "Simmer sauce"). If a step does not need timing, set timerMinutes to 0 and timerTask to an empty string. Only use a timer when neccessary (not in every step).
10. Tips: Provide 3 genuinely helpful cooking tips for this recipe.
11. Difficulty: Repeat the user-inputted recipe difficulty/complexity level.
12. Time: Specify a realistic total cooking duration, e.g., "15 mins", "40 mins", or "1 hr 15 mins". Ensure the duration is near/within the inputted time range.
13. Nutrients: Estimate realistic nutritional values per serving (protein, fat, and carbs in grams) as integers.`;
}
