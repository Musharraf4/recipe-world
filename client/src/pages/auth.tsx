import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  return (
    <div>
      {showRegisterForm && (
        <Login setShowRegisterForm={setShowRegisterForm} showRegisterForm={showRegisterForm} />
      )}

      <Register setShowRegisterForm={setShowRegisterForm} showRegisterForm={showRegisterForm} />
    </div>
  );
};

export const Login = ({ showRegisterForm, setShowRegisterForm }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response?.data?.token);
      window.localStorage.setItem("userID", response?.data?.userID);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <AuthUI
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      submitHandler={submitHandler}
      heading="Login"
      setShowRegisterForm={setShowRegisterForm}
      showRegisterForm={showRegisterForm}
    />
  );
};

export const Register = ({ showRegisterForm, setShowRegisterForm }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", { username, password });
      alert("User added Successfully");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <AuthUI
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      submitHandler={submitHandler}
      heading="Register"
      setShowRegisterForm={setShowRegisterForm}
      showRegisterForm={showRegisterForm}
    />
  );
};

export const AuthUI = ({
  username,
  setUsername,
  password,
  setPassword,
  submitHandler,
  heading,
  setShowRegisterForm,
  showRegisterForm,
}: any) => {
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-8 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-[#DAB600]">{heading}</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="username"
                  className="block w-full mt-1 py-2 border-blue-900 rounded-md shadow-sm  focus:outline-none focus:border-none"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm  focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-500 transform bg-[#DAB600] rounded-md hover:bg-[#e9d700] focus:outline-none focus:bg-[#e9d700]"
              >
                {!showRegisterForm ? "Register" : "Login"}
              </button>
            </div>
          </form>
          {!showRegisterForm && (
            <div className="mt-4 text-grey-600">
              Already have an account?{" "}
              <span
                className="text-[#DAB600] hover:underline cursor-pointer"
                onClick={() => setShowRegisterForm(!showRegisterForm)}
              >
                Log in
              </span>
            </div>
          )}
          {showRegisterForm && (
            <div className="mt-4 text-grey-600">
              New here?{" "}
              <span
                className="text-[#DAB600] hover:underline cursor-pointer"
                onClick={() => setShowRegisterForm(!showRegisterForm)}
              >
                Sign up
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
