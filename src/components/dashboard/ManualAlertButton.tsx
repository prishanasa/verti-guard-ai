import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ManualAlertButtonProps {
  onStatusChange: (status: "safe" | "alert") => void;
}

const ManualAlertButton = ({ onStatusChange }: ManualAlertButtonProps) => {
  const [isSending, setIsSending] = useState(false);

  const handleManualAlert = async () => {
    setIsSending(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data: event, error } = await supabase.from("events").insert({
        user_id: user.id,
        event_type: "Manual Alert",
        confidence_score: null,
      }).select().single();

      if (error) throw error;

      // Notify emergency contacts
      const { data: notifyData, error: notifyError } = await supabase.functions.invoke('notify-contacts', {
        body: { 
          eventType: 'Manual Alert',
          eventId: event.id 
        }
      });

      if (notifyError) {
        console.error("Notification error:", notifyError);
      }

      onStatusChange("alert");
      
      if (notifyData?.success) {
        toast.error(`Manual alert sent! ${notifyData.notified} emergency contact(s) notified.`);
      } else {
        toast.error("Manual alert sent! (No emergency contacts configured)");
      }
    } catch (error) {
      console.error("Manual alert error:", error);
      toast.error("Failed to send manual alert");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      size="lg"
      variant="destructive"
      onClick={handleManualAlert}
      disabled={isSending}
      className="w-full sm:w-auto gap-2"
    >
      {isSending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <AlertCircle className="h-5 w-5" />
          Send Manual Alert
        </>
      )}
    </Button>
  );
};

export default ManualAlertButton;
