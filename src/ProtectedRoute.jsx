import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "./app/supabase-client";
import { Center, Spinner } from "@chakra-ui/react";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  // If user is not logged in, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // User is logged in, render the protected content
  return children;
}
