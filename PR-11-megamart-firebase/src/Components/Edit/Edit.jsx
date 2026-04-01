import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  updateProduct,
} from "../../Service/Action/ProductAction/ProductAction";
import { useNavigate, useParams } from "react-router";
import uploadImage from "../Services/UploadImage";
import Loader from "../Loader/Loader";

const Edit = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productReducer,
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const initialstate = {
    id: "",
    name: "",
    desc: "",
    price: "",
    categoryType: "",
    brand: "",
    pattern: [],
    image: "",
    genderType: "",
  };

  const [InputForm, setInputForm] = useState(initialstate);
  const [Errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setInputForm((prev) => ({
        ...prev,
        pattern: checked
          ? [...prev.pattern, value]
          : prev.pattern.filter((v) => v !== value),
      }));
    } else {
      setInputForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (Errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!InputForm.name.trim()) newErrors.name = "Product name is required";
    if (!InputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!InputForm.price || InputForm.price <= 0)
      newErrors.price = "Valid price is required";
    if (!InputForm.categoryType)
      newErrors.categoryType = "Category is required";
    if (!InputForm.brand) newErrors.brand = "Brand is required";
    if (!InputForm.genderType) newErrors.genderType = "Gender type is required";
    // For edit form, image is optional - user can keep current image
    // Only require image if there's no existing image preview
    if (!InputForm.image && !imagePreview)
      newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      console.log("Edit load product:", product);
      setInputForm({
        ...initialstate,
        ...product,
        id: product.id || id,
        pattern: product.pattern || [],
        genderType: product.genderType || initialstate.genderType,
      });
      setImagePreview(product.image || "");
    }
  }, [product, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      await dispatch(updateProduct(id, InputForm));
      setSuccessMessage("Product updated successfully!");

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);

      // Navigate after a short delay to show success message
      setTimeout(() => {
        const gender = (InputForm.genderType || "").toString().toLowerCase();
        if (gender === "men" || gender === "male") {
          navigate("/Men");
        } else if (gender === "women" || gender === "female") {
          navigate("/Women");
        } else if (gender === "kids") {
          navigate("/Kids");
        } else {
          navigate("/Men");
        }
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setErrors({ submit: "Failed to update product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingImage(true);
      try {
        let imageUrl = await uploadImage(file);
        setInputForm({
          ...InputForm,
          image: imageUrl,
        });
        setImagePreview(imageUrl);
      } catch (error) {
        setErrors({ image: "Failed to upload image. Please try again." });
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleReset = () => {
    if (product) {
      setInputForm({
        ...initialstate,
        ...product,
        id: product.id || id,
        pattern: product.pattern || [],
        genderType: product.genderType || initialstate.genderType,
      });
      setImagePreview(product.image || "");
    } else {
      setInputForm(initialstate);
      setImagePreview("");
    }
    setErrors({});
    setSuccessMessage("");
    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"][name="image"]',
    );
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (loading && !product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Loader />
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container text-center py-5">
        <h3 className="text-danger">Error loading product data</h3>
        <p>{error}</p>
        <Button onClick={() => navigate("/Men")}>Back to Products</Button>
      </div>
    );
  }

  return (
    <>
      <h1 align="center" className="mb-4">
        Edit Product
      </h1>

      {successMessage && (
        <div className="container mb-3">
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        </div>
      )}

      {error && (
        <div className="container mb-3">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      )}

      <section className="add-collection-section">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="form-wrapper">
            <Form onSubmit={handleSubmit} className="add-form">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Name *
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    onChange={handlechange}
                    value={InputForm.name}
                    isInvalid={!!Errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Description *
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Product Description"
                    name="desc"
                    value={InputForm.desc}
                    onChange={handlechange}
                    isInvalid={!!Errors.desc}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Errors.desc}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Price *
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    value={InputForm.price}
                    onChange={handlechange}
                    min="1"
                    isInvalid={!!Errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Errors.price}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Category Type *
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="categoryType"
                    onChange={handlechange}
                    value={InputForm.categoryType}
                    isInvalid={!!Errors.categoryType}
                  >
                    <option value="">Select Category Type</option>
                    {[
                      "Blazers",
                      "cargos",
                      "jackets",
                      "jeans",
                      "joggers",
                      "Dresses",
                      "Shorts",
                      "sarees",
                      "T-shirt",
                      "shirts",
                      "Teaditional",
                    ].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {Errors.categoryType}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Brand *
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="brand"
                    onChange={handlechange}
                    value={InputForm.brand}
                    isInvalid={!!Errors.brand}
                  >
                    <option value="">Select Product Brand</option>
                    {[
                      "Nike",
                      "AD By Arvind",
                      "Arrow",
                      "Arrow Newyork",
                      "Arrow Sport",
                      "Raymond",
                      "Levi's",
                      "Puma",
                      "Pepe Jeans",
                      "Forever 21",
                      "Fabindia",
                      "Louis Philippe",
                      "Manyavar",
                    ].map((v) => (
                      <option key={v} value={v}></option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {Errors.brand}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Product Pattern
                </Form.Label>
                <Col sm="9">
                  <div className="d-flex gap-3 flex-wrap">
                    {["Fabric Decoration", "solid", "textured", "washed"].map(
                      (v) => (
                        <Form.Check
                          key={v}
                          type="checkbox"
                          value={v}
                          label={v}
                          onChange={handlechange}
                          checked={InputForm.pattern?.includes(v) || false}
                        />
                      ),
                    )}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Current Image
                </Form.Label>
                <Col sm="9">
                  {imagePreview && (
                    <div className="mb-2">
                      <img
                        src={imagePreview}
                        alt="Current product"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                        className="border rounded"
                      />
                    </div>
                  )}
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    isInvalid={!!Errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Errors.image}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Leave empty to keep current image
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Gender Type *
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="genderType"
                    onChange={handlechange}
                    value={InputForm.genderType}
                    isInvalid={!!Errors.genderType}
                  >
                    <option value="">Select Gender Type</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {Errors.genderType}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              {Errors.submit && (
                <div className="text-center mb-3">
                  <span className="text-danger">{Errors.submit}</span>
                </div>
              )}

              <div className="text-center d-flex gap-2 justify-content-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploadingImage}
                  className="px-4"
                >
                  {isUploadingImage
                    ? "Uploading Image..."
                    : isSubmitting
                      ? "Updating..."
                      : "Update Product"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isSubmitting || isUploadingImage}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
