import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../reduxStore/store";
import birdAnimation from "../assets/birdanimation.gif";
import { TypeAnimation } from "react-type-animation";

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

      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
      }
      if (res.ok) {
        setLoading(false);
        setErr(data.message);
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
    <div>
      <div className="text-yellow-600 text-center pt-12 text-3xl font-extrabold  font-mono">
        <TypeAnimation
          sequence={[
            "Welcome To KEEP",
            1000,
            "Makes notes easily",
            1000,
            "",
            1000,
            "Manage tasks easier",
            1000,
            "Make Todolist online",
            1000,
          ]}
          speed={40}
          // style={{ fontSize: "2em" }}
          repeat={Infinity}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <img src={birdAnimation} className="w-[250]" alt="" />
      </div>

      <h1 className="text-yellow-600 px-10 text-xl font-extrabold  font-mono">
        Sign In
      </h1>
      <div className="flex flex-col space-y-3 p-10 ">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 "
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 "
          type="password"
          placeholder="Password"
        />

        <button
          onClick={submitHandler}
          className="relative px-6 py-3 font-bold text-black rounded-lg group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-yellow-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-yellow-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
          <span className="relative">
            {loading ? "Loading..." : " Sign In"}
          </span>
        </button>
        {err && (
          <div className="w-full bg-yellow-300 p-2 rounded   font-extrabold  font-mono text-black text-center">
            {err}
          </div>
        )}
      </div>
      <span className="px-10 text-sm ">
        have an account?{" "}
        <Link to={"/"}>
          <span className="hover:underline hover:text-blue-700 cursor-pointer font-bold text-xs">
            Sign Up
          </span>{" "}
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
