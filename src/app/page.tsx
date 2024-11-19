"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface FormData {
  message: string;
}

export default function ChatPage(): JSX.Element {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userMessage: Message = { sender: "user", text: data.message };
    const botReply: Message = {
      sender: "bot",
      text: "Thank you for your message! I'll get back to you shortly.",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    reset();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-xl font-bold">Chat with Kamrul</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-t p-4 flex gap-2"
      >
        <input
          {...register("message", { required: true })}
          type="text"
          placeholder="Type your message..."
          className="flex-grow border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
