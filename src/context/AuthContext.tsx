import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";

import { AuthContextType } from "../types"; 

const auth = getAuth(app);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth повинен бути використаний всередині AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {

        setUserId(user.uid);
        setLoading(false);
      } else {

        signInAnonymously(auth)
          .then((credential) => {

            setUserId(credential.user.uid);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Anonymous sign-in failed:", error);

            setLoading(false); 
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};