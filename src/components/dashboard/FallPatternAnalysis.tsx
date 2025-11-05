import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Loader2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  analysis: string;
  riskLevel: "low" | "moderate" | "high" | "unknown";
  recommendations: string[];
  insights?: string;
}

const FallPatternAnalysis = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePatterns = async () => {
    setIsAnalyzing(true);
    toast.info("Analyzing your safety patterns...");

    try {
      const { data, error } = await supabase.functions.invoke('analyze-fall-patterns');

      if (error) throw error;

      setAnalysis(data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze patterns. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5" />;
      case 'moderate': return <Info className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>AI Fall Pattern Analysis</CardTitle>
          </div>
          <Button 
            onClick={analyzePatterns} 
            disabled={isAnalyzing}
            size="sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyze Patterns
              </>
            )}
          </Button>
        </div>
        <CardDescription>
          Get AI-powered insights about your safety patterns and personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Analyze Patterns" to get AI-powered safety insights</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getRiskColor(analysis.riskLevel)} text-white`}>
                {getRiskIcon(analysis.riskLevel)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge variant={analysis.riskLevel === 'low' ? 'default' : analysis.riskLevel === 'moderate' ? 'secondary' : 'destructive'}>
                  {analysis.riskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-foreground">Analysis</h3>
              <p className="text-sm text-muted-foreground">{analysis.analysis}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Personalized Recommendations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {analysis.insights && (
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-foreground">Additional Insights</h3>
                <p className="text-sm text-muted-foreground">{analysis.insights}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FallPatternAnalysis;
