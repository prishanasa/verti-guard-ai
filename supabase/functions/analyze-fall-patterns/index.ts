import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get user's event history
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (eventsError) throw eventsError;

    if (!events || events.length === 0) {
      return new Response(JSON.stringify({ 
        analysis: "No events recorded yet. Start monitoring to build your safety profile.",
        recommendations: [
          "Begin regular monitoring sessions to establish a baseline",
          "Configure emergency contacts for safety",
          "Consider scheduling monitoring during high-risk activities"
        ],
        riskLevel: "unknown"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare data for AI analysis
    const eventSummary = {
      totalEvents: events.length,
      fallDetections: events.filter(e => e.event_type === 'Fall Detected').length,
      manualAlerts: events.filter(e => e.event_type === 'Manual Alert').length,
      normalActivities: events.filter(e => e.event_type === 'Normal Activity').length,
      recentEvents: events.slice(0, 10).map(e => ({
        type: e.event_type,
        confidence: e.confidence_score,
        timestamp: e.created_at
      }))
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a safety analysis AI for VertiGuard, a fall detection system. Analyze user event data and provide personalized safety recommendations. Be concise, actionable, and empathetic.

Your analysis should include:
1. Pattern identification (time of day, frequency, trends)
2. Risk assessment (low/moderate/high)
3. 3-5 specific, actionable safety recommendations
4. Positive reinforcement for good safety habits

Format your response as JSON with these fields:
{
  "analysis": "2-3 sentence summary of patterns",
  "riskLevel": "low|moderate|high",
  "recommendations": ["rec1", "rec2", "rec3"],
  "insights": "Additional helpful insights"
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Analyze this safety data and provide recommendations:\n${JSON.stringify(eventSummary, null, 2)}` 
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const analysisText = aiData.choices[0].message.content;
    
    // Try to parse JSON from the response
    let analysis;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/) || analysisText.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : analysisText;
      analysis = JSON.parse(jsonText);
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        analysis: analysisText,
        riskLevel: eventSummary.fallDetections > 5 ? 'high' : eventSummary.fallDetections > 0 ? 'moderate' : 'low',
        recommendations: [
          "Continue monitoring your activity regularly",
          "Review your fall detection history weekly",
          "Keep emergency contacts up to date"
        ],
        insights: "Unable to parse detailed insights"
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing fall patterns:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
