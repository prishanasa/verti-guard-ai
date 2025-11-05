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

    const { eventType, eventId } = await req.json();

    // Get user's emergency contacts
    const { data: contacts, error: contactsError } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', user.id);

    if (contactsError) throw contactsError;

    if (!contacts || contacts.length === 0) {
      console.log('No emergency contacts found for user:', user.id);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No emergency contacts configured' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user profile for additional info
    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('user_id', user.id)
      .single();

    const userName = profile?.display_name || user.email || 'A user';
    
    // Log notifications (in a real app, you would send SMS/email here)
    const notifications = contacts.map(contact => ({
      contact_id: contact.id,
      event_id: eventId,
      notification_type: 'sms',
      status: 'simulated',
      sent_at: new Date().toISOString(),
      message: `ALERT: ${userName} has triggered a ${eventType} alert. Please check on them immediately.`
    }));

    console.log('Simulated notifications sent:', notifications);

    // In production, integrate with:
    // - Twilio for SMS: https://www.twilio.com/docs/sms
    // - SendGrid/Resend for Email
    // Example Twilio integration:
    /*
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
    const TWILIO_PHONE = Deno.env.get('TWILIO_PHONE_NUMBER');

    for (const contact of contacts) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
      await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: contact.contact_phone,
          From: TWILIO_PHONE,
          Body: `ALERT: ${userName} has triggered a ${eventType}. Please check on them.`
        })
      });
    }
    */

    return new Response(JSON.stringify({ 
      success: true, 
      notified: contacts.length,
      notifications 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error notifying contacts:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
