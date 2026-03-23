import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-5 text-center">
        <h4>No products found</h4>
        <p className="text-muted">Try removing filters or add new products.</p>
        <Link to="/add" className="btn btn-primary">
          Add new product
        </Link>
      </div>
    );
  }

  return (
    <div className="row gy-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-4">
          <Link
            className="card h-100 text-decoration-none text-dark"
            to={`/product/${product.id}`}
          >
            <div className="ratio ratio-4x3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img-top object-fit-cover"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title mb-1">{product.name}</h5>
              <p className="card-text mb-1 text-muted">
                {product.brand} • {product.category}
              </p>
              <p className="card-text fw-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
              <span className="badge bg-secondary">Size {product.size}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
