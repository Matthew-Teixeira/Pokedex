import React, { useState } from "react";
import Auth from "../utils/auth";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginUser = async (username, email, password, confirmPassword) => {
    fetch("http://localhost:5000/api/user/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        Auth.login(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser(formValues.username, formValues.email, formValues.password, formValues.confirmPassword);
  };
  return (
    <div className="text-center max-w-[1200px] mt-32 md:mt-[15%] h-[calc(100vh-80px)] p-4 mx-auto">
      <h2 className="text-4xl text-[#ff2323]">Register</h2>
      <div>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            className="my-8 h-10 pl-4 rounded-md"
            type="username"
            name="username"
            placeholder="Enter Your Username"
            onChange={onChange}
            required
          />

          <input
            className="h-10 pl-4 rounded-md"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={onChange}
            required
          />
          <input
            className="my-8 h-10 pl-4 rounded-md"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={onChange}
            required
          />

          <input
            className="h-10 pl-4 rounded-md"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            onChange={onChange}
            required
          />
          <button
            type="submit"
            className="text-white font-bold border-2 hover:bg-[#ff2323] hover:border-[#ff0000] px-4 py-3 my-8 mx-auto flex items-center duration-300 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
