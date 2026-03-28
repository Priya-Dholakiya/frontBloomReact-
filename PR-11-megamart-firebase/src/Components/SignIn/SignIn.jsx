import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { SignInAsync, SingInGoogleAsync } from "../Services/Action/Authentication";
import './SignIn.css'

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, errMsg } = useSelector(state => state.AuthReducer)
    const [InputForm, setInputForm] = useState({
        email: "",
        password: ""
    })

    const handlechange = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...InputForm,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(InputForm);
        dispatch(SignInAsync(InputForm))

    }
    const handleGooglesignin = () => {
        dispatch(SingInGoogleAsync());
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    return (
        <>
            {errMsg ? <p>{errMsg}</p> : ""}
            <section className="py-5 signin-section">
                <div className="container">
                    <div className="auth-card row mx-auto align-items-center">

                        <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
                            <div className="hero-wrap">
                                <img
                                    src="./src/image/signIn.png"
                                    className="hero-img"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-panel">
                                <h2 className="form-title">Sign IN</h2>

                                <Form onSubmit={handleSubmit} className="signin-form fullwidth-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="form-label w-100">Enter Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Email"
                                            name="email"
                                            onChange={handlechange}
                                            value={InputForm.email}
                                        />
                                        {Error.email && <span className="error">{Error.email}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="form-label w-100">Enter Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            onChange={handlechange}
                                            value={InputForm.password}
                                        />
                                        {Error.password && <span className="error">{Error.password}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="checkbox-wrap">
                                                <input type="checkbox" id="remember" />
                                                <label htmlFor="remember" className="ms-2">Remember me</label>
                                            </div>
                                        </div>

                                        <div className="d-grid mb-3">
                                            <button type="submit" className="btn btn-primary btn-main w-100">SignIn</button>
                                        </div>

                                        <div className="text-center small mb-3">
                                            <p className="mb-1">
                                                Create A New Account ? <Link to={'/SignUp'}>SignUp</Link>
                                            </p>
                                        </div>

                                        <div className="or-line">
                                            <span>Or login with</span>
                                        </div>

                                        <div className="socials mt-3 d-flex gap-2 justify-content-center">
                                            <button type="button" className="social-btn fb">f</button>
                                            <button type="button" className="social-btn tw">t</button>
                                            <button type="submit" className="social-btn gg" onClick={handleGooglesignin}>G</button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}

export default SignIn;