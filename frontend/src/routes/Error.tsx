import { useNavigate } from "react-router-dom";
// assets
import errorGif from "/assets/images/404.gif";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-red-500/90 px-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full overflow-hidden">
          <img
            src={errorGif}
            alt="404  gif"
            className="mx-auto w-full rounded-xl"
            style={{ maxWidth: "800px" }}
          />
        </div>

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-white">Oops!</h1>

          <p className="my-4 text-xl text-slate-200">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>

          <button
            className="rounded-xl bg-gray-300 px-10 py-4 text-xl tracking-wider transition-all
              hover:bg-gray-400 hover:text-white"
            onClick={() => navigate("/")}
          >
            HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
