import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import Cookies from "js-cookie";

window.Pusher = Pusher;

const initializeEcho = async () => {
  try {
    // Obtenir le cookie CSRF de Sanctum
    await axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`);

    // Extraire le jeton CSRF du cookie
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const authToken = Cookies.get("token");

    if (!authToken) {
      throw new Error("Token d'authentification non trouvé dans les cookies");
    }

    const echo = new Echo({
      broadcaster: "pusher",
      key: process.env.REACT_APP_PUSHER_APP_KEY,
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${process.env.REACT_APP_API_URL}/api/broadcasting/auth`,
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
