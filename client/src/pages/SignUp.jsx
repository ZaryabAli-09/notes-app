import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        console.log(data);
        setLoading(false);
        setErr(data.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      }
      if (!res.ok) {
        setLoading(false);
        console.log(data.message);
        setErr(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setErr(error.message);
    }
  };
  return (
    <div className="text-white">
      <h1 className="text-yellow-600 text-center my-12 text-3xl font-extrabold  font-mono">
        Welcome to KEEP
      </h1>
      <img src="" alt="" />
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
          className="w-full bg-yellow-700 p-2 rounded  hover:bg-yellow-900 font-extrabold  font-mono text-black "
        >
          {loading ? "Loading..." : " Sign Up"}
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
