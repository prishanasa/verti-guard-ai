import { useState } from "react";
import Layout from "@/components/Layout";
import StatusCard from "@/components/dashboard/StatusCard";
import MonitorButton from "@/components/dashboard/MonitorButton";
import ManualAlertButton from "@/components/dashboard/ManualAlertButton";
import EventFeed from "@/components/dashboard/EventFeed";
import FallPatternAnalysis from "@/components/dashboard/FallPatternAnalysis";
import SafetyChatbot from "@/components/dashboard/SafetyChatbot";

const Dashboard = () => {
  const [status, setStatus] = useState<"safe" | "alert">("safe");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your safety in real-time</p>
        </div>

        <StatusCard status={status} />

        <div className="flex flex-col sm:flex-row gap-4">
          <MonitorButton onStatusChange={setStatus} />
          <ManualAlertButton onStatusChange={setStatus} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FallPatternAnalysis />
          <SafetyChatbot />
        </div>

        <EventFeed />
      </div>
    </Layout>
  );
};

export default Dashboard;
