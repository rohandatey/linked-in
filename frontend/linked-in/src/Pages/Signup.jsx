import React, { useState, useContext } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(serverUrl + "/api/v1/auth/signup",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true });
      console.log(result.data);
      // navigate("/"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-start gap-2.5">
      <div className="p-7.5 lg:p-[35px] w-full h-[80px] flex items-center">
        <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
      </div>

      <form
        onSubmit={handleSignup}
        className="w-[90%] max-w-[400px] h-[600px] bg-white md:shadow-xl rounded-lg flex flex-col justify-center gap-[10px] p-4"
      >
        <h1 className="text-gray-600 text-2xl font-semibold mb-3">SignUp</h1>

        <input
          type="text"
          placeholder="firstname"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full h-[50px] border-2 border-gray-500 text-gray-700 text-xl px-[20px] py-[10px] rounded-md"
        />

        <input
          type="text"
          placeholder="lastname"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full h-[50px] border-2 border-gray-500 text-gray-700 text-xl px-[20px] py-[10px] rounded-md"/>

        <input
          type="text"
          placeholder="username"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full h-[50px] border-2 border-gray-500 text-gray-700 text-xl px-[20px] py-[10px] rounded-md"
        />

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
          SignUp
        </button>

        <p className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate("/login")}>
          already have an account?
          <span className="text-blue-800 cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
