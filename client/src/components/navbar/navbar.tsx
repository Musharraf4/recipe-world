import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [toggleNavbar, setToggleNavbar] = useState("hidden");
  const logoutHandler = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* <!-- Website Logo --> */}
              <Link to="/" className="flex items-center py-4 px-2">
                {/* <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2"/> */}
                <span className="font-semibold text-gray-500 text-lg">Recipe World</span>
              </Link>
            </div>

            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="py-4 px-2 text-[#DAB600] border-b-4 border-[#DAB600] font-semibold "
              >
                Home
              </Link>
              {cookies.access_token && (
                <>
                  <Link
                    to="/create-recipe"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-[#DAB600] transition duration-300"
                  >
                    Create Recipe
                  </Link>
                  <Link
                    to="/saved-recipes"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-[#DAB600] transition duration-300"
                  >
                    Saved Recipes
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden md:flex items-center space-x-3 ">
            {!cookies.access_token && (
              <Link
                to="/auth"
                className="py-2 px-4 font-medium text-white bg-[#DAB600] rounded hover:bg-[#e9d700] transition duration-300"
              >
                Login
              </Link>
            )}
            {cookies.access_token && (
              <button
                onClick={logoutHandler}
                className="py-2 px-4 font-medium text-white bg-[#DAB600] rounded hover:bg-[#e9d700] transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
          {/* <!-- Mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setToggleNavbar(toggleNavbar === "block" ? "hidden" : "block")}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-[#DAB600] "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- mobile menu --> */}
      <div className={`${toggleNavbar} mobile-menu z-50`}>
        <ul className="">
          <li>
            <Link to="/" className="block text-sm px-2 py-4 text-white bg-[#DAB600] font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create-recipe"
              className="block text-sm px-2 py-4 hover:bg-[#DAB600] transition duration-300"
            >
              Create Recipes
            </Link>
          </li>
          <li>
            <Link
              to="/saved-recipes"
              className="block text-sm px-2 py-4 hover:bg-[#DAB600] transition duration-300"
            >
              Saved Recipes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
