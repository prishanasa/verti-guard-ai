import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mockFallData } from "@/data/mockSensorData";

interface MonitorButtonProps {
  onStatusChange: (status: "safe" | "alert") => void;
}

const MonitorButton = ({ onStatusChange }: MonitorButtonProps) => {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const handleMonitoring = async () => {
    setIsMonitoring(true);
    toast.info("Starting monitoring...");

    try {
      // Call external AI API
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ window: mockFallData }),
      });

      if (!response.ok) {
        throw new Error("AI API request failed");
      }

      const result = await response.json();
      const { status, confidence } = result;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Insert event into database
      const { error } = await supabase.from("events").insert({
        user_id: user.id,
        event_type: status,
        confidence_score: confidence,
      });

      if (error) throw error;

      // Update UI status
      if (status === "Fall Detected") {
        onStatusChange("alert");
        toast.error(`Fall Detected! Confidence: ${(confidence * 100).toFixed(1)}%`);
      } else {
        onStatusChange("safe");
        toast.success(`Normal Activity (${(confidence * 100).toFixed(1)}% confidence)`);
      }
    } catch (error) {
      console.error("Monitoring error:", error);
      toast.error("Failed to connect to AI service. Make sure the Flask server is running at http://localhost:5000");
    } finally {
      setIsMonitoring(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleMonitoring}
      disabled={isMonitoring}
      className="w-full sm:w-auto gap-2 bg-secondary hover:bg-secondary/90"
    >
      {isMonitoring ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Monitoring...
        </>
      ) : (
        <>
          <Activity className="h-5 w-5" />
          Start Monitoring
        </>
      )}
    </Button>
  );
};

export default MonitorButton;
