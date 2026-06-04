import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/lib/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getCollectionItems();
        // Show only first 3 products for the collection preview
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="collections" className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Curated Collection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 mb-6">
            Timeless{" "}
            <span className="text-gradient-gold">Masterpieces</span>
          </h2>
          <p className="text-muted-foreground">
            Each piece is handcrafted by master artisans with decades of experience,
            using only the finest quality marble sourced from Rajasthan.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className="h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No products found.
            </div>
          )}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:shadow-gold transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
