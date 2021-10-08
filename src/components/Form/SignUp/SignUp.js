import React from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { initAuthentication } from "../../../Firebase/FirebaseAuth";

//IMPORT FROM FIREBASE
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

initAuthentication();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();

  /* -------------------------------------------------------------------------- */
  /*                          EMAIL & PASSWORD SIGN IN                          */
  /* -------------------------------------------------------------------------- */
  const passwordValidation = () => {
    if (userPassword.length < 8) {
      setError("Your password must be at least 8 characters");
      return;
    }
    if (userPassword.length > 32) {
      setError("Your password must be at max 32 characters");
      return;
    }
    if (userPassword.search(/[a-z]/) < 0) {
      setError("Your password must contain at least one lower case letter.");
      return;
    }
    if (userPassword.search(/[A-Z]/) < 0) {
      setError("Your password must contain at least one upper case letter.");
      return;
    }

    if (userPassword.search(/[0-9]/) < 0) {
      setError("Your password must contain at least one digit.");
      return;
    }
    if (userPassword.search(/[!@#\$%\^&\*_]/) < 0) {
      setError(
        "Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]"
      );
      return;
    } else {
      return "Password is valid";
    }
  };

  const emailValidation = () => {
    const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!filter.test(userEmail)) {
      setError("Invalid Email");
      return false;
    } else {
      return true;
    }
  };

  /* --------------------------------- ALL BUTTONS HANDLER -------------------------------- */
  const handleNameChange = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleCreateNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => setError(err.message));
  };
  const handleRegister = (e) => {
    e.preventDefault();

    const passTrue = passwordValidation();
    const emailTrue = emailValidation();

    if (!userName) {
      setError("Please enter your name");
    }
    if (passTrue && emailTrue && userName) {
      handleCreateNewUser(userEmail, userPassword);
      setError("Congrats! Your new account has been created successfully.");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                      GOOGLE,FACEBOOK & GITHUB SIGN IN                      */
  /* -------------------------------------------------------------------------- */

  const handleSignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("Congrats! Your new account has been created successfully.");
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
            <h1>You are new here</h1>
            <h2>
              Sign up with your email and personal details to get started!
            </h2>
          </div>
        </Col>
        <Col md={5} className="signup-right">
          <h1 className="text-white text-center">Sign Up</h1>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label className="form-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                className="form-input"
                onBlur={handleNameChange}
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formHorizontalCheck">
              <Form.Check
                className="form-label"
                label="I agree to the Terms and Privacy Policy."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalCheck">
              {error ? <p>{error}</p> : null}
              <button type="submit" className="w-100 btn-custom">
                Sign Up
              </button>
            </Form.Group>
          </Form>
          <small className="text-center d-block text-more-option ">
            Or with Social Profile
          </small>
          <div className="social-btn-box my-3 d-flex justify-content-center align-items-center">
            <button
              className="btn-social"
              onClick={() => handleSignIn(googleProvider)}
            >
              <i class="fab fa-google"></i>
            </button>
            <button
              className="btn-social"
              onClick={() => handleSignIn(gitHubProvider)}
            >
              <i class="fab fa-github"></i>
            </button>
            <button
              className="btn-social"
              onClick={() => handleSignIn(facebookProvider)}
            >
              <i class="fab fa-facebook"></i>
            </button>
          </div>

          <small className="text-center d-block">
            Already have an account?{" "}
            <Link to="/form/signin" className="switch-link">
              Sign In
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
