import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mockFallData } from "@/data/mockSensorData";
import { z } from "zod";

const apiResponseSchema = z.object({
  status: z.string(),
  confidence: z.number().min(0).max(1),
});

interface MonitorButtonProps {
  onStatusChange: (status: "safe" | "alert") => void;
}

const MonitorButton = ({ onStatusChange }: MonitorButtonProps) => {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const handleMonitoring = async () => {
    setIsMonitoring(true);
    toast.info("Starting monitoring...");

    try {
      // Call AI-powered fall detection service
      const { data: result, error: predictError } = await supabase.functions.invoke('predict-fall', {
        body: { sensorData: mockFallData }
      });

      if (predictError) {
        console.error("Prediction error:", predictError);
        throw new Error("Failed to analyze sensor data");
      }

      // Validate API response
      const validationResult = apiResponseSchema.safeParse(result);
      if (!validationResult.success) {
        console.error("Invalid API response:", validationResult.error);
        throw new Error("Invalid response from AI service");
      }

      const { status, confidence } = validationResult.data;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Insert event into database
      const { data: event, error } = await supabase.from("events").insert({
        user_id: user.id,
        event_type: status,
        confidence_score: confidence,
      }).select().single();

      if (error) throw error;

      // Update UI status
      if (status === "Fall Detected") {
        // Notify emergency contacts for falls
        const { data: notifyData, error: notifyError } = await supabase.functions.invoke('notify-contacts', {
          body: { 
            eventType: 'Fall Detected',
            eventId: event.id 
          }
        });

        if (notifyError) {
          console.error("Notification error:", notifyError);
        }

        onStatusChange("alert");
        
        if (notifyData?.success) {
          toast.error(`Fall Detected! Confidence: ${(confidence * 100).toFixed(1)}%. ${notifyData.notified} contact(s) notified.`);
        } else {
          toast.error(`Fall Detected! Confidence: ${(confidence * 100).toFixed(1)}%`);
        }
      } else {
        onStatusChange("safe");
        toast.success(`Normal Activity (${(confidence * 100).toFixed(1)}% confidence)`);
      }
    } catch (error) {
      console.error("Monitoring error:", error);
      toast.error("Failed to analyze sensor data. Please try again.");
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
