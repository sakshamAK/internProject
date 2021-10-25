import "./App.css";
import axios from "axios";
import { useState, Fragment } from "react";
import commSignup from "./communitySignup.svg";

function SignUp() {
    let [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password1: "",
    });

    let [emailErr, setEmailErr] = useState("");
    let [message, setMessage] = useState("");

    let onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    let onsubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password1) {
            setMessage("Passwords do not match");
        } else {
            let data = formData;
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios
                .post("/signup/", data, config)
                .then((res) => {
                    console.log(res);
                    setMessage("Account Created!");
                })
                .catch((err) => {
                    // setLogin(false);
                    console.log(err.response.data);
                    setEmailErr(Object.values(err.response.data));
                });
        }
    };
    return (
        <Fragment>
            <div id="login-page-container">
                <form onSubmit={(e) => onsubmit(e)}>
                    <h1>Lets sign you up!</h1>
                    <input
                        type="text"
                        className="inpFields"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="email"
                        className="inpFields"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="text"
                        className="inpFields"
                        name="first_name"
                        placeholder="Firstname"
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="text"
                        className="inpFields"
                        name="last_name"
                        placeholder="Lastname"
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="password"
                        className="inpFields"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="password"
                        className="inpFields"
                        name="password1"
                        placeholder="Re-enter password"
                        onChange={(e) => onChange(e)}
                    />
                    <input type="submit" value="Sign Up" id="submit" />
                    <h4 style={{ margin: "0" }}>
                        <p style={{ margin: "0" }}>{emailErr[0]}</p>
                        <p style={{ margin: "0" }}>{emailErr[1]}</p>
                        <p style={{ margin: "0" }}>{message}</p>
                    </h4>
                </form>
            </div>
            <aside>
                <img src={commSignup} alt="community" />
                <div style={{ height: "400px", width: "400px" }}></div>
            </aside>
        </Fragment>
    );
}

export default SignUp;
