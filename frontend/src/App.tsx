import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
//context
import { AudiobooksContextProvider } from "./context/AudiobooksContext";
// routes
import Home from "./routes/Home";
import Error from "./routes/Error";
import Dashboard from "./routes/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <>
      <AudiobooksContextProvider>
        <AuthProvider store={store}>
          <RouterProvider router={router} />
        </AuthProvider>
      </AudiobooksContextProvider>
    </>
  );
}

export default App;
