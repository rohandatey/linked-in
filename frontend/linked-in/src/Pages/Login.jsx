import React, { useState, useContext } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const handleloginup = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/v1/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result.data);

      setEmail("");
      setPassword("");

      // navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-start gap-2.5">
      <div className="p-7.5 lg:p-[35px] w-full h-[80px] flex items-center">
        <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
      </div>

      <form
        onSubmit={handleloginup}
        className="w-[90%] max-w-[400px] h-[600px] bg-white md:shadow-xl rounded-lg flex flex-col justify-center gap-[10px] p-4"
      >
        <h1 className="text-gray-600 text-2xl font-semibold mb-3">Login</h1>

        <input
          type="text"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[50px] border-2 border-gray-500 text-gray-700 text-xl px-[20px] py-[10px] rounded-md"
        />

        {/* password field with show/hide */}
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] border-2 border-gray-500 text-gray-700 text-xl px-[20px] py-[10px] rounded-md pr-[45px]"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full h-[50px] mt-5 rounded-full text-white bg-blue-400 cursor-pointer"
        >
          Login
        </button>

        <p
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate("/loginup")}
        >
          want to create a new account?
          <span className="text-blue-800 cursor-pointer">loginup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
