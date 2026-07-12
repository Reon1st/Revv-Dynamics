const MAX_ATTACHMENTS_BYTES = 2.5 * 1024 * 1024 // ponytail: mirrors client-side cap, see App.jsx

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function buildEmailHtml({ name, email, phone, vehicle, message, attachmentCount }) {
  const row = (label, valueHtml) => `
    <tr>
      <td style="padding:14px 0;color:#6A6A6A;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;width:120px;vertical-align:top;">${label}</td>
      <td style="padding:14px 0;color:#1A1A1F;font-weight:600;font-family:Arial,sans-serif;font-size:18px;">${valueHtml}</td>
    </tr>`

  return `
  <div style="max-width:680px;margin:0 auto;font-family:Arial,sans-serif;">
    <div style="background:#0F0F14;padding:40px 32px;text-align:center;">
      <div style="font-family:'Courier New',monospace;letter-spacing:4px;text-transform:uppercase;font-size:13px;color:#F59E0B;">&#9585; Revv Dynamics</div>
      <div style="font-weight:800;font-size:30px;color:#ffffff;margin-top:10px;">New build inquiry</div>
    </div>
    <div style="background:#F8F7F5;padding:36px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeHtml(name))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#D97706;text-decoration:none;">${escapeHtml(email)}</a>`)}
        ${row('Phone', phone ? escapeHtml(phone) : '&mdash;')}
        ${row('Vehicle', vehicle ? escapeHtml(vehicle) : '&mdash;')}
      </table>
      <div style="margin-top:26px;padding:24px;background:#ffffff;border:1px solid #E0E0E0;border-radius:16px;">
        <div style="font-family:'Courier New',monospace;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#D97706;margin-bottom:12px;">Build goals</div>
        <div style="color:#1A1A1F;line-height:1.7;font-size:17px;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>
      ${attachmentCount ? `<div style="margin-top:18px;font-size:14px;color:#6A6A6A;">&#128206; ${attachmentCount} photo${attachmentCount > 1 ? 's' : ''} attached</div>` : ''}
    </div>
    <div style="background:#0F0F14;padding:18px;text-align:center;">
      <span style="font-family:'Courier New',monospace;font-size:12px;letter-spacing:1px;color:#6A6A6A;text-transform:uppercase;">Sent from the Revv Dynamics contact form</span>
    </div>
  </div>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, vehicle, message, website, attachments } = req.body || {}
  if (website) return res.status(200).json({ ok: true }) // bot filled the honeypot — pretend success, send nothing
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' })

  const safeAttachments = Array.isArray(attachments) ? attachments.slice(0, 5) : []
  const totalBytes = safeAttachments.reduce((sum, a) => sum + (a.content?.length || 0) * 0.75, 0)
  if (totalBytes > MAX_ATTACHMENTS_BYTES) return res.status(400).json({ error: 'Attachments too large' })

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Build inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nVehicle: ${vehicle || '-'}\n\n${message}`,
      html: buildEmailHtml({ name, email, phone, vehicle, message, attachmentCount: safeAttachments.length }),
      attachments: safeAttachments.length ? safeAttachments : undefined,
    }),
  })

  if (!r.ok) return res.status(502).json({ error: 'Failed to send' })
  res.status(200).json({ ok: true })
}
