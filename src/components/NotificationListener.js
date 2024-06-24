import { useEffect, useState } from "react";
import initializeEcho from "../echo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const NotificationListener = () => {
  const { user } = useAuth();
  const [echo, setEcho] = useState(null);

  useEffect(() => {
    const setupEcho = async () => {
      if (!echo) {
        const echoInstance = await initializeEcho();
        setEcho(echoInstance);
        console.log("Echo initialized:", echoInstance);
      }
    };

    setupEcho();

    return () => {
      if (echo) {
        echo.disconnect();
        console.log("Echo disconnected");
      }
    };
  }, [echo]);

  useEffect(() => {
    if (!user || !echo) {
      return;
    }

    const channel = echo.private(`friends.${user.id}`);
    channel.listen("FriendRequestSent", (notification) => {
      toast.info(`Notification: ${notification.message}`);
      console.log("Notification received:", notification);
    });

    return () => {
      if (channel) {
        channel.stopListening("FriendRequestSent");
        console.log("Stopped listening to FriendRequestSent");
      }
    };
  }, [user, echo]);

  return null;
};

export default NotificationListener;
