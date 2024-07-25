import React from "react";
import Vote from "./Vote";

export default function Questions({ data }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h2 className="text-3xl text-center font-bold">{data.text}</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 votes-container">
        <Vote text={data.answer_1} percentage={"33%"} votes={data.votes_1} />
        <Vote text={data.answer_2} percentage={"33%"} votes={data.votes_2} />
        <Vote text={data.answer_3} percentage={"33%"} votes={data.votes_3} />

        <button
          type="submit"
          className="cursor-pointer ml-auto my-6 rounded shadow bg-green-400 text-white font-medium text-lg py-2 px-10 transition hover:bg-white hover:text-green-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-100">
          Submit your vote
        </button>
      </form>
    </>
  );
}
