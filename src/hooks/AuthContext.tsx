import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";
import { Account, User } from "@prisma/client";
import { signOut } from "next-auth/react";
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
  // const { data: session, status } = useSession();
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
    if (!isLoaded) return;
    console.log({
      userId,
      sessionId,
      EMAIL: user?.primaryEmailAddress?.emailAddress,
    });
  }, [isLoaded, sessionId, userId]);

  // useEffect(() => {
  //   async function loadUserProfile() {
  //     setIsLoading(true);
  //     try {
  //       const response = await api.get(`users/${session?.user?.email}`);
  //       setUserProfile(response.data);
  //       console.log("AuthHook: loaded user profile");
  //     } catch (error) {
  //       console.log({ error });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   if (status === "authenticated") loadUserProfile();
  // }, [status, session?.user?.email]);

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

  async function supabaseSignIn() {}

  async function appSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log({ error });
    }
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
