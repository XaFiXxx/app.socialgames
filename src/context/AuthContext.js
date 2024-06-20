import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!Cookies.get("token"),
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    token: Cookies.get("token") || "",
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");

    if (token && user) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(user),
        token: token,
      });
    }
  }, []);

  const login = (user, token) => {
    const expirationMinutes = 60 / 1440; // 60 minutes
    Cookies.set("token", token, { expires: expirationMinutes });
    Cookies.set("user", JSON.stringify(user), { expires: expirationMinutes });
    setAuth({
      isAuthenticated: true,
      user: user,
      token: token,
    });

    // Planifier la vérification de l'expiration du token
    setTimeout(() => setIsExpired(true), expirationMinutes * 1440 * 60 * 1000);
  };

  const handleLogout = useCallback(async (expired = false) => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await api.post(
          "/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }

    Cookies.remove("token");
    Cookies.remove("user");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: "",
    });

    if (expired) {
      confirmAlert({
        title: "Session Expirée",
        message:
          "Votre session a expiré. Vous allez être redirigé vers la page de connexion.",
        buttons: [
          {
            label: "OK",
            onClick: () => {
              window.location.href = "/"; // Redirige immédiatement
            },
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      });
    } else {
      window.location.href = "/";
    }
  }, []);

  const logout = useCallback(async () => {
    await handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    if (isExpired) {
      handleLogout(true);
    }
  }, [isExpired, handleLogout]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const checkTokenExpiration = () => {
        const token = Cookies.get("token");
        if (!token) {
          setIsExpired(true);
        }
      };

      const interval = setInterval(checkTokenExpiration, 1000); // Vérifie toutes les secondes
      return () => clearInterval(interval);
    }
  }, [auth.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
