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

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
      (res) => {
        console.log(res);

        if (
          res.events.includes("databases.*.collections.*.documents.*.update")
        ) {
          setQuestions((prevQuestions) => {
            return prevQuestions.map((question) => {
              if (question.$id !== res.payload.$id) {
                return question;
              }

              return res.payload;
            });
          });
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="container max-w-3xl mx-auto px-4 py-10">
      {questions.map((question) => {
        return <Questions key={question.$id} data={question} />;
      })}
    </main>
  );
}
