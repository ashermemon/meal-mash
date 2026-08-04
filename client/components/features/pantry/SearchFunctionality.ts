import { supabase } from "@/utils/supabase";
import { Food } from "./Search";

function createFood(
  id: number,
  name: string,
  category: string,
  displayName?: string,
): Food {
  return {
    id,
    name,
    category,
    displayName: displayName ?? name,
  };
}

const householdEssentialCatalog: Food[] = [
  createFood(1, "Eggs", "Dairy & Eggs"),
  createFood(2, "Milk", "Dairy & Eggs"),
  createFood(3, "Whole Milk", "Dairy & Eggs"),
  createFood(4, "Low-fat Milk", "Dairy & Eggs"),
  createFood(5, "Skim Milk", "Dairy & Eggs"),
  createFood(6, "Almond Milk", "Dairy & Eggs"),
  createFood(7, "Oat Milk", "Dairy & Eggs"),
  createFood(8, "Yogurt", "Dairy & Eggs"),
  createFood(9, "Greek", "Dairy & Eggs"),
  createFood(10, "Regular", "Dairy & Eggs", "Regular Yogurt"),
  createFood(11, "Skyr", "Dairy & Eggs", "Skyr"),
  createFood(12, "Kefir", "Dairy & Eggs", "Kefir"),
  createFood(13, "Plant-Based", "Dairy & Eggs", "Plant-Based Yogurt"),
  createFood(14, "Rice", "Grains & Carbs", "Rice"),
  createFood(15, "White Rice", "Grains & Carbs", "White Rice"),
  createFood(16, "Brown Rice", "Grains & Carbs", "Brown Rice"),
  createFood(17, "Jasmine", "Grains & Carbs", "Jasmine Rice"),
  createFood(18, "Basmati", "Grains & Carbs", "Basmati Rice"),
  createFood(19, "Pasta", "Grains & Carbs", "Pasta"),
  createFood(20, "Spaghetti", "Grains & Carbs", "Spaghetti"),
  createFood(21, "Fettuccine", "Grains & Carbs", "Fettuccine"),
  createFood(22, "Linguine", "Grains & Carbs", "Linguine"),
  createFood(23, "Rigatoni", "Grains & Carbs", "Rigatoni"),
  createFood(24, "Macaroni", "Grains & Carbs", "Macaroni"),
  createFood(25, "Penne", "Grains & Carbs", "Penne"),
  createFood(26, "Fusilli", "Grains & Carbs", "Fusilli"),
  createFood(27, "Ravioli", "Grains & Carbs", "Ravioli"),
  createFood(28, "Tortellini", "Grains & Carbs", "Tortellini"),
  createFood(29, "Lasagna", "Grains & Carbs", "Lasagna"),
  createFood(30, "Whole Wheat", "Grains & Carbs", "Whole Wheat Pasta"),
  createFood(31, "Gluten-Free", "Grains & Carbs", "Gluten-Free Pasta"),
  createFood(32, "Bread", "Grains & Carbs", "Bread"),
  createFood(33, "White Bread", "Grains & Carbs", "White Bread"),
  createFood(34, "Whole Grain Bread", "Grains & Carbs", "Whole Grain Bread"),
  createFood(35, "Baguette", "Grains & Carbs", "Baguette"),
  createFood(36, "Sourdough", "Grains & Carbs", "Sourdough"),
  createFood(37, "Rye", "Grains & Carbs", "Rye Bread"),
  createFood(38, "Brioche", "Grains & Carbs", "Brioche"),
  createFood(39, "Naan", "Grains & Carbs", "Naan"),
  createFood(40, "Pita", "Grains & Carbs", "Pita"),
  createFood(41, "Tortilla", "Grains & Carbs", "Tortilla"),
  createFood(42, "Vegetables", "Produce", "Vegetables"),
  createFood(43, "Tomatoes", "Produce", "Tomatoes"),
  createFood(44, "Onions", "Produce", "Onions"),
  createFood(45, "Potatoes", "Produce", "Potatoes"),
  createFood(46, "Cabbage", "Produce", "Cabbage"),
  createFood(47, "Lettuce", "Produce", "Lettuce"),
  createFood(48, "Bell Peppers", "Produce", "Bell Peppers"),
  createFood(49, "Carrots", "Produce", "Carrots"),
  createFood(50, "Broccoli", "Produce", "Broccoli"),
  createFood(51, "Cucumbers", "Produce", "Cucumbers"),
  createFood(52, "Eggplant", "Produce", "Eggplant"),
  createFood(53, "Corn", "Produce", "Corn"),
  createFood(54, "Zucchini", "Produce", "Zucchini"),
  createFood(55, "Mushroom", "Produce", "Mushroom"),
  createFood(56, "Cauliflower", "Produce", "Cauliflower"),
  createFood(57, "Celery", "Produce", "Celery"),
  createFood(58, "Radish", "Produce", "Radish"),
  createFood(59, "Asparagus", "Produce", "Asparagus"),
  createFood(60, "Fruits", "Produce", "Fruits"),
  createFood(61, "Bananas", "Produce", "Bananas"),
  createFood(62, "Watermelons", "Produce", "Watermelons"),
  createFood(63, "Apples", "Produce", "Apples"),
  createFood(64, "Oranges", "Produce", "Oranges"),
  createFood(65, "Grapes", "Produce", "Grapes"),
  createFood(66, "Mangoes", "Produce", "Mangoes"),
  createFood(67, "Pineapples", "Produce", "Pineapples"),
  createFood(68, "Strawberries", "Produce", "Strawberries"),
  createFood(69, "Blueberries", "Produce", "Blueberries"),
  createFood(70, "Kiwi", "Produce", "Kiwi"),
  createFood(71, "Lemon", "Produce", "Lemon"),
  createFood(72, "Lime", "Produce", "Lime"),
  createFood(73, "Pomegranate", "Produce", "Pomegranate"),
  createFood(74, "Cherries", "Produce", "Cherries"),
  createFood(75, "Avocado", "Produce", "Avocado"),
  createFood(76, "Beans", "Legumes, Nuts & Seeds", "Beans"),
  createFood(77, "Black Beans", "Legumes, Nuts & Seeds", "Black Beans"),
  createFood(78, "Chickpeas", "Legumes, Nuts & Seeds", "Chickpeas"),
  createFood(79, "Kidney Beans", "Legumes, Nuts & Seeds", "Kidney Beans"),
  createFood(80, "Pinto Beans", "Legumes, Nuts & Seeds", "Pinto Beans"),
  createFood(81, "White Beans", "Legumes, Nuts & Seeds", "White Beans"),
  createFood(82, "Soybeans", "Legumes, Nuts & Seeds", "Soybeans"),
  createFood(83, "Chicken", "Meat & Poultry", "Chicken"),
  createFood(84, "Breast", "Meat & Poultry", "Chicken Breast"),
  createFood(85, "Thighs", "Meat & Poultry", "Chicken Thighs"),
  createFood(86, "Wings", "Meat & Poultry", "Chicken Wings"),
  createFood(87, "Whole Chicken", "Meat & Poultry", "Whole Chicken"),
  createFood(88, "Ground Chicken", "Meat & Poultry", "Ground Chicken"),
  createFood(89, "Beef", "Meat & Poultry", "Beef"),
  createFood(90, "Ground Beef", "Meat & Poultry", "Ground Beef"),
  createFood(91, "Steak", "Meat & Poultry", "Steak"),
  createFood(92, "Stew Meat", "Meat & Poultry", "Stew Meat"),
  createFood(93, "Ribs", "Meat & Poultry", "Ribs"),
  createFood(94, "Fish", "Seafood", "Fish"),
  createFood(95, "Salmon", "Seafood", "Salmon"),
  createFood(96, "Tuna", "Seafood", "Tuna"),
  createFood(97, "Cod", "Seafood", "Cod"),
  createFood(98, "Haddock", "Seafood", "Haddock"),
  createFood(99, "Pollock", "Seafood", "Pollock"),
  createFood(100, "Butter", "Dairy & Eggs", "Butter"),
  createFood(101, "Salted", "Dairy & Eggs", "Salted Butter"),
  createFood(102, "Unsalted", "Dairy & Eggs", "Unsalted Butter"),
  createFood(103, "Margarine", "Dairy & Eggs", "Margarine"),
  createFood(104, "Ghee", "Dairy & Eggs", "Ghee"),
  createFood(105, "Cheese", "Dairy & Eggs", "Cheese"),
  createFood(106, "Cheddar", "Dairy & Eggs", "Cheddar"),
  createFood(107, "Mozzarella", "Dairy & Eggs", "Mozzarella"),
  createFood(108, "Parmeasan", "Dairy & Eggs", "Parmesan"),
  createFood(109, "Feta", "Dairy & Eggs", "Feta"),
  createFood(110, "Cream Cheese", "Dairy & Eggs", "Cream Cheese"),
  createFood(111, "Cottage Cheese", "Dairy & Eggs", "Cottage Cheese"),
  createFood(112, "Oil", "Pantry & Seasonings", "Oil"),
  createFood(113, "Olive Oil", "Pantry & Seasonings", "Olive Oil"),
  createFood(114, "Vegetable Oil", "Pantry & Seasonings", "Vegetable Oil"),
  createFood(115, "Canola Oil", "Pantry & Seasonings", "Canola Oil"),
  createFood(116, "Coconut Oil", "Pantry & Seasonings", "Coconut Oil"),
  createFood(117, "Sesame Oil", "Pantry & Seasonings", "Sesame Oil"),
  createFood(118, "Avocado Oil", "Pantry & Seasonings", "Avocado Oil"),
];

function titleCase(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseAlternates(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }
    } catch {}
  }

  return [];
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "");
}

function getMatchPriority(food: Food, query: string): number {
  const normalizedQuery = normalizeText(query);
  const candidates = [food.name, ...parseAlternates(food.alternate_names)];

  return candidates.some(
    (candidate) => normalizeText(candidate) === normalizedQuery,
  )
    ? 0
    : 1;
}

export async function searchIngredients(query: string): Promise<Food[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) return [];

  const baseQuery = supabase
    .from("foods")
    .select("id, name, category, alternate_names, popularity")
    .order("popularity", { ascending: false })
    .limit(50);

  let { data, error } = await baseQuery.ilike("name", `%${cleanQuery}%`);

  if (error) {
    console.error(error);
    return [];
  }

  if (!data || data.length === 0) {
    const fallbackResponse = await supabase
      .from("foods")
      .select("id, name, category, alternate_names, popularity")
      .order("popularity", { ascending: false })
      .limit(200);

    if (fallbackResponse.error) {
      console.error(fallbackResponse.error);
      return [];
    }

    const lowerQuery = cleanQuery.toLowerCase();
    data = (fallbackResponse.data ?? []).filter((food) => {
      const alternates = parseAlternates(food.alternate_names);
      return alternates.some((alt) => alt.toLowerCase().includes(lowerQuery));
    });
  }

  if (error) {
    console.error(error);
    return [];
  }

  const formatted = (data ?? [])
    .map((food) => {
      let displayName = food.name;

      const alternates = parseAlternates(food.alternate_names);

      if (food.name.includes(",") && alternates.length > 0) {
        const betterName = alternates.find((a) => !a.includes(","));

        if (betterName) {
          displayName = titleCase(betterName);
        }
      }

      return {
        ...food,
        displayName,
      } as Food;
    })
    .sort((a, b) => {
      const aPriority = getMatchPriority(a, cleanQuery);
      const bPriority = getMatchPriority(b, cleanQuery);
      return aPriority - bPriority;
    });

  return formatted;
}

export function searchHouseholdEssentials(query: string): Food[] {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) return [];

  return householdEssentialCatalog.filter((food) => {
    const haystacks = [food.name, food.displayName, food.category];
    return haystacks.some((value) => value.toLowerCase().includes(cleanQuery));
  });
}
