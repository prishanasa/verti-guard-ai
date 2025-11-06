import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

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
      .select('full_name')
      .eq('id', user.id)
      .single();

    const userName = profile?.full_name || user.email || 'User';
    
    // Initialize Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Send emails to all contacts
    const emailPromises = contacts.map(async (contact) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "Fall Detection Alert <onboarding@resend.dev>",
          to: [contact.email],
          subject: `⚠️ ${eventType} - ${userName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #dc2626;">⚠️ Emergency Alert</h1>
              <p style="font-size: 18px; margin: 20px 0;">
                <strong>${eventType}</strong> has been detected for <strong>${userName}</strong>.
              </p>
              <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Contact:</strong> ${contact.name}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${contact.phone_number}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <p style="color: #666; margin-top: 20px;">
                Please check on ${userName} immediately. This is an automated alert from the Fall Detection System.
              </p>
            </div>
          `,
        });

        if (error) {
          console.error(`Failed to send email to ${contact.email}:`, error);
          return false;
        }
        
        console.log(`Email sent to ${contact.email}:`, data);
        return true;
      } catch (error) {
        console.error(`Error sending to ${contact.email}:`, error);
        return false;
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(Boolean).length;
    
    console.log(`Sent ${successCount}/${contacts.length} email notifications for ${eventType}`);

    return new Response(JSON.stringify({ 
      success: true, 
      notified: successCount,
      total: contacts.length,
      message: `Notified ${successCount} of ${contacts.length} emergency contact(s)` 
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
