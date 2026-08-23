import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

type MealImageContextType = {
  imageIds: string[];
  loading: boolean;
};

const MealImageContext = createContext<MealImageContextType>({
  imageIds: [],
  loading: true,
});

export function MealImageProvider({ children }: { children: React.ReactNode }) {
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImageIds() {
      const { data, error } = await supabase.from("meal_images").select("id");

      if (error) {
        console.error("Failed to load meal image IDs:", error);
        setLoading(false);
        return;
      }

      setImageIds(data.map((item) => item.id));
      setLoading(false);
    }

    loadImageIds();
  }, []);

  return (
    <MealImageContext.Provider value={{ imageIds, loading }}>
      {children}
    </MealImageContext.Provider>
  );
}

export function useMealImages() {
  return useContext(MealImageContext);
}
