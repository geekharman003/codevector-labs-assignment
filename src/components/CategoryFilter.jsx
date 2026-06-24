import { useState, useEffect } from "react";
import supabase from "../config/supabase";

export default function CategoryFilter({ selectedCategories, handleCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.rpc("get_distinct_categories");
        setCategories(data);
      } catch (error) {
        setCategories([]);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:fixed">
      <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
      <div className="space-y-3">
        {categories.map(({ category }) => (
          <label
            key={category}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4 rounded border-border bg-background cursor-pointer"
            />
            <span className="text-foreground hover:text-primary transition">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
