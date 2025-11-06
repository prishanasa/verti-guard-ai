import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sensorData } = await req.json();

    if (!sensorData || !Array.isArray(sensorData)) {
      throw new Error("Invalid sensor data format");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Prepare sensor data summary for AI analysis
    const dataSummary = {
      samples: sensorData.length,
      avgAccelX: sensorData.reduce((sum, d) => sum + d.accel_x, 0) / sensorData.length,
      avgAccelY: sensorData.reduce((sum, d) => sum + d.accel_y, 0) / sensorData.length,
      avgAccelZ: sensorData.reduce((sum, d) => sum + d.accel_z, 0) / sensorData.length,
      avgGyroX: sensorData.reduce((sum, d) => sum + d.gyro_x, 0) / sensorData.length,
      avgGyroY: sensorData.reduce((sum, d) => sum + d.gyro_y, 0) / sensorData.length,
      avgGyroZ: sensorData.reduce((sum, d) => sum + d.gyro_z, 0) / sensorData.length,
      maxAccelMagnitude: Math.max(...sensorData.map(d => 
        Math.sqrt(d.accel_x ** 2 + d.accel_y ** 2 + d.accel_z ** 2)
      )),
      maxGyroMagnitude: Math.max(...sensorData.map(d => 
        Math.sqrt(d.gyro_x ** 2 + d.gyro_y ** 2 + d.gyro_z ** 2)
      )),
    };

    console.log("Analyzing sensor data:", dataSummary);

    // Call Lovable AI for fall detection analysis
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a fall detection AI analyzing accelerometer and gyroscope sensor data. 
Analyze the data and determine if it indicates a fall or normal activity.

A fall typically shows:
- High acceleration magnitude (>2.5g combined)
- Sudden changes in gyroscope readings
- Sharp spikes followed by reduced movement

Respond with a JSON object containing:
{
  "status": "Fall Detected" or "Normal Activity",
  "confidence": <number between 0 and 1>,
  "reasoning": "<brief explanation>"
}`
          },
          {
            role: "user",
            content: `Analyze this sensor data:
Samples: ${dataSummary.samples}
Average Acceleration (x,y,z): ${dataSummary.avgAccelX.toFixed(2)}, ${dataSummary.avgAccelY.toFixed(2)}, ${dataSummary.avgAccelZ.toFixed(2)}
Average Gyroscope (x,y,z): ${dataSummary.avgGyroX.toFixed(2)}, ${dataSummary.avgGyroY.toFixed(2)}, ${dataSummary.avgGyroZ.toFixed(2)}
Max Acceleration Magnitude: ${dataSummary.maxAccelMagnitude.toFixed(2)}
Max Gyroscope Magnitude: ${dataSummary.maxGyroMagnitude.toFixed(2)}

Is this a fall or normal activity?`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log("AI Response:", aiResponse);

    // Parse AI response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response, using fallback:", parseError);
      // Fallback: analyze based on keywords and data
      const isFall = aiResponse.toLowerCase().includes("fall detected") || 
                     dataSummary.maxAccelMagnitude > 2.5;
      result = {
        status: isFall ? "Fall Detected" : "Normal Activity",
        confidence: isFall ? 0.85 : 0.90,
        reasoning: "Analysis based on sensor thresholds"
      };
    }

    // Ensure confidence is between 0 and 1
    result.confidence = Math.max(0, Math.min(1, result.confidence));

    console.log("Final result:", result);

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in predict-fall function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        status: "Normal Activity",
        confidence: 0.5
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
