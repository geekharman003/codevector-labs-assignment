import { ShoppingCart } from "lucide-react";


export default function ProductCard({ product }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
        //   src={product.image}
          alt={product.name}
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Footer - Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ₹{product.price}
          </span>
          <button
            className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
