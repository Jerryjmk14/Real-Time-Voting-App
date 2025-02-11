import React from "react";
import Vote from "./Vote";
import { COLLECTION_ID, databases, DB_ID } from "../utils/appewrite";

export default function Questions({ data }) {
  const [isSubmited, setIsSubmited] = React.useState(false);
  const totalVotes = data.votes_1 + data.votes_2 + data.votes_3;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedVote = formData.get("vote");

    if (selectedVote === data.answer_1) {
      databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
        votes_1: data.votes_1 + 1,
      });
    } else if (selectedVote === data.answer_2) {
      databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
        votes_2: data.votes_2 + 1,
      });
    } else if (selectedVote === data.answer_3) {
      databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
        votes_3: data.votes_3 + 1,
      });
    }

    setIsSubmited(true);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold">{data.text}</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 votes-container">
        <Vote
          text={data.answer_1}
          percentage={Math.floor((data.votes_1 / totalVotes) * 100)}
          votes={data.votes_1}
        />
        <Vote
          text={data.answer_2}
          percentage={Math.floor((data.votes_2 / totalVotes) * 100)}
          votes={data.votes_2}
        />
        <Vote
          text={data.answer_3}
          percentage={Math.floor((data.votes_3 / totalVotes) * 100)}
          votes={data.votes_3}
        />

        <button
          type="submit"
          disabled={isSubmited}
          className="cursor-pointer ml-auto my-6 rounded shadow bg-green-400 text-white font-medium text-lg py-2 px-10 transition hover:bg-white hover:text-green-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-100">
          Submit your vote
        </button>
      </form>
    </>
  );
}
