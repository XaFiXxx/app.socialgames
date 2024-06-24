import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import Cookies from "js-cookie";

window.Pusher = Pusher;

const initializeEcho = async (authToken) => {
  try {
    // Obtenir le token CSRF depuis les cookies
    let csrfToken = Cookies.get("XSRF-TOKEN");
    if (!csrfToken) {
      await axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      csrfToken = Cookies.get("XSRF-TOKEN");
    }

    if (!authToken) {
      throw new Error("Token d'authentification non trouvé");
    }

    const echo = new Echo({
      broadcaster: "pusher",
      key: process.env.REACT_APP_PUSHER_APP_KEY,
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/api/broadcasting/auth`, // Ajustement ici
      auth: {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "X-CSRF-TOKEN": csrfToken,
        },
      },
    });

    return echo;
  } catch (error) {
    console.error("Failed to initialize Echo:", error);
    return null;
  }
};

export default initializeEcho;
