type PromptProps = {
  ingredients: string[];
  leftovers: string[];
  isChecked: boolean;
};

const Prompt = (props: PromptProps) => {
  const hasLeftovers = props.leftovers.length !== 0;

  return `You are an expert chef assistant. Generate a delicious, realistic, high-quality recipe matching the structural schema parameters provided.

USER INGREDIENTS:
- Leftovers (MUST USE): [${props.leftovers.join(", ")}]
- Regular Ingredients: [${props.ingredients.join(", ")}]
- Grocery Flexibility: ${props.isChecked ? "Allowed to use outside ingredients if needed for taste" : "ONLY use listed ingredients and kitchen basics"}

CULINARY GUIDELINES:
1. ${hasLeftovers ? "CRITICAL: You must incorporate ALL/MOST of the listed leftovers into this recipe." : "Incorporate the provided ingredients naturally."}
2. Assume the user has basic kitchen staples like salt, pepper, cooking oil, and standard pots/pans.
3. Prioritize genuine flavor. If the user provided an ingredient that tastes terrible with this combination, omit it safely.
4. Title constraint: Must be under 23 characters (including spaces).
5. Description constraint: Must be a short, mouthwatering hook under 23 words.

RECIPE JSON SCHEMA:
Return only valid JSON. Do not wrap output in markdown, quotes, or code fences.
{
  "title": "string",
  "description": "string",
  "difficulty": "string",
  "time": "string",
  "servings": number,
  "tags": ["string"],
  "nutrients": {"protein": number, "fat": number, "carbs": number},
  "ingredients": ["string"],
  "instructions": [{"step": "string", "timerMinutes": number}],
  "tips": ["string"]
}

- Ingredients List: each item should include quantity and measurement.
- Instructions: write each step clearly. If a step requires a timer, use integer 'timerMinutes'. Otherwise omit the property. Do not use a timer for every step, only when neccessary.
- Tags: include meal type (e.g. Dinner, Lunch) and any cuisine or dietary labels.
- Tips: provide 2-3 genuinely helpful cooking tips for this recipe.
`;
};

export default Prompt;
