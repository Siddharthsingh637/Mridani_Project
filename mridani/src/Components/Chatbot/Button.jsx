import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./Chatbox";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window with shrink animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.35, ease: [0.175, 0.85, 0.42, 0.96] }}
            className="fixed bottom-20 right-6 w-80 h-[450px] bg-white border border-gray-300 rounded-xl shadow-xl z-50 overflow-hidden origin-bottom-right"
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Icon Button */}
      <button
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </>
  );

};

export default Button;
