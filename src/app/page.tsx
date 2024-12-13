"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [responseWord, setResponseWord] = useState<string>("");

  const sendMessage = async () => {
    try {
      const res = await fetch("/api/randomWord"); // GETリクエスト
      if (!res.ok) {
        throw new Error("Failed to fetch random word");
      }
      const data: { word: string } = await res.json();
      setResponseWord(data.word);
    } catch (error) {
      console.error("Error fetching word:", error);
      setResponseWord("Error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ランダム単語アプリ</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力してください"
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        メッセージを送信
      </button>
      {responseWord && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "blue" }}>
          <strong>ランダム単語:</strong> {responseWord}
        </div>
      )}
    </div>
  );
}
