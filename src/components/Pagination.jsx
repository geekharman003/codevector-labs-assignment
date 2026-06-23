import { ChevronLeft, ChevronRight } from "lucide-react";
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
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    try {
      if (selectedCategories.length > 0) {
        const { data } = await supabase
          .from("products")
          .select("id,name,category,price")
          .in("category", selectedCategories)
          .gt("id", cursor)
          .limit(limit);

        setProducts(data);
        setCursor(data[data.length - 1].id);
      } else {
        const { data } = await supabase
          .from("products")
          .select("id,name,category,price")
          .gt("id", cursor)
          .limit(limit);

        setProducts(data);
        setCursor(data[data.length - 1].id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function loadPrevPageData() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    try {
      if (selectedCategories.length > 0) {
        const { data } = await supabase
          .from("products")
          .select("id,name,category,price")
          .in("category", selectedCategories)
          .order("id", { ascending: false })
          .lt("id", cursor)
          .limit(limit);
        console.log(data);

        setProducts(data);
        setCursor(data[data.length - 1].id);
      } else {
        const { data } = await supabase
          .from("products")
          .select("id,name,category,price")
          .order("id", { ascending: false })
          .gt("id", cursor)
          .limit(limit);
        console.log(data);

        setProducts(data);
        setCursor(data[data.length - 1].id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            loadPrevPageData();
          }
        }}
        disabled={currentPage === 1}
        className="flex items-center p-2 rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>
      <button
        onClick={() => {
          if (currentPage != totalPages) {
            console.log(currentPage);
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
