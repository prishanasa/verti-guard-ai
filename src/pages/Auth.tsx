import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Activity } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/dashboard");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <Shield className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            VertiGuard
            <Activity className="h-8 w-8 text-primary" />
          </h1>
          <p className="text-muted-foreground">Your guardian against falls and dizziness</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "hsl(158, 64%, 52%)",
                    brandAccent: "hsl(158, 64%, 42%)",
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Advanced fall detection powered by AI
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
