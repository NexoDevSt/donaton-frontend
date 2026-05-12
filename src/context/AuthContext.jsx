import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(); 

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      try {
        const usuarioGuardado = localStorage.getItem("usuario");
        const tokenGuardado = localStorage.getItem("token");

        if (usuarioGuardado && usuarioGuardado !== "undefined" && tokenGuardado && tokenGuardado !== "undefined") {
          setUsuario(JSON.parse(usuarioGuardado));
          setToken(tokenGuardado);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al cargar datos de sesión:", error);
        logout(); 
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const login = (datos, tokenRecibido) => {
    if (!datos || !tokenRecibido) {
      console.error("No se pueden guardar datos de login indefinidos");
      return;
    }

    localStorage.setItem("token", tokenRecibido);
    localStorage.setItem("usuario", JSON.stringify(datos));
    
    setToken(tokenRecibido);
    setUsuario(datos);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    setToken(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);