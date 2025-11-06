import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileProductShowcase from "@/components/MobileProductShowcase";

import ChainProductModal from "@/components/ChainProductModal";
import BraceletProductModal from "@/components/BraceletProductModal";
import EarringProductModal from "@/components/EarringProductModal";
import GrillzProductModal from "@/components/GrillzProductModal";
import WatchProductModal from "@/components/WatchProductModal";
import PendantProductModal from "@/components/PendantProductModal";
import HipHopRingProductModal from "@/components/HipHopRingProductModal";
import EngagementRingProductModal from "@/components/EngagementRingProductModal";
import GlassesProductModal from "@/components/GlassesProductModal";
import CustomProductModal from "@/components/CustomProductModal";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductData {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  category: string;
  norm_category?: string;
  material: string;
  image_url: string;
  rating?: number;
  review_count?: number;
  in_stock?: boolean;
  ships_today?: boolean;
  featured?: boolean;
  source_table?: string;
  source_id?: string;
  description?: string;
  color: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  stripe_product_id: string;
  stripe_price_id?: string;
  sizes?: string[];
  lengths_and_prices?: any;
  gemstone?: string;
  diamond_cut?: string;
  chain_type?: string;
  frame_style?: string;
  lens_color?: string;
  style?: string;
  teeth_count?: string;
  shape?: string;
  carat_weight?: string;
  cut_quality?: string;
  clarity_grade?: string;
  customizable?: boolean;
  [key: string]: any;
}

const TABLES = [
  "chain_products",
  "bracelet_products",
  "earring_products",
  "grillz_products",
  "watch_products",
  "pendant_products",
  "hip_hop_ring_products",
  "engagement_ring_products",
  "glasses_products",
  "diamond_products",
  "vvs_simulant_products",
  "custom_products",
] as const;

const NAVBAR_CATEGORIES = [
  "all",
  "chains",
  "bracelets",
  "watches",
  "pendants",
  "earrings",
  "custom",
  "grillz",
  "glasses",
  "rings",
  "engagement rings",
  "diamond",
  "diamond simulants",
] as const;

const ITEMS_PER_PAGE = 24;
const PER_TABLE_LIMIT = 20;

const clean = (s?: string) =>
  (s || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeCategory = (rawCategory?: string, rawType?: string) => {
  const c = (rawCategory || rawType || "").toLowerCase();
  if (!c) return "all";

  if (c.startsWith("chain")) return "chains";
  if (c.startsWith("bracelet")) return "bracelets";
  if (c.startsWith("watch")) return "watches";
  if (c.includes("pendant")) return "pendants";
  if (c.startsWith("earring")) return "earrings";
  if (c.includes("grill")) return "grillz";
  if (c.includes("glass")) return "glasses";
  if (c.includes("engagement")) return "engagement rings";
  if (c.includes("ring")) return "rings";
  if (c.includes("simulant") || c.includes("moissanite")) return "diamond simulants";
  if (c.includes("diamond")) return "diamond";
  if (c.includes("custom")) return "custom";

  return c;
};

const BestDeals = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [fullProductData, setFullProductData] = useState<ProductData | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [tablesLoaded, setTablesLoaded] = useState(4);

  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["all-products-optimized", tablesLoaded],
    queryFn: async () => {
      const all: ProductData[] = [];

      const tablesToLoad = TABLES.slice(0, tablesLoaded);

      await Promise.all(
        tablesToLoad.map(async (tableName) => {
          try {
            const { data, error } = await supabase
              .from(tableName as any)
              .select("*")
              .order("created_at", { ascending: false })
              .limit(PER_TABLE_LIMIT);

            if (error) {
              console.error(`Error fetching from ${tableName}:`, error);
              return;
            }
            if (!Array.isArray(data)) return;

            const rows = data
              .filter((x: any) => x && typeof x === "object" && typeof x.id === "string" && x.id.trim() !== "")
              .map((p: any): ProductData => {
                const rawCategory = clean(p.category);
                const productType = clean(p.product_type);
                const norm = normalizeCategory(rawCategory, productType);

                return {
                  id: p.id,
                  source_table: tableName,
                  source_id: p.id,
                  name: clean(p.name),
                  price: Number(p.price ?? 0),
                  original_price: p.original_price ?? undefined,
                  category: rawCategory,
                  norm_category: norm,
                  material: clean(p.material),
                  color: clean(p.color),
                  product_type: productType,
                  image_url: p.image_url || "",
                  description: p.description || "",
                  created_at: p.created_at || new Date().toISOString(),
                  updated_at: p.updated_at || new Date().toISOString(),
                  stripe_product_id: p.stripe_product_id || "",
                  stripe_price_id: p.stripe_price_id || undefined,
                  sizes: p.sizes || [],
                  lengths_and_prices: p.lengths_and_prices || [],
                  gemstone: p.gemstone || "",
                  diamond_cut: p.diamond_cut || "",
                  chain_type: p.chain_type || "",
                  frame_style: p.frame_style || "",
                  lens_color: p.lens_color || "",
                  style: p.style || "",
                  teeth_count: p.teeth_count || "",
                  shape: p.shape || "",
                  carat_weight: p.carat_weight || "",
                  cut_quality: p.cut_quality || "",
                  clarity_grade: p.clarity_grade || "",
                  customizable: !!p.customizable,
                  rating: Number(p.rating ?? 5),
                  review_count: Number(p.review_count ?? 0),
                  in_stock: p.in_stock !== undefined ? !!p.in_stock : true,
                  ships_today: !!p.ships_today,
                  featured: !!p.featured,
                };
              });

            all.push(...rows);
          } catch (err) {
            console.error(`Failed to load ${tableName}:`, err);
          }
        }),
      );

      const filteredAll = all.filter((p) => p.id !== "aebcbfff-69a6-4ea7-9f43-40a7d072d2dd");

      const keyOf = (p: ProductData) => {
        const sp = p.stripe_product_id?.toLowerCase();
        const spp = p.stripe_price_id?.toLowerCase();
        if (sp) return `sp:${sp}`;
        if (spp) return `spp:${spp}`;
        return `${p.source_table}:${p.source_id}`;
      };

      const byKey = new Map<string, ProductData>();
      for (const p of filteredAll) {
        const k = keyOf(p);
        const prev = byKey.get(k);
        if (!prev) {
          byKey.set(k, p);
        } else {
          const prevTime = new Date(prev.updated_at || 0).getTime();
          const currTime = new Date(p.updated_at || 0).getTime();
          if (currTime >= prevTime) byKey.set(k, p);
        }
      }

      return Array.from(byKey.values());
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (categoryFilter === "all") return true;
      return (product.norm_category || "all") === categoryFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }, [products, categoryFilter, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const present = new Set(products.map((p) => (p.norm_category || "").toLowerCase()).filter(Boolean));
    return NAVBAR_CATEGORIES.filter((c) => c === "all" || present.has(c));
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, sortBy]);

  const formatPrice = (price: number) => `$${(price / 100).toLocaleString()}`;

  const handleProductClick = async (product: ProductData) => {
    setSelectedProduct(product);
    setFullProductData(product);
  };

  const handleLoadMore = () => {
    if (tablesLoaded < TABLES.length) {
      setTablesLoaded((prev) => Math.min(prev + 4, TABLES.length));
    }
  };

  const renderProductModal = () => {
    if (!selectedProduct || !fullProductData) return null;
    const cat = (
      selectedProduct.norm_category ||
      selectedProduct.category ||
      selectedProduct.product_type ||
      ""
    ).toLowerCase();
    const close = () => {
      setSelectedProduct(null);
      setFullProductData(null);
    };
    if (cat.includes("chain")) return <ChainProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("bracelet")) return <BraceletProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("earring")) return <EarringProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("grill")) return <GrillzProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("watch")) return <WatchProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("pendant")) return <PendantProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("engagement"))
      return <EngagementRingProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("ring")) return <HipHopRingProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("glass")) return <GlassesProductModal product={fullProductData as any} onClose={close} />;
    if (cat.includes("custom")) return <CustomProductModal product={fullProductData as any} onClose={close} />;
    return null;
  };

  if (isLoading && products.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <MobileProductShowcase
          category="DEALS"
          tableName="chain_products"
          title="ALL JEWELRY"
          description="Premium Jewelry Deals Across All Collections"
        />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter &amp; Sort:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
              {categoryFilter !== "all" && ` in ${categoryFilter.toUpperCase()}`}
            </p>
            {tablesLoaded < TABLES.length && (
              <Button onClick={handleLoadMore} variant="outline" size="sm" disabled={isFetching}>
                {isFetching ? "Loading..." : `Load ${TABLES.length - tablesLoaded} more collections`}
              </Button>
            )}
          </div>

          {paginatedProducts.length > 0 ? (
            <>
              {/* HORIZONTAL RAIL */}
              <div className="relative">
                <div
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory flex-nowrap -mx-4 px-4 scrollbar-hide"
                  style={{ scrollbarWidth: "none" }} // Firefox; optional global CSS to fully hide
                >
                  {paginatedProducts.map((product) => (
                    <Card
                      key={`${product.source_table}-${product.id}`}
                      className="w-72 flex-none snap-start group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border-gray-200"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            No Image
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.featured && (
                            <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">FEATURED</Badge>
                          )}
                          {product.ships_today && (
                            <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
                              SHIPS TODAY
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                          {(product.norm_category || product.category || "UNCATEGORIZED").toUpperCase()} •{" "}
                          {product.material || "N/A"}
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{product.name}</h3>

                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating || 5)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                            {product.original_price && product.original_price > product.price && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.original_price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Optional edge fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 to-transparent" />
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    setCategoryFilter("all");
                    setSortBy("rating");
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Clear Filters
                </Button>
                {tablesLoaded < TABLES.length && (
                  <Button
                    onClick={handleLoadMore}
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isFetching}
                  >
                    {isFetching ? "Loading..." : "Load More Collections"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {renderProductModal()}

      <Footer />
    </>
  );
};

export default BestDeals;
