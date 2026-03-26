import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneMenDataAsync, UpdateMenDataAsync } from '../Services/Action/Action';
import { useNavigate, useParams } from 'react-router';

const Edit = () => {
    const dispatch = useDispatch();
    const { MenData } = useSelector(state => state);
    const { id } = useParams();
    const navigate = useNavigate();
    const initialstate = {
        id:"",
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
        if (MenData) {
            setInputForm(MenData);
        }
    }, [MenData])

    useEffect(() => {
        dispatch(GetOneMenDataAsync(id))
    }, [id])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateMenDataAsync(InputForm))
        navigate('/Men');
    }

    return (
        <>
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
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Descripiton
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="Product Descripiton" name='desc' value={InputForm.desc} onChange={handlechange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Price
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="number" placeholder="Product Price" name='price' value={InputForm.price} onChange={handlechange} />
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
                                                <option value={v} selected={InputForm.categoryType == v}>{v}</option>
                                            </>
                                        )
                                    })}

                                </Form.Select>
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
                                                <option value={v} selected={InputForm.brand == v}>{v}</option>
                                            </>
                                        )
                                    })}

                                </Form.Select>
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
                                        checked={InputForm.pattern.includes(v)}
                                    />
                                ))}
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Product Image
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="Product Image URL" name='image' onChange={handlechange} value={InputForm.image} />
                            </Col>
                        </Form.Group>
                        <Button type='submit'>submit</Button>
                    </Form>
                </div>
            </section>

        </>
    )
}
export default Edit;