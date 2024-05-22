import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../reduxStore/store";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      const formdata = {
        email,
        password,
      };

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      setLoading(true);
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
      }
      if (res.ok) {
        setLoading(false);
        setErr(data.message);
        console.log(data);
        dispatch(userActions.userSignIn(data.userData));
        setTimeout(() => {
          navigate("/notes-page");
        }, 1000);
      }
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="text-white">
      <h1 className="text-yellow-600 text-center my-12 text-3xl font-extrabold  font-mono">
        Welcome to KEEP
      </h1>
      <img src="" alt="" />
      <h1 className="text-yellow-600 text-center  text-xl font-extrabold  font-mono">
        Sign In
      </h1>
      <div className="flex flex-col space-y-3 p-10 ">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-yellow-700 text-black outline-none p-3 rounded"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-yellow-700 text-black outline-none p-3 rounded"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={submitHandler}
          className="w-full bg-yellow-700 p-2 rounded  hover:bg-yellow-700 font-extrabold  font-mono text-black "
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
        {err && (
          <div className="w-full bg-yellow-300 p-2 rounded   font-extrabold  font-mono text-black text-center">
            {err}
          </div>
        )}
      </div>
      <span className="ml-11 text-sm hover:underline 00 cursor-default">
        <Link to={"/"}>don't have an account?</Link>
      </span>
    </div>
  );
};

export default SignIn;
