import { ChevronRight } from "lucide-react";
import supabase from "../config/supabase";

export default function Pagination({
  cursor,
  setCursor,
  setProducts,
  currentPage,
  setCurrentPage,
  totalPages,
  selectedCategories,
  limit,
}) {
  async function loadNextPageData() {
    try {
      if (selectedCategories.length > 0) {
        loadProductsWithCategories();
      } else {
        loadProductsWithoutCategories();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProductsWithCategories() {
    const { data } = await supabase
      .from("products")
      .select("id,name,category,price")
      .in("category", selectedCategories)
      .lt("id", cursor)
      .order("id", { ascending: false })
      .limit(limit);

    console.log(data);

    if (data.length) {
      const lastRecord = data[data.length - 1];
      setProducts((prev) => [...prev, ...data]); //appending next page products to previous state
      setCursor(lastRecord.id);
    }
  }

  async function loadProductsWithoutCategories() {
    const { data } = await supabase
      .from("products")
      .select("id,name,category,price")
      .lt("id", cursor)
      .order("id", { ascending: false })
      .limit(limit);

    console.log(data);

    if (data.length) {
      const lastRecord = data[data.length - 1];
      setProducts((prev) => [...prev, ...data]); //appending next page products to previous state
      setCursor(lastRecord.id);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => {
          if (currentPage != totalPages) {
            setCurrentPage(currentPage + 1);
            loadNextPageData();
          }
        }}
        disabled={currentPage === totalPages}
        className="flex items-center p-2 rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
