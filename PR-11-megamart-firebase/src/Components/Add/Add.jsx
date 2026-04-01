import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Service/Action/ProductAction/ProductAction";
import { useNavigate } from "react-router";
import "./Add.css";
import uploadImage from "../Services/UploadImage";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Error, setError] = useState({});
  const { error, loading } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/SignIn");
    }
  }, [user, navigate]);
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

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type == "checkbox") {
      setInputForm((prev) => ({
        ...prev,
        pattern: checked
          ? [...prev.pattern, value]
          : prev.pattern.filter((v) => v != value),
      }));
    } else {
      setInputForm({
        ...InputForm,
        [name]: value,
      });
    }
  };
  // Product added and navigation handled in handleSubmit
  const formValidation = () => {
    const formError = {};

    if (InputForm.name == "") {
      formError.name = "Name is Required";
    }
    if (InputForm.desc == "") {
      formError.desc = "Description are Must Be Required !";
    }
    if (InputForm.price == "") {
      formError.price = "Price Are Required !";
    }
    if (InputForm.categoryType == "") {
      formError.categoryType = "Category Are Required";
    }
    if (InputForm.brand == "") {
      formError.brand = "Brand Must be Requried !";
    }
    if (InputForm.pattern.length === 0) {
      formError.pattern = "pattern Must be Requried !";
    }
    if (!InputForm.image) {
      formError.image = "image Must be Requried !";
    }
    if (InputForm.genderType === "")
      formError.genderType = "Select Men/Women/Kids";
    setError(formError);

    return Object.keys(formError).length != 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) {
      setIsSubmitting(true);
      setSuccessMessage("");
      try {
        const generatedId = String(Math.floor(Math.random() * 1000));
        const productToAdd = { ...InputForm, id: generatedId };

        console.log("Adding product:", productToAdd);
        await dispatch(addProduct(productToAdd));

        setSuccessMessage("Product added successfully!");

        // Navigate based on genderType from the form
        setTimeout(() => {
          if (productToAdd.genderType === "men") {
            navigate("/men");
          } else if (productToAdd.genderType === "women") {
            navigate("/women");
          } else if (productToAdd.genderType === "kids") {
            navigate("/kids");
          } else {
            navigate("/"); // fallback
          }
        }, 1500);
      } catch (err) {
        console.error("Error adding product:", err);
        setError({ submit: "Failed to add product. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
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
      } catch (error) {
        setError({ image: "Failed to upload image. Please try again." });
      } finally {
        setIsUploadingImage(false);
      }
    }
  };
  return (
    <>
      {successMessage && (
        <div className="container mb-3">
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        </div>
      )}

      {error ? (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      ) : (
        ""
      )}
      {Error.submit && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{Error.submit}</p>
      )}

      <section className="add-collection-section">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="form-wrapper">
            <Form onSubmit={handleSubmit} className="add-form">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    onChange={handlechange}
                    value={InputForm.name}
                  />
                  {Error.name ? (
                    <span className="error">{Error.name}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Description
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Product Description"
                    name="desc"
                    value={InputForm.desc}
                    onChange={handlechange}
                  />
                  {Error.desc ? (
                    <span className="error">{Error.desc}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Price
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    value={InputForm.price}
                    onChange={handlechange}
                  />
                  {Error.price ? (
                    <span className="error">{Error.price}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Category Type
                </Form.Label>
                <Col sm="8">
                  <Form.Select name="categoryType" onChange={handlechange}>
                    <option>Category Type</option>
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
                  {Error.categoryType ? (
                    <span className="error">{Error.categoryType}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Brand
                </Form.Label>
                <Col sm="8">
                  <Form.Select name="brand" onChange={handlechange}>
                    <option>Product Brand</option>
                    {[
                      "Nike",
                      "AD By Arvind",
                      "Arrow",
                      "Arrow Newyork",
                      "Arrow Sport",
                      "Raymond",
                      "Levi’s",
                      "Puma",
                      "Pepe Jeans",
                      "Forever 21",
                      "Fabindia",
                      "Louis Philippe",
                      "Manyavar",
                    ].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Form.Select>
                  {Error.brand ? (
                    <span className="error">{Error.brand}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Pattern
                </Form.Label>
                <Col sm="8 d-flex gap-3 flex-wrap">
                  {["Fabric Decoration", "solid", "textured", "washed"].map(
                    (v) => (
                      <Form.Check
                        key={v}
                        type="checkbox"
                        name={v}
                        label={v}
                        value={v}
                        onChange={handlechange}
                      />
                    ),
                  )}
                  {Error.pattern ? (
                    <span className="error">{Error.pattern}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product Image
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImage}
                  />
                  {Error.image ? (
                    <span className="error">{Error.image}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Product For
                </Form.Label>
                <Col sm="8">
                  <Form.Check
                    inline
                    label="Men"
                    name="genderType"
                    type="radio"
                    id="men"
                    value="men"
                    checked={InputForm.genderType === "men"}
                    onChange={handlechange}
                  />
                  <Form.Check
                    inline
                    label="Women"
                    name="genderType"
                    type="radio"
                    id="women"
                    value="women"
                    checked={InputForm.genderType === "women"}
                    onChange={handlechange}
                  />
                  <Form.Check
                    inline
                    label="Kids"
                    name="genderType"
                    type="radio"
                    id="kids"
                    value="kids"
                    checked={InputForm.genderType === "kids"}
                    onChange={handlechange}
                  />
                  {Error.genderType ? (
                    <span className="error">{Error.genderType}</span>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploadingImage}
                >
                  {isUploadingImage
                    ? "Uploading Image..."
                    : isSubmitting
                      ? "Adding Product..."
                      : "Submit"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Add;
