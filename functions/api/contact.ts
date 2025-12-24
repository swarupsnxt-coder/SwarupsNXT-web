interface Env {
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
  // Zoho API Credentials
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_ACCOUNTS_URL?: string; // e.g., https://accounts.zoho.in
  ZOHO_API_URL?: string;      // e.g., https://www.zohoapis.in/crm/v2
}

/**
 * Exchanges the persistent Refresh Token for a short-lived Access Token.
 * Zoho CRM Access Tokens expire every 60 minutes.
 */
async function getZohoAccessToken(env: Env) {
  if (!env.ZOHO_ACCOUNTS_URL || !env.ZOHO_REFRESH_TOKEN || !env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET) {
    throw new Error("Zoho environment variables are incomplete.");
  }

  const url = `${env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
  const params = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token'
  });
  
  const response = await fetch(url, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json() as { access_token?: string; error?: string };
  
  if (!data.access_token) {
    throw new Error(`Zoho Auth Failed: ${data.error || 'No token returned'}`);
  }
  return data.access_token;
}

export const onRequestPost = async ({ request, env }: { request: Request, env: Env }) => {
  try {
    const data = await request.json() as {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

    // Server-side validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Required fields are missing." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // --- 1. SYNC TO ZOHO CRM VIA API v2 ---
    let zohoStatus = "Not Configured";
    if (env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN) {
      try {
        const accessToken = await getZohoAccessToken(env);
        
        // Prepare lead object. 
        // Note: 'Last_Name' and 'Company' are usually mandatory fields in Zoho CRM Leads.
        const leadData = {
          data: [{
            Last_Name: data.name,
            Email: data.email,
            Phone: data.phone || "",
            Lead_Source: "Website - Swarups NXT",
            Description: `Inquiry Type: ${data.subject}\n\nMessage Payload: ${data.message}`,
            Company: "Individual/Web Inquiry" // Zoho requires Company field for lead creation
          }]
        };

        const zohoResponse = await fetch(`${env.ZOHO_API_URL}/Leads`, {
          method: 'POST',
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        });

        const zohoResult = await zohoResponse.json() as any;
        
        if (zohoResult.data && zohoResult.data[0].status === "success") {
          zohoStatus = "Success";
        } else {
          zohoStatus = `API Error: ${zohoResult.data?.[0]?.message || 'Sync Failed'}`;
        }
      } catch (e: any) {
        console.error("Zoho Integration Error:", e);
        zohoStatus = `Exception: ${e.message}`;
      }
    }

    // --- 2. BACKUP: EMAIL NOTIFICATION VIA RESEND ---
    let emailStatus = "Not Sent";
    if (env.RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff;">
          <div style="background: #1e266e; padding: 25px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px;">New Website Lead</h2>
          </div>
          <div style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #64748b; font-weight: bold;">CRM Status:</td><td style="padding: 10px 0; color: #1e266e; font-weight: 800;">${zohoStatus}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b;">Full Name:</td><td style="padding: 10px 0;">${data.name}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b;">Email:</td><td style="padding: 10px 0;">${data.email}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b;">Phone:</td><td style="padding: 10px 0;">${data.phone || 'N/A'}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b;">Subject:</td><td style="padding: 10px 0; color: #2BB6C6; font-weight: bold;">${data.subject}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
            Transmission from Swarups NXT Intelligence Gateway
          </div>
        </div>
      `;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Swarups NXT <leads@swarupsnxt.com>',
          to: env.OWNER_EMAIL || data.email,
          reply_to: data.email,
          subject: `[LEAD] ${data.name}: ${data.subject}`,
          html: emailHtml
        })
      });
      emailStatus = res.ok ? "Sent" : "Failed";
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Transmission delivering. Zoho CRM: ${zohoStatus}, Email Backup: ${emailStatus}` 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    console.error("Critical Failure:", err);
    return new Response(JSON.stringify({ error: err.message || "System error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};