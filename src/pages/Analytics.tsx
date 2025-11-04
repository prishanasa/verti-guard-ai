import Layout from "@/components/Layout";
import EventsChart from "@/components/analytics/EventsChart";

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            View your health and safety trends over time
          </p>
        </div>

        <EventsChart />
      </div>
    </Layout>
  );
};

export default Analytics;
