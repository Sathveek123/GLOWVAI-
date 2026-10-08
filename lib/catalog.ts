import { Product, sampleProducts } from "@/config/products";

export interface FilterOptions {
  concern?: string;
  skinType?: string;
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "newest";
}

export function getProducts(): Product[] {
  return sampleProducts.filter((p) => p.status === "published");
}

export function getProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find((p) => p.slug === slug && p.status === "published");
}

export function getProduct(idOrSku: string): Product | undefined {
  return sampleProducts.find(
    (p) => (p.id === idOrSku || p.slug === idOrSku || (p.sku && p.sku === idOrSku)) && p.status === "published"
  );
}

export function filterProducts(options: FilterOptions = {}): Product[] {
  let list = getProducts();

  if (options.query && options.query.trim() !== "") {
    const q = options.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (options.concern && options.concern.trim() !== "") {
    const c = options.concern.toLowerCase().trim();
    list = list.filter((p) => p.concerns.includes(c));
  }

  if (options.skinType && options.skinType.trim() !== "") {
    const st = options.skinType.toLowerCase().trim();
    list = list.filter((p) =>
      p.skinTypes.some((s) => s.toLowerCase() === st)
    );
  }

  if (options.category && options.category.trim() !== "") {
    const cat = options.category.toLowerCase().trim();
    list = list.filter((p) => p.category.toLowerCase() === cat);
  }

  if (typeof options.minPrice === "number") {
    list = list.filter((p) => p.price >= options.minPrice!);
  }

  if (typeof options.maxPrice === "number") {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }

  if (options.sort) {
    if (options.sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (options.sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
  }

  return list;
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  const all = getProducts().filter((p) => p.slug !== currentSlug);

  if (!current) return all.slice(0, limit);

  return all
    .sort((a, b) => {
      const aOverlap = a.concerns.filter((c) => current.concerns.includes(c)).length;
      const bOverlap = b.concerns.filter((c) => current.concerns.includes(c)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}

export function computeDiscountPercent(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
