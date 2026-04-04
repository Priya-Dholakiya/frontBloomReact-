import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage } from "../Services/UploadImage";
import "../App.css";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.RoomReducer);
  const [inputForm, setInputForm] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (room) {
      setInputForm(room);
      setImagePreview(room.image);
    }
  }, [room]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = async (e) => {
    try {
      const uploaded = await uploadImage(e.target.files[0]);
      setInputForm((prev) => ({
        ...prev,
        image: uploaded,
      }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      toast.success("Image updated!");
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };

  const validateForm = () => {
    const { number, desc, category, bed, price, image } = inputForm;
    const newErrors = {};
    if (!number) newErrors.number = "Room Number required.";
    if (!desc) newErrors.desc = "Description required.";
    if (!category) newErrors.category = "Category required.";
    if (!bed) newErrors.bed = "Bed Type required.";
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "Valid price required.";
    if (!image) newErrors.image = "Image required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Update room in Redux/Firestore
      await dispatch(updateRoomAsync(inputForm));
      toast.success("Room updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <ToastContainer />
      <Card className="add-hotel-card shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Header className="bg-gradient-gold text-white text-center py-4">
          <h3 className="mb-0 fw-bold">Edit Room Details</h3>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Number</Form.Label>
              <Form.Control name="number" value={inputForm.number || ""} onChange={handleChanged} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="desc" value={inputForm.desc || ""} onChange={handleChanged} />
            </Form.Group>

            <Row className="g-3 mb-3">
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Price (₹/night)</Form.Label>
                <Form.Control type="number" name="price" value={inputForm.price || ""} onChange={handleChanged} />
              </Form.Group>
            </Row>

            <Row className="g-3 mb-3">
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select name="category" value={inputForm.category || ""} onChange={handleChanged}>
                  <option value="">Select</option>
                  <option value="AC">AC</option>
                  <option value="NON AC">NON AC</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Luxury">Luxury</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="fw-semibold">Bed Type</Form.Label>
                <Form.Select name="bed" value={inputForm.bed || ""} onChange={handleChanged}>
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Room Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{maxHeight: '150px'}} />
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" className="flex-fill btn-gradient-gold fw-bold py-2 rounded-pill">
                Update Room
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate("/")} className="py-2 px-4">
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditHotel;

