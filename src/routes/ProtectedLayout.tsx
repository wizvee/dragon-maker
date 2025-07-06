import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

import NavBar from "@/components/NavBar";
import { useUser } from "@supabase/auth-helpers-react";
import { useActiveAction } from "@/hooks/actions/useActiveAction";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const user = useUser();
  const { data: activeAction } = useActiveAction(user?.id);

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
      navigate("/login", { replace: true });
    }
  }, [loading, session, navigate]);

  useEffect(() => {
    if (
      session &&
      activeAction &&
      location.pathname !== `/action/${activeAction.id}`
    ) {
      navigate(`/action/${activeAction.id}`, { replace: true });
    }
  }, [session, activeAction, location.pathname, navigate]);

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
