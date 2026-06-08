type PromptProps = {
  ingredients: string[];
  leftovers: string[];

  mealVibe: string;
  mealTexture: string;
  mealMethod: string;

  generationType: string;
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
${props.leftovers.length > 0 ? `- Leftovers (MUST USE): [${props.leftovers.join(", ")}]` : ""}
${props.ingredients.length > 0 ? `- Regular Ingredients: [${props.ingredients.join(", ")}]` : ""}
${props.ingredients.length > 0 || props.leftovers.length > 0 ? `- Grocery Flexibility: ${props.generationType == "Pantry" ? "Allowed to use outside ingredients if needed for taste" : "ONLY use listed ingredients and kitchen basics"}` : "Use any ingredients to create the most delicious and realistic recipe that meets all requirements"}

RECIPE CONSTRAINTS:
- Meal vibe: ${props.mealVibe}
- Meal texture: ${props.mealTexture}
- Meal method: ${props.mealMethod}

- Meal type: ${props.mealType[Math.floor(Math.random() * props.mealType.length)]}
- Recipe difficulty/complexity level: ${props.difficulties[Math.floor(Math.random() * props.difficulties.length)]}
- Recipe time range: ${props.recipeTime[Math.floor(Math.random() * props.recipeTime.length)]}
- Number of servings: ${props.numberOfServings}
- Cusine: ${props.cuisine[Math.floor(Math.random() * props.cuisine.length)]}
- Dietary Restrictions: ${props.dietaryPreference}

CULINARY GUIDELINES:
1. ${props.leftovers.length > 0 ? "CRITICAL: You must incorporate ALL/MOST of the listed leftovers into this recipe." : "Incorporate the provided ingredients naturally."}
2. Assume the user has basic kitchen staples like salt, pepper, cooking oil, and standard pots/pans.
3. Prioritize genuine flavor. If the user provided an ingredient that tastes terrible with this combination, omit it safely.
4. Title constraint: Must be under 23 characters (including spaces).
5. Tags: Generate 3-5 relevant tags (Dinner, Italian, Quick, etc.). The first tag MUST be the meal type (Breakfast, Lunch, Dinner, Snack, Dessert). The rest should be cuisine/style tags.
6. Description constraint: Must be a short, mouthwatering hook under 23 words.
7. Ingredients List: Each item must be a 2-element array (tuple) of strings: [quantity, ingredient_name (first letter capitalized)], for example: ["2 tbsp", "Olive oil"] or ["400g", "Ground beef"] or ["To taste", "Salt"]. Do not use any dashes or separators between the quantity and the ingredient name.
8. Servings: Ensure the ingredient quantities are realistic based on the number of servings given by the user.
9. Instructions: Write each step clearly, aiming for 6-12 steps. For steps that require specific timing, set a positive integer for timerMinutes and restate the step that needs the timer in a concise, capitalized description of what is being timed for timerTask (e.g., "Bake cookies" or "Simmer sauce"). If a step does not need timing, set timerMinutes to 0 and timerTask to an empty string. Only use a timer when neccessary (not in every step).
10. Tips: Provide 3 genuinely helpful cooking tips for this recipe.
11. Difficulty: Repeat the user-inputted recipe difficulty/complexity level.
12. Time: Specify a realistic total cooking duration, e.g., "15 mins", "40 mins", or "1 hr 15 mins". Ensure the duration is near/within the inputted time range.
13. Nutrients: Estimate realistic nutritional values per serving (protein, fat, and carbs in grams) as integers.`;
}
