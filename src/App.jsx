import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./utils/appewrite";
import Questions from "./components/Questions";

export default function App() {
  const [questions, setQuestions] = useState([]);

  async function getQuestiondfromDB() {
    const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
    setQuestions(questions.documents);
  }

  useEffect(() => {
    getQuestiondfromDB();
  }, []);

  return (
    <main className="container max-w-3xl mx-auto px-4 py-10">
      {questions.map((question) => {
        return <Questions key={question.$id} data={question} />;
      })}
    </main>
  );
}
