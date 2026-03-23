import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const products = useSelector((state) => state.products.items);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const categoryOptions = useMemo(() => {
    const setOfCategories = new Set();
    products.forEach((product) => {
      if (product.category?.trim()) {
        setOfCategories.add(product.category.trim());
      }
    });

    return ["All", ...Array.from(setOfCategories).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let list = products;

    if (category && category !== "All") {
      list = list.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    }

    if (normalizedSearch) {
      list = list.filter((p) =>
        `${p.name} ${p.brand} ${p.category}`
          .toLowerCase()
          .includes(normalizedSearch),
      );
    }

    if (sort === "priceAsc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "priceDesc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      list = [...list].sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return list;
  }, [products, search, category, sort]);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Stride Shoes</h1>

      <section className="mb-4">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <input
            type="search"
            className="form-control"
            placeholder="Search by name, brand, or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Sort: Newest</option>
            <option value="priceAsc">Sort: Price (Low to High)</option>
            <option value="priceDesc">Sort: Price (High to Low)</option>
          </select>
        </div>
      </section>

      <section>
        <ProductList products={filtered} />
      </section>
    </main>
  );
};

export default HomePage;
