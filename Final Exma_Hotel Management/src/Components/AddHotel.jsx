import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from "../Services/UploadImage";
import "../App.css";

const AddHotel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const initialState = {
    id: "",
    number: "",
    desc: "",
    category: "",
    bed: "",
    price: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const { number, desc, category, bed, price, image } = inputForm;
    const newErrors = {};
    if (!number) newErrors.number = "Room Number is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!bed) newErrors.bed = "Bed Type must be selected.";
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "Price must be a positive number.";
    if (!image) newErrors.image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async (e) => {
    try {
      const uploaded = await uploadImage(e.target.files[0]);
      setInputForm((prev) => ({
        ...prev,
        image: uploaded,
      }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user) {
      toast.error("Please login as admin");
      navigate("/sign-in");
      return;
    }

    const id = generateUniqueId({ length: 6, useLetters: false });
    const newRoom = { ...inputForm, id };
    
    try {
      await dispatch(addNewRoomAsync(newRoom));
      toast.success("Hotel added successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Failed to add hotel.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Card className="add-hotel-card shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Header className="bg-gradient-gold text-white text-center py-4">
          <h3 className="mb-0 fw-bold">Add New Hotel Room</h3>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Number *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Room 101" 
                name="number" 
                value={inputForm.number} 
                onChange={handleChanged}
                isInvalid={!!errors.number}
              />
              <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description *</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe the room..." 
                name="desc" 
                value={inputForm.desc} 
                onChange={handleChanged}
                isInvalid={!!errors.desc}
              />
              <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
            </Form.Group>

            <Row className="g-3 mb-3">
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Price * (₹/night)</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="e.g. 2500" 
                  name="price" 
                  value={inputForm.price} 
                  onChange={handleChanged}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="g-3 mb-3">
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Category *</Form.Label>
                <Form.Select name="category" value={inputForm.category} onChange={handleChanged} isInvalid={!!errors.category}>
                  <option value="">Select Category</option>
                  <option value="AC">AC Room</option>
                  <option value="NON AC">Non-AC Room</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Luxury">Luxury Suite</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Bed Type * (Space)</Form.Label>
                <Form.Select name="bed" value={inputForm.bed} onChange={handleChanged} isInvalid={!!errors.bed}>
                  <option value="">Select Bed</option>
                  <option value="Single">Single Bed</option>
                  <option value="Double">Double Bed</option>
                  <option value="King">King Size</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.bed}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Room Image * (JPG/PNG)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileUpload} isInvalid={!!errors.image} />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{maxHeight: '150px', objectFit: 'cover'}} />
                </div>
              )}
            </Form.Group>

            <Button type="submit" className="w-100 btn-gradient-gold py-3 fw-bold rounded-pill shadow-lg" style={{fontSize: '1.1rem'}}>
              Add Hotel Room Now
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AddHotel;