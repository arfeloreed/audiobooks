import { useContext } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
// context
import { AudiobooksContext } from "../context/AudiobooksContext";
// components
import Navbar from "../components/Navbar";
import hero from "/assets/images/hero.webp";
import SignInPopover from "../components/SignInPopover";
import SignUpPopover from "../components/SignUpPopover";

interface DecodedToken {
  email: string;
}

const Home = () => {
  const context = useContext(AudiobooksContext);

  // Check if the context exists
  if (!context) {
    throw new Error(
      "AudiobooksContext must be used within a AudiobooksContextProvider",
    );
  }
  const { showRegister } = context;
  const isAuth = useIsAuthenticated();
  const auth = useAuthUser<DecodedToken>();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="lg:order-1">
              <img
                src={hero}
                alt="Audiobook hero image"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="lg:order-2">
              <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
                Discover Audiobooks and Vote Your Favorites!
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Sign up now to get started or sign in if you're already a
                member.
              </p>

              {/* Sign-in/Sign-up components */}
              <div className="mt-8">
                <div className="flex flex-col gap-4">
                  {isAuth ? (
                    <>
                      <div>
                        <p className="text-lg font-semibold">
                          Hi, {auth?.email}!
                        </p>
                        <p className="text-gray-600">Go to Dashboard to vote</p>
                      </div>
                      <button
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                    </>
                  ) : showRegister ? (
                    <SignInPopover />
                  ) : (
                    <SignUpPopover />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
