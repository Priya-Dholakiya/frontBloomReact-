import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMenDataAsync } from '../Services/Action/Action';
import { useNavigate } from 'react-router';
import './Add.css'

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
        image: ""
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
            navigate('/Men')
        }
    }, [isCreate])
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
        if (InputForm.image == "") {
            formError.image = "image Must be Requried !";
        }

        setError(formError);

        return Object.keys(formError).length != 0;

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidation()) {
            InputForm.id = String(Math.floor(Math.random() * 1000));
            dispatch(AddMenDataAsync(InputForm));
            navigate('/men')
        }
    }
    return (
        <>
            {isError ? <p>{isError}</p> : ""}
            <h1 align="center">Add Data In From</h1>
            <section>
                <div className='container'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Name
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="Product Name" name='name' onChange={handlechange} value={InputForm.name} />
                                {Error.name ? <span className='error'>{Error.name}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Descripiton
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="Product Descripiton" name='desc' value={InputForm.desc} onChange={handlechange} />
                                {Error.desc ? <span className='error'>{Error.desc}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Price
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="number" placeholder="Product Price" name='price' value={InputForm.price} onChange={handlechange} />
                                {Error.price ? <span className='error'>{Error.price}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Category Type
                            </Form.Label>
                            <Col sm="6">
                                <Form.Select name='categoryType' onChange={handlechange}>
                                    <option>Category Type</option>
                                    {["blazer", "cargos", "jackets", "jeans", "joggers"].map((v) => {
                                        return (
                                            <>
                                                <option value={v}>{v}</option>
                                            </>
                                        )
                                    })}

                                </Form.Select>
                                {Error.categoryType ? <span className='error'>{Error.categoryType}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Brand
                            </Form.Label>
                            <Col sm="6">
                                <Form.Select name='brand' onChange={handlechange}>
                                    <option>Product Brand</option>
                                    {["AD By Arvind", "Arrow", "Arrow Newyork", "Arrow Sport"].map((v) => {
                                        return (
                                            <>
                                                <option value={v}>{v}</option>
                                            </>
                                        )
                                    })}

                                </Form.Select>
                                {Error.brand ? <span className='error'>{Error.brand}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Pattern
                            </Form.Label>
                            <Col sm="6 d-flex gap-3">
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
                            <Form.Label column sm="2">
                                Product Image
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="Product Image URL" name='image' onChange={handlechange} value={InputForm.image} />
                                {Error.image ? <span className='error'>{Error.image}</span> : ""}
                            </Col>
                        </Form.Group>
                        <Button type='submit'>submit</Button>
                    </Form>
                </div>
            </section>

        </>
    )
}
export default Add;