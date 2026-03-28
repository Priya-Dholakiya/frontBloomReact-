import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMenDataAsync } from '../Services/Action/Action';
import { useNavigate } from 'react-router';
import './Add.css'
import uploadImage from '../Services/UploadImage';

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Error, setError] = useState({});
    const { isError, isCreate } = useSelector(state => state);
    const initialstate = {
        id: "",
        name: "",
        desc: "",
        price: "",
        categoryType: "",
        brand: "",
        pattern: [],
        image: "",
        genderType: ""
    }
    const [InputForm, setInputForm] = useState(initialstate);

    const handlechange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type == "checkbox") {
            setInputForm((prev) => ({
                ...prev,
                pattern: checked ? [...prev.pattern, value] : prev.pattern.filter(v => v != value)
            }))

        } else {
            setInputForm({
                ...InputForm,
                [name]: value
            })
        }
    }
    useEffect(() => {
        if (isCreate) {
            if (InputForm.genderType === "men") {
                navigate('/men');
            } else if (InputForm.genderType === "women") {
                navigate('/women');
            } else if (InputForm.genderType === "kids") {
                navigate('/Kids');
            }
        }
    }, [isCreate]);
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
        if (InputForm.pattern == "") {
            formError.pattern = "pattern Must be Requried !";
        }
        if (!InputForm.image) {
            formError.image = "image Must be Requried !";
        }
        if (InputForm.genderType === "") formError.genderType = "Select Men/Women/Kids";
        setError(formError);

        return Object.keys(formError).length != 0;

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidation()) {
            InputForm.id = String(Math.floor(Math.random() * 1000));
            dispatch(AddMenDataAsync(InputForm));
            if (InputForm.genderType === "men") {
                navigate('/men');
            } else if (InputForm.genderType === "women") {
                navigate('/women');
            } else {
                navigate('/kids');
            }
        }
    }
    const handleImage = async(e) => {
          let imageUrl = await uploadImage(e.target.files[0]);
        setInputForm({
            ...InputForm,
            image: `${imageUrl}`
        });

    }
    return (
        <>
            {isError ? <p>{isError}</p> : ""}

            <section className='add-collection-section'>
                <div className='container d-flex justify-content-center align-items-center'>
                    <div className='form-wrapper'>
                        <Form onSubmit={handleSubmit} className='add-form'>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" placeholder="Product Name" name='name' onChange={handlechange} value={InputForm.name} />
                                    {Error.name ? <span className='error'>{Error.name}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Description
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" placeholder="Product Description" name='desc' value={InputForm.desc} onChange={handlechange} />
                                    {Error.desc ? <span className='error'>{Error.desc}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Price
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" placeholder="Product Price" name='price' value={InputForm.price} onChange={handlechange} />
                                    {Error.price ? <span className='error'>{Error.price}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Category Type
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Select name='categoryType' onChange={handlechange}>
                                        <option>Category Type</option>
                                        {["Blazers", "cargos", "jackets", "jeans", "joggers","Dresses","Shorts","sarees","T-shirt","shirts","Teaditional"].map((v) => (
                                            <option key={v} value={v}>{v}</option>
                                        ))}
                                    </Form.Select>
                                    {Error.categoryType ? <span className='error'>{Error.categoryType}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Brand
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Select name='brand' onChange={handlechange}>
                                        <option>Product Brand</option>
                                        {["Nike","AD By Arvind", "Arrow", "Arrow Newyork", "Arrow Sport","Raymond","Levi’s" ,"Puma" , "Pepe Jeans","Forever 21","Fabindia","Louis Philippe","Manyavar"].map((v) => (
                                            <option key={v} value={v}>{v}</option>
                                        ))}
                                    </Form.Select>
                                    {Error.brand ? <span className='error'>{Error.brand}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Pattern
                                </Form.Label>
                                <Col sm="8 d-flex gap-3 flex-wrap">
                                    {["Fabric Decoration", "solid", "textured", "washed"].map((v) => (
                                        <Form.Check
                                            key={v}
                                            type="checkbox"
                                            name={v}
                                            label={v}
                                            value={v}
                                            onChange={handlechange}
                                        />
                                    ))}
                                    {Error.pattern ? <span className='error'>{Error.pattern}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product Image
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="file" name='image' onChange={handleImage} />
                                    {Error.image ? <span className='error'>{Error.image}</span> : ""}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Product For
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Check inline label="Men" name="genderType" type="radio" value="men" onChange={handlechange} />
                                    <Form.Check inline label="Women" name="genderType" type="radio" value="women" onChange={handlechange} />
                                    <Form.Check inline label="Kids" name="genderType" type="radio" value="kids" onChange={handlechange} />
                                    {Error.genderType ? <span className='error'>{Error.genderType}</span> : ""}
                                </Col>
                            </Form.Group>

                            <div className='text-center'>
                                <Button type='submit'>Submit</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>


        </>
    )
}
export default Add;