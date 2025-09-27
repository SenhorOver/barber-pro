import { apiClient } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: UserProps | null;
  isAuthenticated: boolean;
  singIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  token: string;
  subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    Router.push("/login");
  } catch {
    console.log("Erro ao sair");
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@barber.token": token } = parseCookies();

    if (token) {
      apiClient
        .get("/me")
        .then((response) => {
          const { id, name, address, email, subscriptions } = response.data;
          setUser({
            id,
            name,
            address,
            email,
            subscriptions,
            token,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function singIn({ email, password }: SignInProps) {
    try {
      const response = await apiClient.post("/session", { email, password });
      const { id, name, token, subscriptions, address } = response.data;

      setCookie(undefined, "@barber.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ id, email, name, token, subscriptions, address });

      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch {
      console.log("Erro ao entrar");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await apiClient.post("/users", {
        name,
        email,
        password,
      });

      Router.push("/login");
    } catch {
      console.log("Erro ao entrar");
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", { path: "/" });
      setUser(null);
      Router.push("/login");
    } catch {
      console.log("Erro ao sair");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, singIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
