import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct } from "../store/productsSlice";

const DEFAULT_FORM = {
  name: "",
  brand: "",
  category: "",
  customCategory: "",
  price: "",
  size: "",
  color: "",
  imageUrl: "",
  description: "",
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const categories = useMemo(() => {
    const setOfCategories = new Set();
    products.forEach((product) => {
      if (product.category?.trim()) setOfCategories.add(product.category.trim());
    });
    return [...setOfCategories].sort();
  }, [products]);

  const existingProduct = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [products, id]);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && existingProduct) {
      setForm({
        name: existingProduct.name || "",
        brand: existingProduct.brand || "",
        category: existingProduct.category || "",
        customCategory: "",
        price: String(existingProduct.price ?? ""),
        size: existingProduct.size || "",
        color: existingProduct.color || "",
        imageUrl: existingProduct.imageUrl || "",
        description: existingProduct.description || "",
      });
    }
  }, [existingProduct, id]);

  useEffect(() => {
    if (id && !existingProduct) {
      // If an invalid id is entered, redirect to home.
      navigate("/", { replace: true });
    }
  }, [existingProduct, id, navigate]);

  const validate = () => {
    const next = {};

    const required = [
      ["name", "Name is required."],
      ["brand", "Brand is required."],
      ["category", "Category is required."],
      ["size", "Size is required."],
      ["color", "Color is required."],
      ["imageUrl", "Image URL is required."],
    ];

    required.forEach(([key, message]) => {
      if (!form[key].trim()) next[key] = message;
    });

    if (form.category === "Other" && !form.customCategory.trim())
      next.customCategory = "Please enter a category.";

    const priceValue = Number(form.price);
    if (!form.price.trim()) next.price = "Price is required.";
    else if (Number.isNaN(priceValue) || priceValue <= 0)
      next.price = "Price must be a positive number.";

    if (form.imageUrl.trim() && !/^https?:\/\/.+/i.test(form.imageUrl))
      next.imageUrl = "Image URL must start with http:// or https://";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const categoryValue =
      form.category === "Other" ? form.customCategory.trim() : form.category.trim();

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: categoryValue,
      price: Number(form.price),
      size: form.size.trim(),
      color: form.color.trim(),
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim(),
    };

    if (existingProduct) {
      dispatch(updateProduct({ id: existingProduct.id, changes: payload }));
    } else {
      dispatch(addProduct(payload));
    }

    navigate("/");
  };

  const handleDelete = () => {
    if (!existingProduct) return;
    if (
      window.confirm(
        "Delete this product? This action cannot be undone.",
      )
    ) {
      dispatch(deleteProduct(existingProduct.id));
      navigate("/");
    }
  };

  const fieldConfig = [
    {
      name: "name",
      label: "Name",
      placeholder: "Example: Urban Runner",
      cols: "col-md-6",
    },
    {
      name: "brand",
      label: "Brand",
      placeholder: "Example: Stride",
      cols: "col-md-6",
    },
    {
      name: "price",
      label: "Price (USD)",
      placeholder: "79.99",
      type: "number",
      cols: "col-md-4",
    },
    {
      name: "size",
      label: "Size",
      placeholder: "10",
      cols: "col-md-4",
    },
    {
      name: "color",
      label: "Color",
      placeholder: "Black",
      cols: "col-md-6",
    },
    {
      name: "imageUrl",
      label: "Image URL",
      placeholder: "https://...",
      cols: "col-md-6",
    },
  ];

  const renderField = ({ name, label, placeholder, cols, type = "text" }) => (
    <div key={name} className={cols}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        step={type === "number" ? "0.01" : undefined}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        value={form[name]}
        onChange={handleChange(name)}
        placeholder={placeholder}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const title = existingProduct ? "Edit product" : "Add product";

  return (
    <main className="container py-5">
      <h1 className="mb-4">{title}</h1>

      <form className="row g-3" onSubmit={handleSubmit} noValidate>
        {fieldConfig.map(renderField)}

        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            value={form.category}
            onChange={handleChange("category")}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        {form.category === "Other" && (
          <div className="col-md-4">
            <label className="form-label">Custom category</label>
            <input
              className={`form-control ${errors.customCategory ? "is-invalid" : ""}`}
              value={form.customCategory}
              onChange={handleChange("customCategory")}
              placeholder="Enter category name"
            />
            {errors.customCategory && (
              <div className="invalid-feedback">{errors.customCategory}</div>
            )}
          </div>
        )}

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Short description..."
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {existingProduct ? "Save changes" : "Add product"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          {existingProduct && (
            <button
              type="button"
              className="btn btn-danger ms-auto"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>

      <div className="mt-4">
        <small className="text-muted">
          Product data is saved locally in your browser (localStorage).
        </small>
      </div>
    </main>
  );
};

export default ProductPage;
