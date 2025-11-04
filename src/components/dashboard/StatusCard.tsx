import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  status: "safe" | "alert";
  lastEvent?: string;
}

const StatusCard = ({ status, lastEvent }: StatusCardProps) => {
  const isSafe = status === "safe";

  return (
    <Card className={cn(
      "p-8 transition-all duration-300",
      isSafe ? "bg-success/10 border-success" : "bg-destructive/10 border-destructive"
    )}>
      <div className="flex items-center gap-6">
        <div className={cn(
          "p-4 rounded-2xl",
          isSafe ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground animate-pulse"
        )}>
          {isSafe ? (
            <Shield className="h-12 w-12" />
          ) : (
            <AlertTriangle className="h-12 w-12" />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">
            Status: {isSafe ? "Safe" : "Alert Detected!"}
          </h2>
          <p className="text-muted-foreground">
            {lastEvent || "No recent events"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
