import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const showNotification = (msg) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
          px-8 py-4 text-lg font-medium rounded-sm shadow-md transition-all duration-500 ease-out
          bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900
          ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
        `}
      >
        {message}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
