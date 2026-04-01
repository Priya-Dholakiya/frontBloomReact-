import { useEffect, useState } from "react";
import { Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmailPassword } from "../../Service/Action/AuthAction/AuthAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const { errMsg, isCreated } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const [InputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  console.log("outside", isCreated);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...InputForm,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerWithEmailPassword(InputForm));
  };
  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated]);
  return (
    <>
      {errMsg ? <p >{errMsg}</p> : ""}
      <section className="py-5 signin-section">
        <div className="container">
          <div className="auth-card row mx-auto align-items-center">
            <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
              <div className="hero-wrap">
                <img src="./src/image/signIn.png" className="hero-img" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-panel">
                <h2 className="form-title">Sign UP</h2>

                <Form
                  onSubmit={handleSubmit}
                  className="signin-form fullwidth-form"
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label w-100">
                      Enter Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      onChange={handlechange}
                      value={InputForm.email}
                    />
                    {Error.email && (
                      <span className="error">{Error.email}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="form-label w-100">
                      Enter Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={handlechange}
                      value={InputForm.password}
                    />
                    {Error.password && (
                      <span className="error">{Error.password}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="checkbox-wrap">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember" className="ms-2">
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-main w-100"
                      >
                        Signup
                      </button>
                    </div>

                    <div className="text-center small mb-3">
                      <p className="mb-1">
                        Already a Account ? <Link to={"/SignIn"}>SignIN</Link>
                      </p>
                    </div>

                    <div className="or-line">
                      <span>Or login with</span>
                    </div>

                    <div className="socials mt-3 d-flex gap-2 justify-content-center">
                      <button type="button" className="social-btn fb">
                        f
                      </button>
                      <button type="button" className="social-btn tw">
                        t
                      </button>
                      <button type="button" className="social-btn gg">
                        G
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUp;
