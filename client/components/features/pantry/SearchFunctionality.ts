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
  createFood(9, "Greek Yogurt", "Dairy & Eggs"),
  createFood(10, "Regular Yogurt", "Dairy & Eggs"),
  createFood(11, "Skyr", "Dairy & Eggs", "Skyr"),
  createFood(12, "Kefir", "Dairy & Eggs", "Kefir"),
  createFood(13, "Plant-Based Yogurt", "Dairy & Eggs"),
  createFood(14, "Rice", "Grains & Carbs", "Rice"),
  createFood(15, "White Rice", "Grains & Carbs"),
  createFood(16, "Brown Rice", "Grains & Carbs"),
  createFood(17, "Jasmine Rice", "Grains & Carbs"),
  createFood(18, "Basmati Rice", "Grains & Carbs", "Basmati Rice"),
  createFood(19, "Pasta", "Grains & Carbs"),
  createFood(20, "Spaghetti", "Grains & Carbs"),
  createFood(21, "Fettuccine", "Grains & Carbs"),
  createFood(22, "Linguine", "Grains & Carbs"),
  createFood(23, "Rigatoni", "Grains & Carbs"),
  createFood(24, "Macaroni", "Grains & Carbs"),
  createFood(25, "Penne", "Grains & Carbs"),
  createFood(26, "Fusilli", "Grains & Carbs"),
  createFood(27, "Ravioli", "Grains & Carbs"),
  createFood(28, "Tortellini", "Grains & Carbs"),
  createFood(29, "Lasagna", "Grains & Carbs"),
  createFood(30, "Whole Wheat Pasta", "Grains & Carbs"),
  createFood(31, "Gluten-Free Pasta", "Grains & Carbs"),
  createFood(32, "Bread", "Grains & Carbs"),
  createFood(33, "White Bread", "Grains & Carbs"),
  createFood(34, "Whole Grain Bread", "Grains & Carbs"),
  createFood(35, "Baguette", "Grains & Carbs"),
  createFood(36, "Sourdough", "Grains & Carbs"),
  createFood(37, "Rye", "Grains & Carbs"),
  createFood(38, "Brioche", "Grains & Carbs"),
  createFood(39, "Naan", "Grains & Carbs"),
  createFood(40, "Pita", "Grains & Carbs"),
  createFood(41, "Tortilla", "Grains & Carbs"),
  createFood(42, "Vegetables", "Produce"),
  createFood(43, "Tomatoes", "Produce"),
  createFood(44, "Onions", "Produce"),
  createFood(45, "Potatoes", "Produce"),
  createFood(46, "Cabbage", "Produce"),
  createFood(47, "Lettuce", "Produce"),
  createFood(48, "Bell Peppers", "Produce"),
  createFood(49, "Carrots", "Produce"),
  createFood(50, "Broccoli", "Produce"),
  createFood(51, "Cucumbers", "Produce"),
  createFood(52, "Eggplant", "Produce"),
  createFood(53, "Corn", "Produce"),
  createFood(54, "Zucchini", "Produce"),
  createFood(55, "Mushroom", "Produce"),
  createFood(56, "Cauliflower", "Produce"),
  createFood(57, "Celery", "Produce"),
  createFood(58, "Radish", "Produce"),
  createFood(59, "Asparagus", "Produce"),
  createFood(60, "Fruits", "Produce"),
  createFood(61, "Bananas", "Produce"),
  createFood(62, "Watermelons", "Produce"),
  createFood(63, "Apples", "Produce"),
  createFood(64, "Oranges", "Produce"),
  createFood(65, "Grapes", "Produce"),
  createFood(66, "Mangoes", "Produce"),
  createFood(67, "Pineapples", "Produce"),
  createFood(68, "Strawberries", "Produce"),
  createFood(69, "Blueberries", "Produce"),
  createFood(70, "Kiwi", "Produce"),
  createFood(71, "Lemon", "Produce"),
  createFood(72, "Lime", "Produce"),
  createFood(73, "Pomegranate", "Produce"),
  createFood(74, "Cherries", "Produce"),
  createFood(75, "Avocado", "Produce"),
  createFood(76, "Beans", "Legumes, Nuts & Seeds"),
  createFood(77, "Black Beans", "Legumes, Nuts & Seeds"),
  createFood(78, "Chickpeas", "Legumes, Nuts & Seeds"),
  createFood(79, "Kidney Beans", "Legumes, Nuts & Seeds"),
  createFood(80, "Pinto Beans", "Legumes, Nuts & Seeds"),
  createFood(81, "White Beans", "Legumes, Nuts & Seeds"),
  createFood(82, "Soybeans", "Legumes, Nuts & Seeds"),
  createFood(83, "Chicken", "Meat & Poultry"),
  createFood(84, "Chicken Breast", "Meat & Poultry"),
  createFood(85, "Chicken Thighs", "Meat & Poultry"),
  createFood(86, "Chicken Wings", "Meat & Poultry"),
  createFood(87, "Whole Chicken", "Meat & Poultry"),
  createFood(88, "Ground Chicken", "Meat & Poultry"),
  createFood(89, "Beef", "Meat & Poultry"),
  createFood(90, "Ground Beef", "Meat & Poultry"),
  createFood(91, "Steak", "Meat & Poultry"),
  createFood(92, "Stew Meat", "Meat & Poultry"),
  createFood(93, "Ribs", "Meat & Poultry"),
  createFood(94, "Fish", "Seafood"),
  createFood(95, "Salmon", "Seafood"),
  createFood(96, "Tuna", "Seafood"),
  createFood(97, "Cod", "Seafood"),
  createFood(98, "Haddock", "Seafood"),
  createFood(99, "Pollock", "Seafood"),
  createFood(100, "Butter", "Dairy & Eggs"),
  createFood(101, "Salted Butter", "Dairy & Eggs"),
  createFood(102, "Unsalted Butter", "Dairy & Eggs"),
  createFood(103, "Margarine", "Dairy & Eggs"),
  createFood(104, "Ghee", "Dairy & Eggs"),
  createFood(105, "Cheese", "Dairy & Eggs"),
  createFood(106, "Cheddar Cheese", "Dairy & Eggs"),
  createFood(107, "Mozzarella Cheese", "Dairy & Eggs"),
  createFood(108, "Parmesan Cheese", "Dairy & Eggs"),
  createFood(109, "Feta Cheese", "Dairy & Eggs"),
  createFood(110, "Cream Cheese", "Dairy & Eggs"),
  createFood(111, "Cottage Cheese", "Dairy & Eggs"),
  createFood(112, "Oil", "Pantry & Seasonings"),
  createFood(113, "Olive Oil", "Pantry & Seasonings"),
  createFood(114, "Vegetable Oil", "Pantry & Seasonings"),
  createFood(115, "Canola Oil", "Pantry & Seasonings"),
  createFood(116, "Coconut Oil", "Pantry & Seasonings"),
  createFood(117, "Sesame Oil", "Pantry & Seasonings"),
  createFood(118, "Avocado Oil", "Pantry & Seasonings"),
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
