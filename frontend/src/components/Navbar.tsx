import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { AudiobooksContext } from "../context/AudiobooksContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const signOut = useSignOut();
  const isAuth = useIsAuthenticated();
  const context = useContext(AudiobooksContext);
  if (!context) {
    throw new Error(
      "AudiobooksContext must be used within a AudiobooksContextProvider",
    );
  }
  const { setShowRegister } = context;

  const handleSignOut = () => {
    signOut();
    setShowRegister(true); // show the registration popover after sign out
  };

  return (
    <nav className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Audiobooks
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700
                  hover:text-white"
              >
                Dashboard
              </Link>

              {isAuth && (
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700
                    hover:text-white"
                  onClick={handleSignOut}
                >
                  Log Out
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white
                hover:bg-blue-700 hover:text-gray-300 focus:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              to="/dashboard"
              className="block rounded-md bg-blue-700 px-3 py-2 text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            {isAuth && (
              <Link
                to="/"
                className="block rounded-md bg-blue-700 px-3 py-2 text-base font-medium text-white"
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
              >
                Log Out
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
