import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.ADMIN_EMAIL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { bookingData } = req.body;
    if (!bookingData) {
        return res.status(400).json({ error: 'Booking data is missing' });
    }

    const subject = `Nueva Cita Agendada - ${bookingData.name}`;
    const emailHtml = `
        <h1>Nueva Cita en InkStudio</h1>
        <p>Se ha agendado una nueva cita con los siguientes detalles:</p>
        <ul>
            <li><strong>Servicio:</strong> ${bookingData.service}</li>
            <li><strong>Precio:</strong> ${bookingData.servicePrice}</li>
            <li><strong>Fecha:</strong> ${bookingData.date}</li>
            <li><strong>Hora:</strong> ${bookingData.time}</li>
            <li><strong>Nombre:</strong> ${bookingData.name}</li>
            <li><strong>Email:</strong> ${bookingData.email}</li>
            <li><strong>Teléfono:</strong> ${bookingData.phone}</li>
            <li><strong>Mensaje:</strong> ${bookingData.message || 'N/A'}</li>
        </ul>
    `;

    const data = await resend.emails.send({
      from: `InkStudio <${fromEmail}>`,
      to: [toEmail],
      subject: subject,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Error sending email' });
  }
}
