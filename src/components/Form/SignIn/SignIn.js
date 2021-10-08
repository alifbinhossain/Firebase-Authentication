import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { initAuthentication } from "../../../Firebase/FirebaseAuth";
import "./SignIn.css";

//IMPORT FROM FIREBASE
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";

initAuthentication();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  /* -------------------------------------------------------------------------- */
  /*                          EMAIL & PASSWORD SIGN IN                          */
  /* -------------------------------------------------------------------------- */
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const getSignInInfo = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setError("Log in successfully..");
      })
      .catch((err) => setError(err.message));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    getSignInInfo(userEmail, userPassword);
  };

  /* -------------------------------------------------------------------------- */
  /*                      GOOGLE,FACEBOOK & GITHUB SIGN IN                      */
  /* -------------------------------------------------------------------------- */
  const handleProviderSignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("Log in successfully..");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
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
          <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="form-input"
                onBlur={handleEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-input"
                onBlur={handlePasswordChange}
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
              {error ? <p className="text-center">{error}</p> : null}
              <button className="w-100 btn-custom" type="submit">
                Sign In
              </button>
            </Form.Group>
          </Form>
          <small className="text-center d-block text-more-option ">
            Or with Social Profile
          </small>
          <div className="social-btn-box my-3 d-flex justify-content-center align-items-center">
            <button
              className="btn-social"
              onClick={() => handleProviderSignIn(googleProvider)}
            >
              <i class="fab fa-google"></i>
            </button>
            <button
              className="btn-social"
              onClick={() => handleProviderSignIn(gitHubProvider)}
            >
              <i class="fab fa-github"></i>
            </button>
            <button
              className="btn-social"
              onClick={() => handleProviderSignIn(facebookProvider)}
            >
              <i class="fab fa-facebook"></i>
            </button>
          </div>

          <small className="text-center d-block">
            Dont have an account?
            <Link to="/form/signup" className="switch-link ms-1">
              Sign Up
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
