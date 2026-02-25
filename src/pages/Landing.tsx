import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Heart, Bell, Brain, Users, ArrowRight, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-foreground">VertiGuard</span>
            </div>
            <Link to="/auth">
              <Button className="gap-2">
                Login <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Activity className="h-4 w-4" />
              AI-Powered Fall Detection
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Your Guardian Against
              <span className="text-primary"> Falls & Dizziness</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              VertiGuard uses advanced AI to monitor movement patterns, detect falls in real-time, and instantly alert your emergency contacts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  Learn More <ChevronDown className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How VertiGuard Protects You
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Advanced technology meets compassionate care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl inline-block mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Fall Detection</h3>
                <p className="text-muted-foreground">
                  Google Gemini AI analyzes your movement patterns to detect falls and dizziness with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl inline-block mb-4">
                  <Bell className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Instant Alerts</h3>
                <p className="text-muted-foreground">
                  Emergency contacts are notified immediately via email when a fall is detected or you trigger a manual alert.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="bg-primary/10 text-primary p-4 rounded-2xl inline-block mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Emergency Contacts</h3>
                <p className="text-muted-foreground">
                  Add trusted contacts who will be alerted in case of emergency. Keep your loved ones informed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">99.2%</div>
              <p className="text-muted-foreground">Fall Detection Accuracy</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">&lt; 3s</div>
              <p className="text-muted-foreground">Alert Response Time</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Continuous Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Safety Shouldn't Be Complicated
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up in seconds. Add your emergency contacts. Start monitoring. It's that simple.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2 text-lg px-8">
              Start Protecting Yourself <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 VertiGuard. Advanced fall detection powered by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
