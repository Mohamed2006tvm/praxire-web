const nodemailer = require('nodemailer');

const getTransporter = () => {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || 'denk zpnq nlxs zrmb';

  if (!user || user.includes('your-gmail-username')) {
    console.warn('Mail Transporter: SMTP_USER/EMAIL_USER is not configured in .env. Emails will be logged to console but not sent.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });
};

const sendMail = async ({ to, subject, html, text, attachments }) => {
  const transporter = getTransporter();
  const fromUser = process.env.SMTP_USER || process.env.EMAIL_USER || 'praxire@gmail.com';
  
  if (!transporter) {
    console.log('--- MAIL SIMULATION ---');
    console.log(`To: ${to}`);
    console.log(`From: ${fromUser}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text || 'HTML Template'}`);
    console.log('-----------------------');
    return { messageId: 'simulated-id' };
  }

  return transporter.sendMail({
    from: `"Praxire Support" <${fromUser}>`,
    to,
    subject,
    text,
    html,
    attachments,
  });
};

// ─── Automated Mailers ───────────────────────────────────

/**
 * Send Contact notification and acknowledgment
 */
const sendContactMails = async (contact) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'superadmin@praxire.com';
  
  // Acknowledgment to customer
  const customerHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #2563eb;">Thank you for contacting Praxire!</h2>
      <p>Hi ${contact.name},</p>
      <p>We have received your message and our team will get back to you within 24 hours.</p>
      <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #475569;">Your Message:</h4>
        <p style="margin: 0; font-style: italic; color: #475569;">"${contact.message}"</p>
      </div>
      <p>Best regards,<br/>The Praxire Team</p>
    </div>
  `;

  // Notification to admin
  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #0f172a;">New Lead Received</h2>
      <p>A new contact form has been submitted on the Praxire website:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: #0f172a;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
          <td style="padding: 8px 0; color: #0f172a;">${contact.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
          <td style="padding: 8px 0; color: #0f172a;">${contact.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company:</td>
          <td style="padding: 8px 0; color: #0f172a;">${contact.companyName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; color: #0f172a;">${contact.message}</td>
        </tr>
      </table>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a></p>
    </div>
  `;

  // Send both
  await Promise.all([
    sendMail({ to: contact.email, subject: 'We received your message - Praxire', html: customerHtml, text: `Hi ${contact.name}, thank you for contacting Praxire! We will get back to you soon.` }),
    sendMail({ to: adminEmail, subject: `New Lead: ${contact.name} - Praxire`, html: adminHtml, text: `New Lead received from ${contact.name} (${contact.email})` })
  ]);
};

/**
 * Send Newsletter welcome
 */
const sendNewsletterWelcome = async (email) => {
  const unsubscribeUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?email=${encodeURIComponent(email)}`;
  const welcomeHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #2563eb;">Welcome to Praxire Newsletter!</h2>
      <p>Thank you for subscribing to our newsletter. You'll now receive the latest tech insights, business strategy tips, and company updates directly to your inbox.</p>
      <p>If you'd like to unsubscribe at any point, you can do so by clicking the link below:</p>
      <p style="margin-top: 30px;"><a href="${unsubscribeUrl}" style="color: #ef4444; text-decoration: underline; font-size: 13px;">Unsubscribe from newsletter</a></p>
      <p>Best regards,<br/>The Praxire Team</p>
    </div>
  `;

  await sendMail({
    to: email,
    subject: 'Welcome to the Praxire Newsletter!',
    html: welcomeHtml,
    text: 'Thank you for subscribing to the Praxire Newsletter!'
  });
};

/**
 * Send Career Application notification and acknowledgment
 */
const sendCareerMails = async (application, careerTitle) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'superadmin@praxire.com';

  const applicantHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #2563eb;">Application Received: ${careerTitle}</h2>
      <p>Hi ${application.name},</p>
      <p>Thank you for applying for the <strong>${careerTitle}</strong> position at Praxire. We've received your resume and cover note, and our hiring team will review your application soon.</p>
      <p>If your profile matches what we're looking for, we will reach out to you for the next steps.</p>
      <p>Best regards,<br/>Praxire HR Team</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #0f172a;">New Job Application Received</h2>
      <p>A new application has been submitted for the position: <strong>${careerTitle}</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Applicant Name:</td>
          <td style="padding: 8px 0; color: #0f172a;">${application.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
          <td style="padding: 8px 0; color: #0f172a;">${application.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
          <td style="padding: 8px 0; color: #0f172a;">${application.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Cover Note:</td>
          <td style="padding: 8px 0; color: #0f172a;">${application.coverNote || 'None'}</td>
        </tr>
      </table>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Review in Admin Dashboard</a></p>
    </div>
  `;

  await Promise.all([
    sendMail({ to: application.email, subject: `Application Received: ${careerTitle} - Praxire`, html: applicantHtml, text: `Hi ${application.name}, thank you for your application for the ${careerTitle} position at Praxire.` }),
    sendMail({ to: adminEmail, subject: `New Application: ${application.name} for ${careerTitle}`, html: adminHtml, text: `New application received for ${careerTitle} from ${application.name}` })
  ]);
};

module.exports = {
  sendMail,
  sendContactMails,
  sendNewsletterWelcome,
  sendCareerMails,
};
