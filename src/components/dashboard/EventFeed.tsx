import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Activity, Bell } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  event_type: string;
  confidence_score: number | null;
  timestamp: string;
}

const EventFeed = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();

    // Set up real-time subscription
    const channel = supabase
      .channel("events-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "events",
        },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", user.id)
      .order("timestamp", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data || []);
    }
  };

  const getEventIcon = (eventType: string) => {
    if (eventType === "Fall Detected") return <AlertCircle className="h-4 w-4" />;
    if (eventType === "Manual Alert") return <Bell className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getEventBadgeVariant = (eventType: string) => {
    if (eventType === "Fall Detected" || eventType === "Manual Alert") return "destructive";
    return "secondary";
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Recent Events</h3>
      {events.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No events recorded yet</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="mt-1">{getEventIcon(event.event_type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getEventBadgeVariant(event.event_type)}>
                    {event.event_type}
                  </Badge>
                  {event.confidence_score && (
                    <span className="text-sm text-muted-foreground">
                      {(event.confidence_score * 100).toFixed(1)}% confidence
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.timestamp), "PPp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EventFeed;
