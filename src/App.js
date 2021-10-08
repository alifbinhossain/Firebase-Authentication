import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Form from "./components/Form/Form";
import SignIn from "./components/Form/SignIn/SignIn";
import SignUp from "./components/Form/SignUp/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Form>
              <Link to="/form/signup" className="w-100">
                <button className="btn-custom ">Sign Up</button>
              </Link>
              <Link to="/form/signin" className="w-100">
                <button className="btn-custom ">Sign In</button>
              </Link>
            </Form>
          </Route>
          <Route exact path="/form">
            <Form>
              <Link to="/form/signup" className="w-100">
                <button className="btn-custom ">Sign Up</button>
              </Link>
              <Link to="/form/signin" className="w-100">
                <button className="btn-custom ">Sign In</button>
              </Link>
            </Form>
          </Route>
          <Route exact path="/form/signup">
            <Form>
              <SignUp></SignUp>
            </Form>
          </Route>
          <Route exact path="/form/signin">
            <Form>
              <SignIn></SignIn>
            </Form>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
