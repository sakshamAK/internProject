import "./App.css";
import axios from "axios";
import work from "./workLogin.svg";
import { useState } from "react";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Signup from "./SignUp";

function App() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [isLoggedIn, setLogin] = useState(false);
  // let [message, setMessage] = useState("");
  let [emailErr, setEmailErr] = useState("");

  let onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let onsubmit = (e) => {
    e.preventDefault();
    let data = formData;

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/login/", data, config)
      .then((res) => {
        if (res.status === 200) {
          // setMessage("Login Success");
          setLogin(true);
        }
      })
      .catch((err) => {
        setLogin(false);
        console.error(err.response.data);
        // setMessage(err.response.data.non_field_errors);
        setEmailErr(Object.values(err.response.data));
      });
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div id="login-page-container">
            <form onSubmit={(e) => onsubmit(e)}>
              <h1>Welcome!</h1>
              <input
                type="email"
                className="inpFields"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => onChange(e)}
              />
              <input
                type="password"
                className="inpFields"
                name="password"
                placeholder="password"
                onChange={(e) => onChange(e)}
              />
              <input type="submit" value="Sign In" id="submit" />
              <hr
                style={{
                  height: "1px",
                  background: "#B45309",
                  width: "300px",
                  margin: "15px",
                }}
              />
              <Link id="sign-up" to="/signup">
                Sign Up
              </Link>
              <h3>
                <p style={{ margin: "0" }}>{emailErr[0]}</p>
                <p style={{ margin: "0" }}>{emailErr[1]}</p>
              </h3>
            </form>
          </div>
          <aside>
            <img src={work} alt="working man" />
            <div></div>
          </aside>
          {isLoggedIn && <Redirect to="/Dashboard" />}
        </Route>
        <Route path="/Dashboard">
          <h1>Dashboard</h1>
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
