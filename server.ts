import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const AGENCY_EMAIL = 'sudhanshuyadav82400@gmail.com';

interface SendEmailPayload {
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

async function sendAgencyEmail(payload: SendEmailPayload) {
  const user = (process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();
  const pass = rawPass.replace(/\s+/g, '');

  let host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  if (host.toLowerCase().includes('smpt.gmail.com')) {
    host = 'smtp.gmail.com';
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  const recipient = (process.env.EMAIL_TO || AGENCY_EMAIL).trim();
  const fromAddress = (process.env.EMAIL_FROM || `Website Creation Agency <${user || AGENCY_EMAIL}>`).trim();

  console.log('----------------------------------------------------');
  console.log('[EMAIL] Email sending started...');
  console.log(`[EMAIL] Recipient address: ${recipient}`);

  if (!user || !pass) {
    const errorMsg = 'SMTP / Gmail credentials are not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD (or SMTP_USER and SMTP_PASS) in Settings.';
    console.error(`[EMAIL] Configuration Error: ${errorMsg}`);
    throw new Error(errorMsg);
  }

  console.log(`[EMAIL] SMTP connection attempted: Host=${host}, Port=${port}, Secure=${secure}, User=${user}`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });

    console.log(`[EMAIL] Email sent successfully! MessageId: ${info.messageId}`);
    console.log('----------------------------------------------------');
    return info;
  } catch (err: any) {
    const rawMsg = err?.message || String(err);
    console.error('[EMAIL] SMTP error message:', rawMsg);
    console.log('----------------------------------------------------');

    if (rawMsg.includes('534-5.7.9') || rawMsg.includes('Application-specific password required')) {
      throw new Error('Gmail authentication failed: A 16-character Google App Password is required by Google (not your normal account password). Please generate one at https://myaccount.google.com/apppasswords and update your GMAIL_APP_PASSWORD or SMTP_PASS.');
    }

    if (rawMsg.includes('535') || rawMsg.includes('Username and Password not accepted')) {
      throw new Error('Gmail authentication failed: Username and App Password not accepted. Please verify your 16-character Google App Password.');
    }

    throw new Error(`SMTP sending error: ${rawMsg}`);
  }
}

// 1. API: Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, businessName, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    console.log('--- [NEW CONTACT MESSAGE RECEIVED] ---');
    console.log(`From: ${name} (${email})`);
    console.log(`Business Name: ${businessName || 'Not specified'}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------------------');

    await sendAgencyEmail({
      replyTo: email,
      subject: `New Contact Inquiry — ${businessName || name}`,
      text: `New contact inquiry received from Website Creation Agency website:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Business Name: ${businessName || 'N/A'}\n\n` +
        `Message:\n${message}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <div style="background: #2563eb; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Inquiry</h2>
            <p style="color: #bfdbfe; margin: 4px 0 0 0; font-size: 14px;">Website Creation Agency</p>
          </div>
          <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background: #ffffff;">
            <p style="margin-top: 0;"><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p><strong>Business Name:</strong> ${businessName || 'Not specified'}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: 'Your Message Has Been Sent 🎉',
      detail: 'Thank you for contacting Website Creation Agency. We have received your message and will get back to you through email.',
    });
  } catch (error: any) {
    console.error('Error handling contact request:', error?.message || error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error processing contact submission.',
    });
  }
});

// 2. API: Questionnaire / Quote Request Submission
app.post('/api/quote-request', async (req, res) => {
  try {
    const {
      clientName,
      businessName,
      businessEmail,
      businessAddress,
      city,
      stateProvince,
      country,
      zipPostalCode,
      currentWebsite,
      socialMediaLinks,
      businessDescription,
      websiteType,
      numberOfPages,
      requiredFeatures,
      estimatedBudget,
      targetLaunchSchedule,
      projectDescription,
    } = req.body;

    if (!businessName || !businessEmail || !projectDescription) {
      return res.status(400).json({ error: 'Business Name, Business Email, and Project Description are required.' });
    }

    const featuresList = Array.isArray(requiredFeatures) ? requiredFeatures.join(', ') : (requiredFeatures || 'None specified');

    console.log('====================================================');
    console.log(`NEW WEBSITE REQUEST: ${businessName}`);
    console.log(`Contact: ${clientName || 'N/A'} <${businessEmail}>`);
    console.log(`Location: ${city || ''}, ${stateProvince || ''}, ${country || ''} ${zipPostalCode || ''}`);
    console.log(`Address: ${businessAddress || 'N/A'}`);
    console.log(`Current Website: ${currentWebsite || 'None'}`);
    console.log(`Socials: ${socialMediaLinks || 'None'}`);
    console.log(`Business Description: ${businessDescription || 'N/A'}`);
    console.log(`Website Type: ${websiteType || 'N/A'}`);
    console.log(`Number of Pages: ${numberOfPages || 'N/A'}`);
    console.log(`Required Features: ${featuresList}`);
    console.log(`Estimated Budget (INR): ${estimatedBudget || 'N/A'}`);
    console.log(`Target Launch: ${targetLaunchSchedule || 'N/A'}`);
    console.log(`Project Description:\n${projectDescription}`);
    console.log('====================================================');

    const emailSubject = `New Website Request — ${businessName}`;

    const textContent = `
NEW WEBSITE REQUEST — ${businessName}
Website Creation Agency Notification
=========================================

CLIENT & BUSINESS DETAILS:
--------------------------
Client Name: ${clientName || 'Not specified'}
Business Name: ${businessName}
Business Email: ${businessEmail}
Business Address: ${businessAddress || 'Not specified'}
City: ${city || 'Not specified'}
State/Province: ${stateProvince || 'Not specified'}
Country: ${country || 'Not specified'}
ZIP/Postal Code: ${zipPostalCode || 'Not specified'}

ONLINE PRESENCE:
--------------------------
Current Website: ${currentWebsite || 'None'}
Social Media Links: ${socialMediaLinks || 'None'}
Business Description: ${businessDescription || 'Not specified'}

WEBSITE REQUIREMENTS:
--------------------------
Website Type: ${websiteType || 'Not specified'}
Number of Pages: ${numberOfPages || 'Not specified'}
Required Features: ${featuresList}
Estimated Budget: ${estimatedBudget || 'Not specified'}

SCHEDULE & PROJECT SCOPE:
--------------------------
Target Launch Schedule: ${targetLaunchSchedule || 'Not specified'}

Project Description:
${projectDescription}
=========================================
Sent via Website Creation Agency Plan Creator
Agency Destination: ${AGENCY_EMAIL}
`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%); padding: 28px 24px; text-align: left;">
          <span style="background: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 12px;">Website Creation Agency</span>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Website Request</h1>
          <p style="color: #e0e7ff; margin: 6px 0 0 0; font-size: 15px;">Project submission for <strong>${businessName}</strong></p>
        </div>

        <div style="padding: 24px;">
          <!-- Section 1 -->
          <h3 style="color: #1e40af; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0; border-bottom: 2px solid #eff6ff; padding-bottom: 6px;">
            1. Business Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 35%;">Client Name:</td><td style="padding: 6px 0; font-weight: 600;">${clientName || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Business Name:</td><td style="padding: 6px 0; font-weight: 600;">${businessName}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Business Email:</td><td style="padding: 6px 0; font-weight: 600;"><a href="mailto:${businessEmail}" style="color: #2563eb;">${businessEmail}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Address:</td><td style="padding: 6px 0;">${businessAddress || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Location:</td><td style="padding: 6px 0;">${[city, stateProvince, country, zipPostalCode].filter(Boolean).join(', ') || 'Not specified'}</td></tr>
          </table>

          <!-- Section 2 -->
          <h3 style="color: #1e40af; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; margin: 20px 0 12px 0; border-bottom: 2px solid #eff6ff; padding-bottom: 6px;">
            2. Online Presence
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 35%;">Current Website:</td><td style="padding: 6px 0;">${currentWebsite ? `<a href="${currentWebsite}" target="_blank" style="color: #2563eb;">${currentWebsite}</a>` : 'None'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Social Media:</td><td style="padding: 6px 0;">${socialMediaLinks || 'None'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;">Business Description:</td><td style="padding: 6px 0;">${businessDescription || 'Not specified'}</td></tr>
          </table>

          <!-- Section 3 -->
          <h3 style="color: #1e40af; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; margin: 20px 0 12px 0; border-bottom: 2px solid #eff6ff; padding-bottom: 6px;">
            3. Website Requirements
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 35%;">Website Type:</td><td style="padding: 6px 0; font-weight: 600;">${websiteType || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Number of Pages:</td><td style="padding: 6px 0;">${numberOfPages || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;">Required Features:</td><td style="padding: 6px 0;"><span style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: inline-block; font-size: 13px;">${featuresList}</span></td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Estimated Budget:</td><td style="padding: 6px 0; font-weight: 700; color: #166534; font-size: 15px;">${estimatedBudget || 'Not specified'}</td></tr>
          </table>

          <!-- Section 4 -->
          <h3 style="color: #1e40af; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; margin: 20px 0 12px 0; border-bottom: 2px solid #eff6ff; padding-bottom: 6px;">
            4. Timeline & Scope
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 35%;">Target Launch:</td><td style="padding: 6px 0; font-weight: 600;">${targetLaunchSchedule || 'Not specified'}</td></tr>
          </table>

          <div style="margin-top: 14px;">
            <strong style="display: block; margin-bottom: 8px; font-size: 14px; color: #334155;">Project Description:</strong>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; color: #1e293b;">${projectDescription}</div>
          </div>

          <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            Website Creation Agency • Email notification sent to: ${AGENCY_EMAIL}
          </div>
        </div>
      </div>
    `;

    await sendAgencyEmail({
      replyTo: businessEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    return res.json({
      success: true,
      message: 'Your Website Request Has Been Received 🎉',
      detail: 'Thank you for choosing Website Creation Agency. We have received your requirements and will contact you through the email address you provided.',
    });
  } catch (error: any) {
    console.error('[EMAIL] Error handling questionnaire submission:', error?.message || error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error processing website questionnaire.',
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
