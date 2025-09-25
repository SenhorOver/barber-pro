import { createContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: UserProps | null;
  isAuthenticated: boolean;
  singIn: (credentials: SignInProps) => Promise<void>;
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

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  async function singIn({ email, password }: SignInProps) {
    console.log({ email, password });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
