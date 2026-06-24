"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import supabase from "../config/supabase";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  async function setProductsWithoutCategories() {
    const { data } = await supabase
      .from("products")
      .select("id,name,category,price")
      .order("id", { ascending: false })
      .limit(ITEMS_PER_PAGE);

    if (data.length) {
      const lastRecord = data[data.length - 1];

      // calculating count of products with all categories
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact" });

      setProducts(data);
      setCursor(lastRecord.id);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      setTotalRecords(count);
      setCurrentPage(1);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setProductsWithoutCategories();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //memoizing the function so that it will only run when categories got change
  const setProductsWithCategories = useCallback(async () => {
    const { data } = await supabase
      .from("products")
      .select("id,name,category,price")
      .in("category", selectedCategories)
      .order("id", { ascending: false })
      .limit(ITEMS_PER_PAGE);

    if (data.length) {
      const lastRecord = data[data.length - 1];

      // calculating count of products with these categories
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .in("category", selectedCategories);

      setProducts(data);
      setCursor(lastRecord.id);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      setTotalRecords(count);
      setCurrentPage(1);
    }
  }, [selectedCategories]);

  // Filter products based on selected categories
  useEffect(() => {
    (async () => {
      setCurrentPage(0);
      setCursor(0);
      setTotalPages(0);
      setTotalRecords(0);

      try {
        // if categories filters is applied
        if (selectedCategories.length > 0) {
          setProductsWithCategories();
        } else {
          // if no filter has applied
          setProductsWithoutCategories();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCategories, setProductsWithCategories]);

  function handleCategoryChange(category) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSelectedCategories((prev) => {
      return prev.includes(category)
        ? prev.filter((c) => c != category)
        : [...prev, category];
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Our Products
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of {totalRecords} product
            {totalRecords !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Category Filter */}
          <div className="md:col-span-1">
            <CategoryFilter
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Main Content - Products */}
          <div className="md:col-span-3">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {
                  <Pagination
                    cursor={cursor}
                    setCursor={setCursor}
                    setProducts={setProducts}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    selectedCategories={selectedCategories}
                    limit={ITEMS_PER_PAGE}
                  />
                }
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
