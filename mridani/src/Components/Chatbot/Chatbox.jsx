import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";

const Chatbox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "This is a sample response!" },
      ]);
    }, 500);
  };

  const openWhatsApp = () => {
    const phoneNumber = "919876543210"; // Replace with your number
    const message = encodeURIComponent("Hi, I need help with my order.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="h-full flex flex-col rounded-sm overflow-hidden shadow-xl bg-white">
      {/* Header */}
      <div className="bg-red-600 text-white px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-base">Chat with us</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            title="Chat on WhatsApp"
            className="hover:opacity-80 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-5 h-5"
            />
          </button>
          <button onClick={onClose} className="hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-2 rounded-lg shadow-sm ${
              msg.sender === "bot"
                ? "bg-white text-left text-gray-800"
                : "bg-red-100 text-right ml-auto text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
