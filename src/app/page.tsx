'use client';

import { useState } from 'react';
import styles from './style.module.css';

export default function Home() {
  const [message, setMessage] = useState<string>(''); // ユーザーの入力メッセージ
  const [conversation, setConversation] = useState<{ user: string; ham: string }[]>([]); // 会話の履歴

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch("/api/randomWord");
      if (!res.ok) {
        throw new Error("Failed to fetch random word");
      }
      const data: { word: string } = await res.json();

      // ユーザーのメッセージを会話履歴に追加
      setConversation((prevConversation) => [
        ...prevConversation,
        { ham: '' , user: message}, // ハム語はまだ空で追加
      ]);

      setMessage(''); // メッセージを送信後、入力欄を空にする

      // 1秒後にハム語の返答を会話履歴に追加
      setTimeout(() => {
        setConversation((prevConversation) => {
          const updatedConversation = [...prevConversation];
          updatedConversation[updatedConversation.length - 1].ham = data.word;
          return updatedConversation;
        });
      }, 1000); // 1秒後にハム語を更新
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  return (
    <div className={styles.top}>
      <h1 className={styles.title}>ハムちゃんとおしゃべりしよう</h1>

      {/* 会話履歴の表示 */}
      <div className={styles.chatHistory}>
        {conversation.map((entry, index) => (
          <div key={index} className={styles.chatEntry}>
            {/* ハム語の返答（左寄せ） */}
            <div className={styles.hamMessage}>{entry.ham}</div>
            {/* ユーザーのメッセージ（右寄せ） */}
            <div className={styles.userMessage}>{entry.user}</div>
          </div>
        ))}
      </div>

      {/* メッセージ入力欄と送信ボタンを横並びに */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.textArea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
          rows={4}
        />

        <button onClick={sendMessage} className={styles.sendButton}>
          送信
        </button>
      </div>
    </div>
  );
}
