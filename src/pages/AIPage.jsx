import React, { useState, useRef, useEffect } from "react";

const AIPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage(trimmed, "user");
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json();
      addMessage(data.reply, "bot");
    } catch {
      addMessage("Server error, probeer het later opnieuw.", "bot");
    } finally {
      setIsTyping(false);
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="blob"></div>
      <div className="glass w-full max-w-2xl h-[90vh] mx-auto my-10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <header className="px-8 py-6 bg-gradient-to-r from-blue-700 to-blue-500">
          <h1 className="text-4xl font-extrabold leading-tight tracking-wider">ECHO</h1>
          <p className="uppercase tracking-widest text-blue-200 text-sm">Your Safe Place</p>
        </header>

        <main
          ref={chatBoxRef}
          className="flex-1 p-6 space-y-4 overflow-y-auto"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative max-w-[80%] text-sm px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "ml-auto bubble-right" : "mr-auto bubble-left"
              }`}
              style={{ background: msg.sender === "user" ? "var(--user)" : "var(--bot)" }}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="relative max-w-[80%] px-4 py-2 rounded-lg bubble-left flex gap-1 items-center ml-6" style={{ background: "var(--bot)" }}>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </main>

        <form onSubmit={handleSubmit} className="flex gap-2 bg-[#042344]/80 backdrop-blur px-4 py-3">
          <input
            type="text"
            placeholder="Ask Echo anything…"
            className="flex-1 bg-transparent border-b border-blue-600 focus:outline-none text-blue-100 placeholder:text-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="px-5 py-2 rounded-full bg-[var(--primary)] hover:brightness-110 text-white font-semibold">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default AIPage;