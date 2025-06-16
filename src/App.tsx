import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [loading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={session ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
