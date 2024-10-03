import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { url } from "../variables";

interface Audiobook {
  id: number;
  title: string;
  author: string;
  votes: number;
  cover_image: string;
  has_voted: boolean;
}

const Dashboard = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const authHeader = useAuthHeader();
  const isAuth = useIsAuthenticated();
  const baseURL = `${url}audiobooks`;

  useEffect(() => {
    // fetch the list of audiobooks from the backend
    const config = {
      headers: {
        Authorization: authHeader, // send JWT token in the request
      },
    };

    axios
      .get(baseURL, config)
      .then((response) => {
        // sort audiobooks by votes (highest to lowest)
        const sortedBooks = response.data.sort(
          (a: Audiobook, b: Audiobook) => b.votes - a.votes,
        );
        setAudiobooks(sortedBooks);
      })
      .catch((error) => {
        console.error("Error fetching audiobooks:", error);
      });
  }, [authHeader]);

  const handleVote = (id: number) => {
    const voteURL = `${url}audiobooks/${id}/vote`;

    axios
      .post(voteURL, {}, { headers: { Authorization: authHeader } })
      .then((response) => {
        // update the vote count locally after a successful vote
        setAudiobooks((prev) =>
          prev
            .map((book) =>
              book.id === id
                ? { ...book, votes: response.data.votes, has_voted: true }
                : book,
            )
            .sort((a, b) => b.votes - a.votes),
        );
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          alert("You have already voted for this audiobook.");
        } else {
          console.error("Error registering vote:", error);
        }
      });
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 mt-10 text-center text-4xl font-bold">
          Vote your Favorite Audiobook
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiobooks.map((audiobook) => (
            <div
              key={audiobook.id}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              {/* render images */}
              <img
                src={audiobook.cover_image}
                alt={audiobook.title}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <h2 className="text-xl font-semibold">{audiobook.title}</h2>
              <p className="text-gray-600">by {audiobook.author}</p>
              <p className="mt-2 font-bold text-gray-800">
                Votes: {audiobook.votes}
              </p>

              {isAuth && (
                <button
                  onClick={() => handleVote(audiobook.id)}
                  className={`mt-4 w-full rounded-lg px-4 py-2 text-white
                  ${audiobook.has_voted ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                  disabled={audiobook.has_voted}
                >
                  {audiobook.has_voted ? "Voted" : "Vote"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
