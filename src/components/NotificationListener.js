import { useEffect, useState } from "react";
import initializeEcho from "../echo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const NotificationListener = () => {
  const { user, token } = useAuth();
  const [echo, setEcho] = useState(null);

  useEffect(() => {
    const setupEcho = async () => {
      if (!user || !token) {
        console.log("User is not authenticated, skipping Echo initialization.");
        return;
      }

      if (!echo) {
        const echoInstance = await initializeEcho(token);
        setEcho(echoInstance);
      }
    };

    setupEcho();

    return () => {
      if (echo) {
        echo.disconnect();
        console.log("Echo disconnected");
      }
    };
  }, [user, token, echo]);

  useEffect(() => {
    if (!user || !echo) {
      return;
    }

    const channel = echo.private(`friends.${user.id}`);
    channel.listen("FriendRequestSent", (notification) => {
      toast.info(`Notification: ${notification.message}`);
    });

    return () => {
      if (channel) {
        channel.stopListening("FriendRequestSent");
      }
    };
  }, [user, echo]);

  return null;
};

export default NotificationListener;
