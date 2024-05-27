import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import birdAnimation from "../assets/birdanimation.gif";
import { TypeAnimation } from "react-type-animation";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      setLoading(true);
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setErr(data.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      }
      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.message);
    }
  };
  return (
    <div className="text-white">
      <div className="text-yellow-600 text-center mt-6 text-3xl font-extrabold  font-mono">
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
            "Manage Todo list online",
            1000,
          ]}
          speed={40}
          repeat={Infinity}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <img src={birdAnimation} className="w-[250]" alt="" />
      </div>

      <h1 className="text-yellow-600 text-center  text-xl font-extrabold  font-mono">
        Sign Up
      </h1>
      <div className="flex flex-col space-y-3 p-10 ">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="bg-yellow-700 text-black outline-none p-3 rounded"
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-yellow-700 text-black outline-none p-3 rounded"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-yellow-700 text-black outline-none p-3 rounded"
          type="password"
          placeholder="Password"
        />
        <h3 className="text-yellow-600  mt-10 text-xl font-extrabold  font-mono">
          Upload Avatar
        </h3>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          placeholder="Upload Avatar"
          className="bg-yellow-700 rounded hover:bg-yellow-900 cursor-pointer text-black font-extrabold  font-mono"
        />
        <button
          onClick={submitHandler}
          className="relative px-6 py-3 font-bold text-white rounded-lg group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-yellow-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-yellow-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
          <span className="relative">
            {" "}
            {loading ? "Loading..." : " Sign Up"}
          </span>
        </button>

        {err && (
          <div className="w-full bg-yellow-300 p-2 rounded   font-extrabold  font-mono text-black text-center">
            {err}
          </div>
        )}
      </div>

      <span className="ml-11 text-sm hover:underline 00 cursor-default">
        <Link to={"/sign-in"}>have an account?</Link>
      </span>
    </div>
  );
};

export default SignUp;
