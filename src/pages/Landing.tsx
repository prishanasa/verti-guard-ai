import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Activity, Brain, Bell, Users, ArrowRight,
  Cpu, BarChart3, MessageCircle, Zap, Target, LineChart,
  AlertTriangle, CheckCircle2, Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

            <div className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#ai-features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Features
              </a>
              <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Demo
              </a>
            </div>

            <Link to="/auth">
              <Button variant="outline" className="gap-2">
                Login <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Brain className="h-4 w-4" />
              Deep Learning · Real-Time Inference · AI Alerts
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              AI-Powered Fall & Dizziness
              <span className="text-primary block mt-2">Detection using Deep Learning</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              A real-time safety monitoring system that analyzes 6-axis sensor data using a 1D-CNN deep learning model to detect falls and trigger intelligent alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#demo">
                <Button size="lg" className="gap-2 text-lg px-8 shadow-lg">
                  <Activity className="h-5 w-5" />
                  View Demo
                </Button>
              </a>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  Login to Dashboard <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {["1D-CNN", "TensorFlow", "6-Axis IMU", "Real-Time", "Gemini AI", "Edge Functions"].map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary border-secondary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Architecture</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A three-stage pipeline from raw sensor data to life-saving alerts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
              <CardContent className="pt-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    <Cpu className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">STEP 1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Sensor Data Input</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collects 6-axis time-series motion data (accelerometer + gyroscope) from wearable sensors at high frequency.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary/50" />
              <CardContent className="pt-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
                    <Brain className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full">STEP 2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Deep Learning Model</h3>
                <p className="text-muted-foreground leading-relaxed">
                  1D-CNN classifies fall vs. normal activity in real time with high accuracy and optimized recall for safety-critical predictions.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="pt-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    <Bell className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">STEP 3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Intelligent Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Triggers email alerts to emergency contacts and provides AI safety assistant guidance for immediate response.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline flow indicator */}
          <div className="hidden md:flex justify-center items-center mt-8 gap-4 text-muted-foreground">
            <span className="text-sm font-medium">Raw Data</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-medium">1D-CNN Inference</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-medium">Alert System</span>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai-features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-secondary border-secondary/30">Capabilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with cutting-edge deep learning and AI technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Real-Time Fall Detection</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    1D-CNN deep learning model processes 200-sample sliding windows of 6-axis sensor data for instant classification with sub-second latency.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl h-fit group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Class-Imbalance Optimized</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Model trained with high recall optimization to minimize missed fall detections — prioritizing safety over false positives.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">AI Safety Assistant</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Gemini-powered chatbot provides real-time fall prevention tips, emergency guidance, and usage help directly in the dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 flex gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl h-fit group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <LineChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Dashboard & Activity Timeline</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Interactive dashboard with real-time event feed, analytics charts, and historical pattern analysis for comprehensive monitoring.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Live Preview</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dashboard Demo
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A glimpse into the real-time monitoring interface
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Events Preview */}
            <Card className="bg-card border-border shadow-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">Recent Events</span>
              </div>
              <CardContent className="p-4 space-y-3">
                {/* Event items */}
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/10 text-primary border-0 text-xs">Normal Activity</Badge>
                      <span className="text-xs text-muted-foreground">98.5% confidence</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Feb 25, 2026 at 2:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive" className="text-xs">Fall Detected</Badge>
                      <span className="text-xs text-muted-foreground">94.2% confidence</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Feb 25, 2026 at 1:15 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Bell className="h-4 w-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-warning/10 text-warning border-0 text-xs">Manual Alert</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Feb 25, 2026 at 12:45 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/10 text-primary border-0 text-xs">Normal Activity</Badge>
                      <span className="text-xs text-muted-foreground">99.1% confidence</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Feb 25, 2026 at 11:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Chatbot Preview */}
            <Card className="bg-card border-border shadow-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">AI Safety Assistant</span>
              </div>
              <CardContent className="p-4 space-y-3">
                {/* Chat messages */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2 max-w-[85%]">
                    <p className="text-sm text-foreground">
                      Hello! I'm your AI safety assistant. I can help with fall prevention tips and emergency guidance. 🛡️
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[85%]">
                    <p className="text-sm">What should I do if I feel dizzy?</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2 max-w-[85%]">
                    <p className="text-sm text-foreground">
                      If you feel dizzy: 1) Sit or lie down immediately, 2) Drink water, 3) Avoid sudden movements. If symptoms persist, trigger a manual alert. 🏥
                    </p>
                  </div>
                </div>

                {/* Input preview */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                  <div className="flex-1 bg-muted/50 rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                    Ask a safety question...
                  </div>
                  <div className="bg-primary text-primary-foreground p-2.5 rounded-lg">
                    <Send className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">99.2%</div>
              <p className="text-muted-foreground text-sm">Detection Accuracy</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">&lt; 3s</div>
              <p className="text-muted-foreground text-sm">Alert Response</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">6-Axis</div>
              <p className="text-muted-foreground text-sm">Sensor Data</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">24/7</div>
              <p className="text-muted-foreground text-sm">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <p className="text-lg font-medium text-primary mb-4 italic">
            "Turning sensor data into life-saving insights with AI."
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Explore the Dashboard?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up to access real-time monitoring, AI-powered alerts, and the safety assistant.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2 text-lg px-8 shadow-lg">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent -z-0" />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">VertiGuard</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 VertiGuard · AI-Powered Fall Detection using Deep Learning
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#ai-features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
