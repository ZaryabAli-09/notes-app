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
  const [fileErr, setFileErr] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      if (file && file["type"].split("/")[0] !== "image") {
        return setErr("Please upload an image!");
      }
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setErr(data.message);
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
          repeat={Infinity}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <img src={birdAnimation} className="w-[250]" alt="" />
      </div>

      <h1 className="text-yellow-600 px-10 text-xl font-extrabold  font-mono">
        Sign Up
      </h1>
      <div className="flex flex-col space-y-3 p-10 ">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 "
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 "
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 "
          type="password"
          placeholder="Password"
        />
        <h3 className="text-yellow-600  text-md font-extrabold  font-mono">
          Upload Avatar
        </h3>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          accept="image/*"
          placeholder="Upload Avatar"
          className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer text-black font-extrabold  font-mono"
        />
        <button
          onClick={submitHandler}
          className="relative px-6 py-3 font-bold text-black rounded-lg group"
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
        {fileErr && (
          <div className="w-full bg-yellow-300 p-2 rounded   font-extrabold  font-mono text-black text-center">
            {fileErr}
          </div>
        )}
      </div>

      <span className="px-10 text-sm ">
        have an account?{" "}
        <Link to={"/sign-in"}>
          <span className="hover:underline hover:text-blue-700 cursor-pointer font-bold text-xs">
            Sign In
          </span>{" "}
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
