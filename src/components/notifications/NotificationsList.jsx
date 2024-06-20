import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Afficher les notifications dans un toast et dans la liste
    const handleNotification = (notification) => {
      toast.info(`Notification: ${notification.message}`);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification.message,
      ]);
    };

    window.handleNotification = handleNotification;

    return () => {
      delete window.handleNotification;
    };
  }, []);

  return (
    <div className="notifications">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
      />
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
