import { useEffect, useState } from "react";
import initializeEcho from "../echo"; // Importer la fonction pour initialiser Echo
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const NotificationListener = () => {
  const { user } = useAuth();
  const [echo, setEcho] = useState(null);

  useEffect(() => {
    const setupEcho = async () => {
      const echoInstance = await initializeEcho();
      setEcho(echoInstance);
    };

    setupEcho();

    // Ajoutez echo comme dépendance pour le hook useEffect de nettoyage
    return () => {
      if (echo) {
        echo.disconnect();
      }
    };
  }, [echo]);

  useEffect(() => {
    if (!user || !echo) {
      return;
    }

    // Abonnez-vous au canal privé pour l'utilisateur connecté
    const channel = echo.private(`friends.${user.id}`);
    channel.listen("FriendRequestSent", (notification) => {
      toast.info(`Notification: ${notification.message}`);
    });

    // Ajoutez echo et user comme dépendances
    return () => {
      if (channel) {
        channel.stopListening("FriendRequestSent");
      }
    };
  }, [user, echo]);

  return null;
};

export default NotificationListener;
