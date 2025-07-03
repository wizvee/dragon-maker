import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

import NavBar from "@/components/NavBar";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login");
    }
  }, [loading, session, navigate]);

  if (loading || !session) return null;

  return (
    <div className="bg-slate-300">
      <NavBar />
      <div className="bg-background rounded-t-3xl p-6">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
