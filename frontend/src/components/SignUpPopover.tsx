import { useState, useContext } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { url } from "../variables";
// context
import { AudiobooksContext } from "../context/AudiobooksContext";

interface DecodedToken {
  sub: {
    id: string;
    email: string;
  };
}

const SignUpPopover = () => {
  const context = useContext(AudiobooksContext);
  // check if the context exists
  if (!context) {
    throw new Error(
      "AudiobooksContext must be used within a AudiobooksContextProvider",
    );
  }
  const { setShowRegister } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const baseUrl = `${url}register`;
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // placeholder for backend integration
    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(baseUrl, body);

      if (response.data.message === "success") {
        setError("");
        const decodedToken = jwtDecode<DecodedToken>(response.data.token);

        signIn({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
          userState: {
            uid: decodedToken.sub.id,
            email: decodedToken.sub.email,
          },
        });

        setShowRegister(false);
        navigate("/");
      }
    } catch (err) {
      console.log("Error communicating with server: ", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An unknown error occurred");
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="popover-content">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Sign Up
        </button>

        {/* render sign in or sign up */}
        <p className="text-md mb-1 mt-10 text-center text-gray-600">
          Already a user?
        </p>
        <button
          onClick={() => setShowRegister(true)}
          className="w-full rounded-md bg-stone-500 px-4 py-2 text-white hover:bg-stone-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpPopover;
