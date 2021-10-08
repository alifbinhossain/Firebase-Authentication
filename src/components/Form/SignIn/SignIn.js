import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signup-form container signup-form h-100">
      <Row md={2} xs={1} className=" h-100">
        <Col className="signup-left" md={7}>
          <div className="signup-greetings">
            <h1>Welcome back!</h1>
            <h2>Get access to your Orders, Wishlist and Recommendations.</h2>
          </div>
        </Col>
        <Col md={5} className="signup-right">
          <h1 className="text-white text-center">Sign In</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="form-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-input"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-between align-items-center"
              controlId="formHorizontalCheck"
            >
              <Form.Check className="form-label" label="Remember me?" />
              <a className="switch-link" href="/">
                Forgot password?
              </a>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalCheck">
              <button className="w-100 btn-custom">Sign Up</button>
            </Form.Group>
          </Form>
          <small className="text-center d-block text-more-option ">
            Or with Social Profile
          </small>
          <div className="social-btn-box my-3 d-flex justify-content-center align-items-center">
            <button className="btn-social">
              <i class="fab fa-google"></i>
            </button>
            <button className="btn-social">
              <i class="fab fa-github"></i>
            </button>
            <button className="btn-social">
              <i class="fab fa-facebook"></i>
            </button>
          </div>

          <small className="text-center d-block">
            Dont have an account?{" "}
            <Link to="/form/signup" className="switch-link">
              Sign Up
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
