import { api } from "@/services/api";
import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";
import { Account, User } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type SessionUser = {
  userId: string;
  name: string;
  email: string;
  image: string;
  notification: string;
  phoneVerified: boolean;
  origin: string;
};

type AuthContextData = {
  appSignIn(): Promise<void>;
  appSignOut(): Promise<void>;
  status: "authenticated" | "loading" | "unauthenticated";
  session: SessionUser | undefined;
  sessionLoading: boolean;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded, userId, sessionId } = useClerkAuth();
  const { user } = useUser();

  const [sessionStatus, setSessionStatus] = useState<
    "authenticated" | "loading" | "unauthenticated"
  >("unauthenticated");

  const [isLoading, setIsLoading] = useState(true);

  const [userProfile, setUserProfile] = useState<
    User & {
      accounts: Account[];
    }
  >();

  useEffect(() => {
    async function loadUserProfile() {
      setIsLoading(true);
      try {
        const response = await api.get(
          `users/${user?.primaryEmailAddress?.emailAddress}`
        );
        setUserProfile(response.data);
        setSessionStatus("authenticated");
        console.log("AuthHook: loaded user profile");
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(isLoaded);
    if (sessionId) loadUserProfile();
  }, [sessionId, user?.primaryEmailAddress?.emailAddress]);

  async function appSignIn() {
    // try {
    //   await signIn();
    //   if (status === "authenticated") {
    //     setSessionStatus(status);
    //   }
    // } catch (error) {
    //   console.log({ error });
    // }
  }

  async function appSignOut() {
    setSessionStatus("unauthenticated");
  }

  return (
    <AuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        status: sessionStatus,
        sessionLoading: isLoading,
        session: {
          email: userProfile?.email ?? "",
          name: userProfile?.name ?? "",
          image: userProfile?.image ?? "",
          notification: "",
          userId: userProfile?.id ?? "",
          origin: userProfile?.accounts[0].provider ?? "",
          phoneVerified: userProfile?.phoneConfirmed ?? false,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
