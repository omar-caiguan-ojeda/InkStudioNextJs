import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}

const serviceNames: Record<string, string> = {
  pequeno: "Tatuaje Pequeño ($80 - $150)",
  mediano: "Tatuaje Mediano ($200 - $400)",
  grande: "Tatuaje Grande ($500 - $800)",
  coverup: "Cover-Up ($300 - $600)",
  consulta: "Consulta de Diseño ($50)"
};

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Validate required fields
    if (!bookingData.service || !bookingData.date || !bookingData.time || 
        !bookingData.name || !bookingData.email || !bookingData.phone) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      );
    }

    const serviceName = serviceNames[bookingData.service] || bookingData.service;

    // Email to admin
    const adminEmailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL || 'omar.caiguan@gmail.com'],
      subject: `Nueva Cita Agendada - ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; display: flex; align-items: center;">
              <span style="background-color: #dc2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">I</span>
              INKSTUDIO - Nueva Cita
            </h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-top: 0;">Detalles de la Cita</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Información del Cliente</h3>
              <p><strong>Nombre:</strong> ${bookingData.name}</p>
              <p><strong>Email:</strong> ${bookingData.email}</p>
              <p><strong>Teléfono:</strong> ${bookingData.phone}</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Detalles del Servicio</h3>
              <p><strong>Servicio:</strong> ${serviceName}</p>
              <p><strong>Fecha:</strong> ${new Date(bookingData.date).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Hora:</strong> ${bookingData.time}</p>
            </div>
            
            ${bookingData.description ? `
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Descripción del Tatuaje</h3>
              <p>${bookingData.description}</p>
            </div>
            ` : ''}
            
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0;"><strong>¡Recuerda contactar al cliente para confirmar la cita!</strong></p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email to client
    const clientEmailData = {
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [bookingData.email],
      subject: 'Confirmación de Cita - InkStudio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; display: flex; align-items: center;">
              <span style="background-color: #dc2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">I</span>
              INKSTUDIO
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Arte en tu Piel</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-top: 0;">¡Gracias por elegir InkStudio!</h2>
            
            <p>Hola <strong>${bookingData.name}</strong>,</p>
            
            <p>Hemos recibido tu solicitud de cita. Nuestro equipo se pondrá en contacto contigo pronto para confirmar los detalles.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Resumen de tu Cita</h3>
              <p><strong>Servicio:</strong> ${serviceName}</p>
              <p><strong>Fecha solicitada:</strong> ${new Date(bookingData.date).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Hora solicitada:</strong> ${bookingData.time}</p>
            </div>
            
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: white;">Próximos Pasos</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Te contactaremos en las próximas 24 horas</li>
                <li>Confirmaremos la disponibilidad de fecha y hora</li>
                <li>Discutiremos los detalles de tu diseño</li>
                <li>Te proporcionaremos instrucciones de preparación</li>
              </ul>
            </div>
            
            <div style="border-top: 2px solid #f0f0f0; padding-top: 20px; margin-top: 30px;">
              <p><strong>Contacto:</strong></p>
              <p> info@inkstudio.com</p>
              <p> +1 (555) 123-4567</p>
              <p> 123 Arte Street, Ciudad</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos emocionados de crear tu próxima obra de arte!
            </p>
          </div>
        </div>
      `
    };

    // Send emails
    await Promise.all([
      resend.emails.send(adminEmailData),
      resend.emails.send(clientEmailData)
    ]);

    return NextResponse.json(
      { message: 'Cita agendada exitosamente. Te contactaremos pronto.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
