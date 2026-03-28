import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneMenDataAsync, UpdateMenDataAsync } from '../Services/Action/Action';
import { useNavigate, useParams } from 'react-router';
import uploadImage from '../Services/UploadImage';

const Edit = () => {
  const dispatch = useDispatch();
  const { MenData } = useSelector(state => state.ReducerData);
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
    genderType: "" // <-- include genderType so we can decide where to navigate
  };

  const [InputForm, setInputForm] = useState(initialstate);

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // we treat all pattern checkboxes as controlling InputForm.pattern
      setInputForm((prev) => ({
        ...prev,
        pattern: checked ? [...prev.pattern, value] : prev.pattern.filter(v => v !== value)
      }));
    } else {
      setInputForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // load single item
  useEffect(() => {
    if (id) {
      dispatch(GetOneMenDataAsync(id));
    }
  }, [dispatch, id]);

  // when MenData loads into the store, populate form
  useEffect(() => {
    if (MenData) {

      setInputForm({
        ...initialstate,
        ...MenData,
        pattern: MenData.pattern || [],
        genderType: MenData.genderType || initialstate.genderType
      });
    }
  }, [MenData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // wait for update to finish (thunk should return a promise)
      await dispatch(UpdateMenDataAsync(InputForm));

      // decide where to navigate: prefer genderType, otherwise fallback to categoryType
      const gender = (InputForm.genderType || "").toString().toLowerCase();
      const category = (InputForm.categoryType || "").toString().toLowerCase();

      if (gender === "men" || gender === "male") {
        navigate('/Men');
      } else if (gender === "women" || gender === "female") {
        navigate('/Women');
      } else if (gender === "kids") {
        navigate('/Kids');
      } else if (category === "kids") {
        navigate('/Kids');
      } else {
        // default fallback (choose whichever makes sense for your app)
        navigate('/Men');
      }
    } catch (err) {
      console.error("Update failed:", err);
      // optionally show an error message to user
    }
  };

  const handleImage = async (e) => {
    let imageUrl = await uploadImage(e.target.files[0]);
    setInputForm({
      ...InputForm,
      image: `${imageUrl}`
    })
  }



  return (
    <>
      <h1 align="center">Edit Product</h1>
      <section className="add-collection-section">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="form-wrapper">
            <Form onSubmit={handleSubmit} className="add-form">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Name</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    onChange={handlechange}
                    value={InputForm.name}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Description</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Product Description"
                    name="desc"
                    value={InputForm.desc}
                    onChange={handlechange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Price</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    value={InputForm.price}
                    onChange={handlechange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Category Type</Form.Label>
                <Col sm="6">
                  <Form.Select
                    name="categoryType"
                    onChange={handlechange}
                    value={InputForm.categoryType}
                  >
                    <option value="">Category Type</option>
                    {["blazer", "cargos", "jackets", "jeans", "joggers"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Brand</Form.Label>
                <Col sm="6">
                  <Form.Select
                    name="brand"
                    onChange={handlechange}
                    value={InputForm.brand}
                  >
                    <option value="">Product Brand</option>
                    {["AD By Arvind", "Arrow", "Arrow Newyork", "Arrow Sport"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Pattern</Form.Label>
                <Col sm="6">
                  <div className="d-flex gap-3">
                    {["Fabric Decoration", "solid", "textured", "washed"].map((v) => (
                      <Form.Check
                        key={v}
                        type="checkbox"
                        value={v}
                        label={v}
                        onChange={handlechange}
                        checked={InputForm.pattern?.includes(v) || false}
                      />
                    ))}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product Image</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="file"

                    name="image"
                    onChange={handleImage}

                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Gender Type</Form.Label>
                <Col sm="6">
                  <Form.Select
                    name="genderType"
                    onChange={handlechange}
                    value={InputForm.genderType}
                  >
                    <option value="">Select Gender Type</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </section>

    </>
  );
};

export default Edit;
