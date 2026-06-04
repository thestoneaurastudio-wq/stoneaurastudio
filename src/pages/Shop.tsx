import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { Product } from "@/lib/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProductCard from "@/components/ProductCard";

const categoryGroups: Record<string, string[]> = {
  "Statue Gods": ["Lord Ganesh", "Lord Shiva", "Lord Vishnu", "Lord Krishna", "Lord Hanuman", "Lord Buddha"],
  "Statue Goddess": ["Goddess Durga", "Goddess Lakshmi", "Goddess Saraswati", "Radha Rani"],
  "Temple & Mandir": ["Home Mandir", "Pooja Mandir", "Wall Mounted Mandir"],
  "Decor Items": ["Wall Murals", "Wall Panels", "Fountains", "Planters"],
};

const categories = ["All", "Statue Gods", "Statue Goddess", "Temple & Mandir", "Decor Items"];

const priceBands = [
  { label: "Under Rs. 10,000", value: "under-10000" },
  { label: "Rs. 10,000 - 50,000", value: "10000-50000" },
  { label: "Above Rs. 50,000", value: "50000-plus" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Local state for search input to prevent cursor jump/lag
  const [searchQuery, setSearchQuery] = useState(searchParams.get("sub") || "");

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get("sub") || "");
  }, [searchParams]);

  // Derived states from URL parameters
  const selectedCategory = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "featured";
  const selectedType = (searchParams.get("type") as "all" | "ready" | "custom") || "all";
  const availability = (searchParams.get("availability") as "all" | "in-stock" | "made-to-order") || "all";
  const priceBand = searchParams.get("price") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Use dummy products as fallback to ensure UI shows something
        const { products: dummyProducts } = await import('@/lib/products');
        setProducts(dummyProducts as Product[]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "All" || value === "featured") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    // If category changes, remove subcategory query to keep it clean
    if (key === "category") {
      newParams.delete("sub");
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete("sub");
    } else {
      newParams.set("sub", val);
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const productName = product.name || "";
      const productCategory = product.category || "";
      const productSubCategory = product.subCategory || "";
      const productMaterial = product.material || "";
      const search = searchQuery.toLowerCase();
      const price = parseInt((product.price || "0").replace(/[^\d]/g, "")) || 0;
      const isReady = product.type === "ready";

      const matchesSearch =
        productName.toLowerCase().includes(search) ||
        productCategory.toLowerCase().includes(search) ||
        productSubCategory.toLowerCase().includes(search) ||
        productMaterial.toLowerCase().includes(search);

      let matchesCategory = false;
      if (selectedCategory === "All") {
        matchesCategory = true;
      } else {
        const group = categoryGroups[selectedCategory];
        matchesCategory =
          productCategory === selectedCategory ||
          productSubCategory === selectedCategory ||
          (!!group && (group.includes(productCategory) || group.includes(productSubCategory)));
      }

      const matchesType = selectedType === "all" ? true : product.type === selectedType;
      const matchesAvailability =
        availability === "all"
          ? true
          : availability === "in-stock"
            ? isReady
            : !isReady;

      const matchesPriceBand =
        priceBand === "all"
          ? true
          : priceBand === "under-10000"
            ? price < 10000
            : priceBand === "10000-50000"
              ? price >= 10000 && price <= 50000
              : price > 50000;

      return matchesSearch && matchesCategory && matchesType && matchesAvailability && matchesPriceBand;
    });

    const result = [...filtered];

    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const priceA = parseInt((a.price || "0").replace(/[^\d]/g, "")) || 0;
        const priceB = parseInt((b.price || "0").replace(/[^\d]/g, "")) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const priceA = parseInt((a.price || "0").replace(/[^\d]/g, "")) || 0;
        const priceB = parseInt((b.price || "0").replace(/[^\d]/g, "")) || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "ready-first") {
      result.sort((a, b) => Number(b.type === "ready") - Number(a.type === "ready"));
    } else if (sortBy === "featured") {
      const featuredTags = ["Bestseller", "Featured", "Most Popular", "Top Rated", "Festive Pick"];
      result.sort((a, b) => {
        const aFeatured = featuredTags.includes(a.tag || "") ? 1 : 0;
        const bFeatured = featuredTags.includes(b.tag || "") ? 1 : 0;
        return bFeatured - aFeatured;
      });
    }

    return result;
  }, [availability, priceBand, products, searchQuery, selectedCategory, selectedType, sortBy]);

  const readyProducts = filteredProducts.filter((product) => product.type === "ready").length;
  const customProducts = filteredProducts.filter((product) => product.type === "custom").length;

  const activeFilters = [
    selectedCategory !== "All" ? selectedCategory : null,
    selectedType !== "all" ? (selectedType === "ready" ? "Ready to buy" : "Custom order") : null,
    availability !== "all" ? (availability === "in-stock" ? "In stock" : "Made to order") : null,
    priceBand !== "all" ? priceBands.find((band) => band.value === priceBand)?.label ?? null : null,
  ].filter(Boolean) as string[];

  const clearFilters = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  const getCategoryCount = (category: string) => {
    if (category === "All") return products.length;
    return products.filter((product) => {
      const pCat = product.category || "";
      const pSub = product.subCategory || "";
      const group = categoryGroups[category];
      return (
        pCat === category ||
        pSub === category ||
        (!!group && (group.includes(pCat) || group.includes(pSub)))
      );
    }).length;
  };

  const renderFilterSidebar = (isMobile: boolean) => {
    const content = (
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Category</p>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilter("category", category)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "bg-secondary/35 text-foreground hover:bg-secondary/60"
                }`}
              >
                <span>{category}</span>
                <span className={`text-xs ${selectedCategory === category ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Buying Mode</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Ready", value: "ready" },
              { label: "Custom", value: "custom" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilter("type", option.value)}
                className={`rounded-2xl border py-2.5 text-center text-xs font-medium transition-all ${
                  selectedType === option.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border bg-white hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Availability</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "All", value: "all" },
              { label: "In Stock", value: "in-stock" },
              { label: "Made to Order", value: "made-to-order" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilter("availability", option.value)}
                className={`rounded-2xl border py-2.5 text-center text-xs font-medium transition-all ${
                  availability === option.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border bg-white hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Price Range</p>
          <div className="grid gap-2">
            <button
              onClick={() => updateFilter("price", "all")}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                priceBand === "all"
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border bg-white hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              All price points
            </button>
            {priceBands.map((band) => (
              <button
                key={band.value}
                onClick={() => updateFilter("price", band.value)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                  priceBand === band.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border bg-white hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <div className="space-y-6 pb-6">
          {content}
          
          <div className="rounded-2xl bg-charcoal p-5 text-primary-foreground shadow-sm">
            <p className="text-sm font-semibold">Why customers trust StoneAura</p>
            <div className="mt-4 space-y-3 text-xs text-primary-foreground/75">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>Secure packaging and premium stone finish on every order</span>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>Pan-India delivery support with assisted coordination</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>Custom carving options for mandirs, idols, and decor pieces</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Refine results</p>
              <p className="text-xs text-muted-foreground">Shopping-style filters for faster discovery</p>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-primary hover:text-primary">
              Reset
            </Button>
          </div>
          {content}
        </div>

        <div className="rounded-3xl bg-charcoal p-5 text-primary-foreground shadow-elevated">
          <p className="text-sm font-semibold">Why customers trust StoneAura</p>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>Secure packaging and premium stone finish on every order</span>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>Pan-India delivery support with assisted coordination</span>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>Custom carving options for mandirs, idols, and decor pieces</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Shop | StoneAura Studio - Premium Marble Mandirs & Idols</title>
        <meta
          name="description"
          content="Browse our collection of handcrafted marble mandirs, idols, wall panels, and decor items. Premium Makrana marble with Pan-India delivery."
        />
      </Helmet>

      <Header />

      <main className="bg-gradient-to-b from-secondary/30 via-background to-background pb-20 pt-28">
        <section className="pb-6">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-serif text-foreground">
              Stone <span className="text-gradient-gold">Collections</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Browse our handcrafted marble deities, mandirs, and custom designs.
            </p>
          </div>
        </section>

        <section className="sticky top-20 z-40 border-y border-border/70 bg-background/90 py-4 backdrop-blur-md">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 xl:flex-1 xl:flex-row xl:items-center">
                <div className="relative flex-1 xl:max-w-xl">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by product, material, or category..."
                    className="h-11 rounded-full border-border/70 bg-white pl-10 focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => updateFilter("category", category)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-gold"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-11 rounded-full bg-white lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[92vw] max-w-sm overflow-y-auto bg-background">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Shop Filters</SheetTitle>
                    </SheetHeader>
                    {renderFilterSidebar(true)}
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-11 rounded-full bg-white">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={(val) => updateFilter("sort", val)}>
                      <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="ready-first">Ready to Buy First</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">Name: A to Z</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[300px,minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-40">{renderFilterSidebar(false)}</div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/70 bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <PackageCheck className="h-4 w-4 text-primary" />
                      <span>{filteredProducts.length} products found</span>
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">Browse with faster discovery</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Better filters, clearer cards, and easier comparison for shopping like a real ecommerce store.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeFilters.length > 0 ? (
                      activeFilters.map((filter) => (
                        <span
                          key={filter}
                          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
                        >
                          {filter}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2 text-xs font-semibold text-muted-foreground">
                        No extra filters applied
                      </span>
                    )}
                    {activeFilters.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-full text-xs text-muted-foreground">
                        <X className="mr-1 h-3.5 w-3.5" />
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-border bg-white px-6 py-20 text-center">
                  <h3 className="mb-2 text-xl font-semibold">No products found</h3>
                  <p className="text-muted-foreground">Showing all available products as fallback.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-4 text-primary">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
              Looking for Something Custom?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              We specialize in creating bespoke marble pieces tailored to your exact
              specifications. Share your vision with us.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-gradient-gold px-8 hover:shadow-gold">
                Request Custom Design
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Shop;
