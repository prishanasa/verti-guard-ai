import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface EventData {
  date: string;
  falls: number;
  alerts: number;
  total: number;
}

const EventsChart = () => {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const daysAgo = 7;
      const startDate = subDays(startOfDay(new Date()), daysAgo - 1);

      const { data: events, error } = await supabase
        .from("events")
        .select("event_type, timestamp")
        .eq("user_id", user.id)
        .gte("timestamp", startDate.toISOString());

      if (error) throw error;

      // Group events by day
      const eventsByDay: { [key: string]: EventData } = {};
      
      for (let i = 0; i < daysAgo; i++) {
        const date = format(subDays(new Date(), daysAgo - 1 - i), "MMM dd");
        eventsByDay[date] = { date, falls: 0, alerts: 0, total: 0 };
      }

      events?.forEach((event) => {
        const date = format(new Date(event.timestamp), "MMM dd");
        if (eventsByDay[date]) {
          eventsByDay[date].total++;
          if (event.event_type === "Fall Detected") {
            eventsByDay[date].falls++;
          } else if (event.event_type === "Manual Alert") {
            eventsByDay[date].alerts++;
          }
        }
      });

      setData(Object.values(eventsByDay));
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">Loading chart data...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Events Over Time (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="falls" fill="hsl(var(--destructive))" name="Falls Detected" />
          <Bar dataKey="alerts" fill="hsl(var(--warning))" name="Manual Alerts" />
          <Bar dataKey="total" fill="hsl(var(--secondary))" name="Total Events" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EventsChart;
