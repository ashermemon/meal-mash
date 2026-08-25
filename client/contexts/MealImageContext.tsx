import React, { createContext, useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { supabase } from "@/utils/supabase";

export type MealImage = {
  id: string;
  url: string;
};

type MealImageContextType = {
  mealImages: MealImage[];
  loading: boolean;
};

const MealImageContext = createContext<MealImageContextType>({
  mealImages: [],
  loading: true,
});

export function MealImageProvider({ children }: { children: React.ReactNode }) {
  const [mealImages, setMealImages] = useState<MealImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMealImages() {
      const { data, error } = await supabase
        .from("meal_images")
        .select("id, url");

      if (error) {
        console.error("Failed to load meal images:", error);
        setLoading(false);
        return;
      }

      setMealImages(data ?? []);
      setLoading(false);
      Image.prefetch((data ?? []).map((image) => image.url));
    }

    loadMealImages();
  }, []);

  return (
    <MealImageContext.Provider value={{ mealImages, loading }}>
      {children}
    </MealImageContext.Provider>
  );
}

export function useMealImages() {
  return useContext(MealImageContext);
}
